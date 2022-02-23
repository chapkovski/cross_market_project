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
from copy import deepcopy
import numpy as np
import json
import random
from django.db import models as djmodels
from django.utils import timezone
from django.db.models import Max, StdDev, Avg
from datetime import datetime, timedelta
from otree.models import Participant
from uuid import UUID, uuid4
from api.utils import mm_wrapper
from django.db.models.signals import post_save
from django.dispatch import receiver

"""
     await channel_utils.group_send_wrapper(
                type='room_session_ready',
                group=channel_utils.room_participants_group_name(room_name),
                event={},
            )
"""

# from .matlab_connector import get_mm_bids, get_nt_quote
VIRTUAL_PREFIX = 'VIRTUAL_'
MARKET_MAKER_PREFIX = 'MARKET_MAKER'
author = 'Philipp Chapkovski, HSE'

doc = """
Your app description
"""


def create_scheduled_calls(group, virtuals, day_length):
    from .tasks import handle_update
    # TODO: that's the point where we call matlab and get back the list of ids of players and the timeslots.
    # TODO: right now it's just a naive realiazion of the same process
    # TODO: split the scheduling for two markets, pass market name as an input when scheduling.
    timeslots = list(range(1, day_length))
    MAX_CALLS = group.session.config.get('max_calls', 5)
    for v in virtuals:
        if not v.is_mm:
            num_calls = random.randint(1, MAX_CALLS)
            calls = random.choices(timeslots, k=num_calls)
            for c in calls:
                eta = datetime.now() + timedelta(seconds=c)
                market = random.choice(Constants.markets)
                h = handle_update.schedule((group.id, v.id, market), eta=eta)
                h()


class BidType:
    sell = 'sell'
    buy = 'buy'


class EventType:
    SUBMISSION = 'Submission'
    EXECUTION = 'Execution'
    CANCELLATION = 'Cancellation'


class Constants(BaseConstants):
    name_in_url = 'main'
    players_per_group = None
    num_rounds = 10
    tick_frequency = 5
    markets = ['A', 'B']
    risk_lb = 0.5
    risk_ub = 1.0


conv = lambda x: [float(i.strip()) for i in x.split(',')]


class Subsession(BaseSubsession):
    tick_frequency = models.IntegerField()
    merged = models.IntegerField()
    terminal_A = models.FloatField()
    terminal_B = models.FloatField()
    dividends_A = models.StringField()
    dividends_B = models.StringField()
    fv_A = models.FloatField()
    fv_B = models.FloatField()

    def set_fv(self, market):
        """
        setting fv
        """
        dividends = self.session.vars[f'dividends_{market}']
        mean_dividends = sum(dividends) / len(dividends)
        terminal_value = getattr(self, f'terminal_{market}')
        fv = (mean_dividends) * (Constants.num_rounds - self.round_number + 1) + terminal_value
        setattr(self, f'fv_{market}', fv)

    def fv(self, market):
        """
        fundament value for market
        :param market: market name (A, B)
        :return: fundamental value
        """
        return getattr(self, f'fv_{market}')

    def group_by_arrival_time_method(self, waiting_players):
        group_size = self.session.config.get('group_size')
        if len(waiting_players) >= group_size:
            return waiting_players[:group_size]

    def creating_session(self):
        c = self.session.config
        dividends_A = conv(c.get('dividends_A'))
        dividends_B = conv(c.get('dividends_B'))
        self.terminal_A = c.get('terminal_A')
        self.terminal_B = c.get('terminal_B')

        self.session.vars['dividends_A'] = dividends_A
        self.session.vars['dividends_B'] = dividends_B
        self.dividends_A = json.dumps(dividends_A)
        self.dividends_B = json.dumps(dividends_B)

        self.tick_frequency = Constants.tick_frequency  # TODO: move to session config later on
        self.merged = int(self.session.config.get('merged', False))
        self.set_fv('A')
        self.set_fv('B')

