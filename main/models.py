from otree.api import (
    models,
    widgets,
    BaseConstants,
    BaseSubsession,
    BaseGroup,
    BasePlayer,
    Currency as c,
    currency_range,
)
import random
from django.db import models as djmodels
from django.utils import timezone
from django.core import serializers
from pprint import pprint

author = 'Philipp Chapkovski, HSE'

doc = """
Your app description
"""


class Constants(BaseConstants):
    name_in_url = 'main'
    players_per_group = None
    num_rounds = 1
    tick_frequency = 5


class Subsession(BaseSubsession):
    tick_frequency = models.IntegerField()
    merged = models.IntegerField()

    def creating_session(self):
        self.tick_frequency = Constants.tick_frequency  # TODO: move to session config later on
        self.merged = int(self.session.config.get('merged', False))
        c = self.session.config
        starting_price_A = c.get('starting_price_A', 0)
        starting_price_B = c.get('starting_price_B', 0)
        initial_shares_A = c.get('initial_shares_A', 0)
        initial_shares_B = c.get('initial_shares_B', 0)
        initial_money_A = c.get('initial_money_A', 0)
        initial_money_B = c.get('initial_money_B', 0)
        for p in self.get_players():
            p.cash_A = initial_money_A
            p.cash_B = initial_money_B
            p.shares_A = initial_shares_A
            p.shares_B = initial_shares_B
            p.stock_value_A = starting_price_A * initial_shares_A
            p.stock_value_B = starting_price_B * initial_shares_B

        bids = []
        for g in self.get_groups():
            # g.history.create(value=starting_price_A, market='A')
            # g.history.create(value=starting_price_B, market='B')
            g.price_A = starting_price_A
            g.price_B = starting_price_B
            for i in range(20):
                b = Bid(group=g,
                        trader=random.choice(g.get_players()),
                        market=random.choice(['A', 'B']),
                        value=random.randint(100, 200),
                        type=random.choice(['sell', 'buy']),
                        active=True,
                        timestamp=timezone.now())
                bids.append(b)
        Bid.objects.bulk_create(bids)


class Group(BaseGroup):
    price_A = models.FloatField()
    price_B = models.FloatField()

    def get_full_history(self):
        hs = self.history.all()

        return dict(A=list(hs.filter(market='A').values_list( 'time_in_millisecs','value',)),
                    B=list(hs.filter(market='B').values_list( 'time_in_millisecs','value',)))

    def price_update(self, new_price, market):
        setattr(self, f'price_{market}', new_price)


