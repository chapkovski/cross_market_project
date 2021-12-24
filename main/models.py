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
from .tasks import handle_update
import json
import random
from django.db import models as djmodels
from django.utils import timezone
from django.core import serializers
from pprint import pprint
from datetime import datetime, timedelta

author = 'Philipp Chapkovski, HSE'

doc = """
Your app description
"""


class Constants(BaseConstants):
    name_in_url = 'main'
    players_per_group = None
    num_rounds = 1
    tick_frequency = 5


conv = lambda x: [float(i.strip()) for i in x.split(',')]


class Subsession(BaseSubsession):
    tick_frequency = models.IntegerField()
    merged = models.IntegerField()
    terminal_A = models.FloatField()
    terminal_B = models.FloatField()
    dividends_A = models.StringField()
    dividends_B = models.StringField()

    def group_by_arrival_time_method(self, waiting_players):
        group_size = self.session.config.get('group_size')
        if len(waiting_players) >= group_size:
            return waiting_players[:group_size]

    def creating_session(self):
        c = self.session.config
        self.terminal_A = c.get('terminal_A')
        self.terminal_B = c.get('terminal_B')

        dividends_A = conv(c.get('dividends_A'))
        dividends_B = conv(c.get('dividends_A'))
        self.session.vars['dividends_A'] = dividends_A
        self.session.vars['dividends_B'] = dividends_B
        self.dividends_A = json.dumps(dividends_A)
        self.dividends_B = json.dumps(dividends_B)
        for p in self.get_players():
            eta = datetime.now() + timedelta(seconds=10)
            h = handle_update.schedule((p,), eta=eta)
            h()
        self.tick_frequency = Constants.tick_frequency  # TODO: move to session config later on
        self.merged = int(self.session.config.get('merged', False))
        initial_shares_A = c.get('initial_shares_A', 0)
        initial_shares_B = c.get('initial_shares_B', 0)
        initial_money_A = c.get('initial_money_A', 0)
        initial_money_B = c.get('initial_money_B', 0)
        for p in self.get_players():
            p.cash_A = initial_money_A
            p.cash_B = initial_money_B
            p.shares_A = initial_shares_A
            p.shares_B = initial_shares_B



class Group(BaseGroup):
    dividend_A = models.FloatField()
    dividend_B = models.FloatField()
    price_A = models.FloatField()
    price_B = models.FloatField()
    starting_time = djmodels.DateTimeField(null=True)
    finish_time = djmodels.DateTimeField(null=True)

    @property
    def time_left(self):
        return (self.finish_time - timezone.now()).total_seconds()

    def set_payoffs(self):
        for p in self.get_players():
            p.set_payoff()

    def set_group_params(self):
        c = self.session.config
        day_length = c.get('day_length', 300)
        starting_price_A = c.get('starting_price_A', 0)
        starting_price_B = c.get('starting_price_B', 0)
        self.price_A = starting_price_A
        self.price_B = starting_price_B
        self.starting_time = timezone.now()
        self.finish_time = timezone.now() + timedelta(seconds=day_length)
        self.dividend_A = random.choice(self.session.vars.get('dividends_A'))
        self.dividend_B = random.choice(self.session.vars.get('dividends_B'))

    def get_full_history(self):
        hs = self.history.all()

        return dict(A=list(hs.filter(market='A').values_list('time_in_millisecs', 'value', )),
                    B=list(hs.filter(market='B').values_list('time_in_millisecs', 'value', )))

    def price_update(self, new_price, market):
        setattr(self, f'price_{market}', new_price)