class Group(BaseGroup):
    aux_s_A = models.FloatField()  # average price of the asset A in the previous period (for round 1 - FV)
    sigma_A = models.FloatField()  # average volatility of the asset A in the previous period (for round 1 - 0)
    aux_s_B = models.FloatField()  # average price of the asset A in the previous period (for round 1 - FV)
    sigma_B = models.FloatField()  # average volatility of the asset A in the previous period (for round 1 - 0)
    ex_post_aux_s_A = models.FloatField()  # average price of the asset A in the previous period (for round 1 - FV)
    ex_post_sigma_A = models.FloatField()  # average volatility of the asset A in the previous period (for round 1 - 0)
    ex_post_aux_s_B = models.FloatField()  # average price of the asset A in the previous period (for round 1 - FV)
    ex_post_sigma_B = models.FloatField()  # average volatility of the asset A in the previous period (for round 1 - 0)
    index_in_pages = models.IntegerField()
    dividend_A = models.FloatField()
    dividend_B = models.FloatField()
    price_A = models.FloatField()
    price_B = models.FloatField()
    starting_time = djmodels.DateTimeField(null=True)
    finish_time = djmodels.DateTimeField(null=True)

    def dynamic_aux_s(self, market):
        """
        :param market: name of the stock market (A,B) 
        :return: midpoint of the spread if exists, otherwise initial aus_x
        """
        bids = self.bids.filter(market=market, active=True)
        best_buy = bids.filter(type='buy').order_by('-value').first()
        best_sell = bids.filter(type='sell').order_by('value').first()

        if best_buy and best_sell and best_sell.value > best_buy.value:
            return (best_sell.value + best_buy.value) / 2
        else:
            return getattr(self, f'aux_s_{market}')

    @property
    def market_makers(self):
        return self.player_set.filter(participant__label=MARKET_MAKER_PREFIX)

    @property
    def time_left(self):
        return (self.finish_time - timezone.now()).total_seconds()

    def set_payoffs(self):
        self.set_ex_post_values()
        for p in self.get_players():
            p.set_payoff()

    def create_virtuals(self):
        num_non_virtual = len(self.get_players())
        # creating virtual players. Let's do it first in a naive way
        example_p = self.get_players()[0].participant
        self.session.vars['example_real_participant_id'] = example_p.id

        params = ['_index_in_pages',
                  '_current_page_name',
                  '_current_app_name',
                  '_round_number',
                  '_max_page_index']
        vals = {i: getattr(example_p, i) for i in params}
        vals['_index_in_pages'] = vals['_max_page_index']
        num_virtual_players = self.session.config.get('num_virtual_players', 5)
        num_mms = self.session.config.get('num_mms', 1)
        print(num_mms, 'A' * 100)
        virtual_participants = []
        max_id_in_session = Participant.objects.filter(session=self.session).aggregate(Max('id_in_session')).get(
            'id_in_session__max')

        for i in range(num_virtual_players):
            p = Participant(
                label='VIRTUAL',
                code=f'{VIRTUAL_PREFIX}{uuid4().hex[:6]}',
                session=self.session,
                _session_code=self.session.code,
                id_in_session=i + max_id_in_session,
                visited=True,
                **vals
            )
            virtual_participants.append(p)
        new_max_id_in_session = max_id_in_session + num_virtual_players
        for i in np.linspace(Constants.risk_lb, Constants.risk_ub, num=num_mms):
            mm = Participant(
                label=MARKET_MAKER_PREFIX,
                code=f'{VIRTUAL_PREFIX}{uuid4().hex[:6]}',
                session=self.session,
                vars=dict(risk_aversion=i),
                _session_code=self.session.code,
                id_in_session=new_max_id_in_session + i + 1,
                visited=True,
                **vals
            )
            virtual_participants.append(mm)
        Participant.objects.bulk_create(virtual_participants)
        virtual_participants = Participant.objects.filter(session=self.session, code__startswith=VIRTUAL_PREFIX)
        self.session.num_participants += len(virtual_participants)
        self.session.save()
        virtual_players = []
        for r in range(1, Constants.num_rounds + 1):
            g = self.in_round(r)
            for i, p in enumerate(virtual_participants):
                is_mm = p.label == MARKET_MAKER_PREFIX
                pl = Player(participant=p, session=self.session, subsession=g.subsession, group=g,
                            id_in_group=i + 1 + num_non_virtual, round_number=r, virtual=True,
                            is_mm=is_mm,
                            risk_aversion=p.vars.get('risk_aversion'))
                virtual_players.append(pl)

        Player.objects.bulk_create(virtual_players)

        # ENDO OF BLOCK: creating virtual players

    def get_virtual_players(self):
        return self.player_set.filter(participant__code__startswith=VIRTUAL_PREFIX)

    def get_non_virtuals(self):
        return self.player_set.exclude(virtual=True)

    def set_ex_post_values(self):
        params_A = self.bids.filter(active=False, cancelled=False, market='A').aggregate(Avg('value'), StdDev('value'))
        params_B = self.bids.filter(active=False, cancelled=False, market='B').aggregate(Avg('value'), StdDev('value'))
        self.ex_post_aux_s_A = params_A.get('value__avg') or self.subsession.fv('A')
        self.ex_post_aux_s_B = params_B.get('value__avg') or self.subsession.fv('B')
        self.ex_post_sigma_A = params_A.get('value__stddev') or 0
        self.ex_post_sigma_B = params_B.get('value__stddev') or 0

    def set_group_params(self):
        # a bit naive, but will work taking into account that we rely on this code to correclty calculate the scheduled call.
        # if this is not true, the schedule won't work as well, and then we'll have more serious problems to think of.
        self.index_in_pages = self.player_set.exclude(virtual=True).first().participant._index_in_pages + 1
        c = self.session.config
        day_length = c.get('day_length', 300)

        starting_price_A = self.subsession.fv('A')
        starting_price_B = self.subsession.fv('B')

        r = self.round_number - 1
        if self.round_number == 1:
            self.price_A = starting_price_A
            self.price_B = starting_price_B
            self.aux_s_A = starting_price_A
            self.aux_s_B = starting_price_B
            self.sigma_A = 0
            self.sigma_B = 0
        else:
            prev = self.in_round(r)
            self.aux_s_A = prev.ex_post_aux_s_A
            self.aux_s_B = prev.ex_post_aux_s_B
            self.sigma_A = prev.ex_post_sigma_A
            self.sigma_B = prev.ex_post_sigma_B
            self.price_A = prev.price_A
            self.price_B = prev.price_B
        self.starting_time = timezone.now()
        self.finish_time = timezone.now() + timedelta(seconds=day_length)
        self.dividend_A = random.choice(self.session.vars.get('dividends_A'))
        self.dividend_B = random.choice(self.session.vars.get('dividends_B'))
        # set player params
        initial_shares_A = c.get('initial_shares_A', 0)
        initial_shares_B = c.get('initial_shares_B', 0)
        initial_money_A = c.get('initial_money_A', 0)
        initial_money_B = c.get('initial_money_B', 0)

        if self.round_number == 1:
            for p in self.get_players():
                p.cash_A = initial_money_A
                p.cash_B = initial_money_B
                if p.is_mm:
                    p.shares_A = 0
                    p.shares_B = 0
                else:
                    p.shares_A = initial_shares_A
                    p.shares_B = initial_shares_B

        else:

            for p in self.get_players():
                p.cash_A = p.in_round(r).cash_A
                p.cash_B = p.in_round(r).cash_B
                p.shares_A = p.in_round(r).shares_A
                p.shares_B = p.in_round(r).shares_B

        #
        # the following block is not necessary but is convenient to trace virtuals in Data section
        virtual_participants = Participant.objects.filter(session=self.session, code__startswith=VIRTUAL_PREFIX)
        example_p = Participant.objects.get(id=self.session.vars.get('example_real_participant_id'))
        params_to_update = ['_current_page_name',
                            '_current_app_name',
                            '_round_number', ]
        update_info = {i: getattr(example_p, i) for i in params_to_update}
        virtual_participants.update(**update_info)

        #  HUEY block - we'll call here matlab to schedule noise trader calls
        # ONCE AGAIN: this one should be correctly replaced with  MATLAB call.
        # Here we get all the current virtual players. and schedule some actions for them
        # it's perhaps more correcct to keep it within group, but to make it easier to locate and integrate with matlab
        # let's keep it separate
        create_scheduled_calls(self, self.get_virtual_players(), day_length)
        # END OF HUEY BLOCK
        # MMs bids: let's think if this is the best place but PORAE
        mms = self.market_makers
        for mm in mms:
            mm.post_new_bids(market='A')
            mm.post_new_bids(market='B')

    def get_full_history(self):
        if self.round_number == 1:
            return dict(A=None, B=None)
        else:
            a_prices = [i.price_A for i in self.in_previous_rounds()]
            b_prices = [i.price_B for i in self.in_previous_rounds()]
            return dict(A=a_prices, B=b_prices)

    def price_update(self, new_price, market):
        setattr(self, f'price_{market}', new_price)

    def get_active_bids(self):
        bids = self.bids.filter(active=True).values('trader', 'value', 'type', 'market', 'id', 'trader__virtual',
                                                    'trader__is_mm')
        return list(bids)