class Player(BasePlayer):
    cash_A = models.FloatField()
    cash_B = models.FloatField()
    shares_A = models.FloatField()
    shares_B = models.FloatField()
    stock_value_A = models.FloatField()
    stock_value_B = models.FloatField()

    def current_status(self):
        return dict(
            A=dict(shares=self.shares_A,
                   cash=self.cash_A,
                   stock_value=self.stock_value_A,
                   price=self.group.price_A,
                   total=self.total_in_market('A'), ),
            B=dict(shares=self.shares_B,
                   cash=self.cash_B,
                   stock_value=self.stock_value_B,
                   price=self.group.price_B,
                   total=self.total_in_market('B'), ),
            total=dict(stock_value=self.total_stock_value(),
                       cash=self.total_cash(),
                       total=self.total())
        )

    def total_cash(self):
        return (self.cash_A or 0) + (self.cash_B or 0)

    def total_stock_value(self):
        return (self.stock_value_A or 0) + (self.stock_value_B or 0)

    def total_in_market(self, market):
        cash = getattr(self, f'cash_{market}') or 0
        stock = getattr(self, f'stock_value_{market}') or 0
        return cash + stock

    def total(self):
        a = self.total_in_market('A')
        b = self.total_in_market('B')
        return a + b

    def addBid(self, data, timestamp):
        injector = data.copy()
        injector.pop('action')
        injector.pop('trader_id')
        b = Bid(trader=self, group=self.group, timestamp=timestamp, active=True,
                **injector)
        b.save()
        return {0: dict(action='addBid', bid=b.as_dict())}

    def takeBid(self, data, timestamp):
        bid_id = data.get('bid_id')
        b = Bid.objects.get(id=bid_id)
        b.contractor = self
        b.active = False
        b.closure_timestamp = timestamp
        b.save()
        self.group.price_update(new_price=b.value, market=b.market)
        b.trader.update_status(b)
        self.update_status(b)
        h = History(group=self.group, bid=b, value=b.value, market=b.market, timestamp=b.closure_timestamp,
                    time_in_millisecs=b.closure_timestamp.timestamp()*1000)
        h.save()
        msg_to_everyone = dict(action='removeBid', bid_id=bid_id, market=b.market, price=b.value, history_time=h.time_in_millisecs)
        msg_to_trader = dict(action='remove_and_update', bid_id=bid_id, status=b.trader.current_status(),
                             market=b.market, price=b.value, history_time=h.time_in_millisecs)
        msg_to_contractor = dict(action='remove_and_update', bid_id=bid_id, status=self.current_status(),
                                 market=b.market, price=b.value, history_time=h.time_in_millisecs)
        all_others = [i.id_in_group for i in self.get_others_in_group() if i != b.trader]
        res = {i: msg_to_everyone for i in all_others}

        return {**res, self.id_in_group: msg_to_contractor, b.trader.id_in_group: msg_to_trader}

    def update_status(self, bid):
        # TODO: clean this BS
        # we get here a closed bid. We update repository and cash.
        if (bid.trader == self and bid.type == 'sell') or (bid.contractor == self and bid.type == 'buy'):
            # That means we just sold an item
            cash = getattr(self, f'cash_{bid.market}')
            setattr(self, f'cash_{bid.market}', cash + bid.value)
            shares = getattr(self, f'shares_{bid.market}')
            setattr(self, f'shares_{bid.market}', shares - 1)
            curprice = getattr(self.group, f'price_{bid.market}')
            stock_value = getattr(self, f'stock_value_{bid.market}')
            setattr(self, f'stock_value_{bid.market}', stock_value - curprice)

        if (bid.trader == self and bid.type == 'buy') or (bid.contractor == self and bid.type == 'sell'):
            # That means we just bought an item. TODO: can all this BS be simplified somehow?
            cash = getattr(self, f'cash_{bid.market}')
            setattr(self, f'cash_{bid.market}', cash - bid.value)
            shares = getattr(self, f'shares_{bid.market}')
            setattr(self, f'shares_{bid.market}', shares + 1)
            curprice = getattr(self.group, f'price_{bid.market}')
            stock_value = getattr(self, f'stock_value_{bid.market}')
            setattr(self, f'stock_value_{bid.market}', stock_value + curprice)

    def register_event(self, data):
        pprint(data)
        action = data.get('action', '')
        timestamp = timezone.now()
        if hasattr(self, action):
            method = getattr(self, action)
            return method(data, timestamp)

        bids = self.group.bids.filter(active=True).values('trader', 'value', 'type', 'market', 'id')
        bids = list(bids)
        return {
            self.id_in_group: dict(timestamp=timestamp.strftime('%m_%d_%Y_%H_%M_%S'), action='setBids', bids=bids)}


class Bid(djmodels.Model):
    def as_dict(self):
        return dict(trader=self.trader.id, value=self.value, type=self.type, market=self.market, active=self.active,
                    id=self.id)

    class Meta:
        ordering = ['timestamp']
        get_latest_by = 'timestamp'

    group = djmodels.ForeignKey(to=Group, on_delete=djmodels.CASCADE, related_name='bids')
    trader = djmodels.ForeignKey(to=Player, on_delete=djmodels.CASCADE, related_name='bids')
    contractor = djmodels.ForeignKey(to=Player, on_delete=djmodels.CASCADE, related_name='contracted_bids', null=True)
    market = models.StringField()
    value = models.FloatField()
    type = models.StringField()
    timestamp = djmodels.DateTimeField(null=True)
    closure_timestamp = djmodels.DateTimeField(null=True)
    active = models.BooleanField()


class History(djmodels.Model):
    def as_dict(self):
        return dict(value=self.bid.value, market=self.bid.market,
                    id=self.id, group_id=self.group.id)

    group = djmodels.ForeignKey(to=Group, on_delete=djmodels.CASCADE, related_name='history')
    bid = djmodels.OneToOneField(to=Bid, on_delete=djmodels.CASCADE, related_name='h', null=True)
    market = models.StringField()
    value = models.FloatField()
    timestamp = djmodels.DateTimeField(null=True)
    time_in_millisecs = models.FloatField()