class Player(BasePlayer):
    intermediary_payoff = models.CurrencyField()
    huey_val = models.IntegerField(initial=0)
    cash_A = models.FloatField()
    cash_B = models.FloatField()
    shares_A = models.FloatField()
    shares_B = models.FloatField()
    dividend_A_payoff = models.CurrencyField()
    dividend_B_payoff = models.CurrencyField()
    stocks_A_payoff = models.CurrencyField()
    stocks_B_payoff = models.CurrencyField()
    cash_payoff = models.CurrencyField()

    @property
    def stock_value_A(self):
        return self.shares_A * self.group.price_A

    @property
    def stock_value_B(self):
        return self.shares_B * self.group.price_B

    def set_payoff(self):
        self.dividend_A_payoff = self.shares_A * self.group.dividend_A
        self.dividend_B_payoff = self.shares_B * self.group.dividend_B
        self.stocks_A_payoff = self.dividend_A_payoff + self.subsession.terminal_A * self.shares_A
        self.stocks_B_payoff = self.dividend_B_payoff + self.subsession.terminal_B * self.shares_B
        self.cash_payoff = self.total_cash()
        self.intermediary_payoff = self.total_cash() + self.stocks_A_payoff + self.stocks_B_payoff

    def current_status(self):
        return dict(
            A=dict(shares=self.shares_A,
                   cash=self.cash_A,
                   stock_value=self.stock_value_A,
                   price=self.group.price_A,
                   total=self.total_in_market('A'),
                   terminal_value=self.subsession.terminal_A,
                   dividend=self.group.dividend_A),
            B=dict(shares=self.shares_B,
                   cash=self.cash_B,
                   stock_value=self.stock_value_B,
                   price=self.group.price_B,
                   total=self.total_in_market('B'),
                   terminal_value=self.subsession.terminal_B,
                   dividend=self.group.dividend_B),
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

    def inner_cancel_bid(self, data, timestamp):
        market = data.get('market')
        bid_type = data.get('type')
        bids = self.bids.filter(market=market, active=True, type=bid_type)
        if bids.exists():
            b = bids.first()
            b.contractor = self
            b.active = False
            b.closure_timestamp = timestamp
            b.save()
            return b.id

    def addBid(self, data, timestamp):
        bid_type = data.get('type')
        value = data.get('value')
        market = data.get('market')
        counterparts = None
        if bid_type == 'sell':
            counterparts = self.group.bids.filter(type='buy', active=True, value__gte=value, market=market)
        if bid_type == 'buy':
            counterparts = self.group.bids.filter(type='sell', active=True, value__lte=value, market=market)
        if counterparts and counterparts.exists():
            counterpart = counterparts.first()
            data['bid_id'] = counterpart.id
            return self.takeBid(data, timestamp)
        removal_info = dict(bid_to_remove=self.inner_cancel_bid(data, timestamp))
        injector = data.copy()
        injector.pop('action')
        injector.pop('trader_id')
        b = Bid(trader=self, group=self.group, timestamp=timestamp, active=True,
                **injector)
        b.save()
        return {0: dict(action='addBid', bid=b.as_dict(), **removal_info)}

    def clearing_market(self):

        pass

    def cancelBid(self, data, timestamp):
        market = data.get('market')
        bid_type = data.get('type')
        bids = self.bids.filter(market=market, active=True, type=bid_type)
        if bids.exists():
            b = bids.first()
            b.contractor = self
            b.active = False
            b.closure_timestamp = timestamp
            b.save()
            msg_to_everyone = dict(action='removeBid', bid_id=b.id)
            return {0: msg_to_everyone}

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
                    time_in_millisecs=b.closure_timestamp.timestamp() * 1000)
        h.save()
        msg_to_everyone = dict(action='removeBid', bid_id=bid_id, market=b.market, price=b.value,
                               history_time=h.time_in_millisecs)
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

        if (bid.trader == self and bid.type == 'buy') or (bid.contractor == self and bid.type == 'sell'):
            # That means we just bought an item. TODO: can all this BS be simplified somehow?
            cash = getattr(self, f'cash_{bid.market}')
            setattr(self, f'cash_{bid.market}', cash - bid.value)
            shares = getattr(self, f'shares_{bid.market}')
            setattr(self, f'shares_{bid.market}', shares + 1)

    def optional_data_setter(self, market_data, market, param):
        """Optionally update current status if it has changed. Not sure it's worth it but it saves a few database queries"""
        upd_value = market_data.get(f'market_{market}', {}).get(param)
        full_param_name = f'{param}_{market}'
        print('optional?', market, param)
        if upd_value and upd_value != getattr(self, full_param_name):
            setattr(self, full_param_name, upd_value)

    def update_stocks(self, market_data):
        self.optional_data_setter(market_data, 'A', 'cash')
        self.optional_data_setter(market_data, 'B', 'cash')
        self.optional_data_setter(market_data, 'A', 'shares')
        self.optional_data_setter(market_data, 'B', 'shares')

    def register_event(self, data):
        pprint(data)
        action = data.get('action', '')
        market_data = data.get('marketData')
        if market_data:
            self.update_stocks(market_data)
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