class Player(BasePlayer):
    virtual = models.BooleanField(initial=False)
    is_mm = models.BooleanField(initial=False)
    risk_aversion = models.FloatField()  # this is set for MMs only
    intermediary_payoff = models.CurrencyField()
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
            b.cancelled = True
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
        injector.pop('action', None)
        injector.pop('trader_id', None)
        b = Bid(trader=self, group=self.group, timestamp=timestamp, active=True,
                **injector)
        b.save()
        return {0: dict(action='addBid', bid=b.as_dict(), **removal_info)}

    def post_new_bids(self, market):
        if not self.is_mm:
            return
        aux_S = self.group.dynamic_aux_s(market)
        sigma_mm = getattr(self.group, f'sigma_{market}')
        q_mm = getattr(self, f'shares_{market}')
        resp = mm_wrapper(self.round_number, Constants.num_rounds, aux_S, sigma_mm, self.risk_aversion, q_mm=q_mm)

        to_add = [
            dict(type='sell', market=market, value=resp.get('s_ask')),
            dict(type='buy', market=market, value=resp.get('s_bid'), ),

        ]
        timestamp = timezone.now()
        for a in to_add:
            self.addBid(a, timestamp)

    def cancelBid(self, data, timestamp):
        market = data.get('market')
        bid_type = data.get('type')
        bids = self.bids.filter(market=market, active=True, type=bid_type)
        if bids.exists():
            b = bids.first()
            b.contractor = self
            b.active = False
            b.cancelled = True
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
        if b.trader.is_mm:
            b.trader.post_new_bids(market=b.market)
        self.update_status(b)
        bids = self.group.get_active_bids()
        msg_to_everyone = dict(action='setBids', bids=bids, market=b.market, price=b.value,
                               )
        msg_to_trader = dict(action='setBids', bids=bids, market=b.market, price=b.value,
                             status=b.trader.current_status(),
                             )
        msg_to_contractor = dict(action='setBids', bids=bids, market=b.market, price=b.value,
                                 status=self.current_status(), )

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
        if upd_value and upd_value != getattr(self, full_param_name):
            setattr(self, full_param_name, upd_value)

    def update_stocks(self, market_data):
        self.optional_data_setter(market_data, 'A', 'cash')
        self.optional_data_setter(market_data, 'B', 'cash')
        self.optional_data_setter(market_data, 'A', 'shares')
        self.optional_data_setter(market_data, 'B', 'shares')

    def register_event(self, data):
        action = data.get('action', '')
        market_data = data.pop('marketData', None)
        player_id = data.pop('player_id', None)
        if market_data:
            self.update_stocks(market_data)
        timestamp = timezone.now()
        if hasattr(self, action):
            method = getattr(self, action)
            return method(data, timestamp)

        bids = self.group.get_active_bids()
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
    cancelled = models.BooleanField(initial=False)


class Message(djmodels.Model):
    class Meta:
        ordering = ['timestamp']
        get_latest_by = 'timestamp'

    actor = djmodels.ForeignKey(to=Player, on_delete=djmodels.CASCADE, related_name='messages')
    parent = djmodels.ForeignKey(to=Bid, on_delete=djmodels.CASCADE, related_name='messages')
    event_type = models.StringField()
    timestamp = djmodels.DateTimeField(null=True)


class OrderBook(djmodels.Model):
    initiator = djmodels.ForeignKey(to=Message, on_delete=djmodels.CASCADE, related_name='orders')
    price = models.FloatField()
    type = models.StringField()


@receiver(post_save, sender=Bid)
def save_profile(sender, instance, created, **kwargs):
    if created:
        params = dict(actor=instance.trader,
                      event_type=EventType.SUBMISSION,
                      timestamp=instance.timestamp)
    else:
        if instance.closure_timestamp and not instance.active:
            if instance.cancelled:
                params = dict(actor=instance.contractor,
                              event_type=EventType.CANCELLATION,
                              timestamp=instance.closure_timestamp)
            else:
                params = dict(actor=instance.contractor,
                              event_type=EventType.EXECUTION,
                              timestamp=instance.closure_timestamp)
    m = instance.messages.create(**params)
    bids = instance.group.bids.filter(active=True, market=instance.market).values('value', 'type')
    orders = [OrderBook(initiator=m, price=i.get('value'), type=i.get('type')) for i in bids]
    OrderBook.objects.bulk_create(orders)
