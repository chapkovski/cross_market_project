from huey.contrib.djhuey import task, periodic_task, db_task
from django.conf import settings
from otree.live import live_payload_function, _live_send_back
from pprint import pprint
from otree.channels import utils as channel_utils
import json
from main.models import Group, Player, Constants, BidType
import random
from django.utils import timezone


def signal_for_market_maker():


    """
    WITHIN trading day we feedback to MM the midpoint of best bid and ask in the market as an auxS\
    in the begin

    day 1: auxS = fundamental value
    SD = 0
    at the beginning of the days > 1, auxS = average price of day 1.
    at the day 2 SD  stays stable within each trading round
    For all days but 1 :
    sigma = SD of all closed contracts (closed bids) of the privious day
    auxS = SD of all closed contracts (closed bids) of the privious day

    FOR NOISE TRADERS: AUX_P IS ALWAYS PREIVOUS ONE

    market makers put some bids around average price of the PREVIOUS session for both sides.
    market makers when someone accepts one of their bids, replace both their bids.
    Dynamically MMs get the current shares he or she owns.

    market makers (!!!and noise traders) in the beginning of the trading session will get
    instead of the mean price history, just a fundamental value.
    instead of SD MMs will get 0.

    :return:
    """
@db_task()
def handle_update(group_id, virtual_id):
    # Matlab input: for noise traders we get the average price history
    # In addition: for market maker: add sd of the price history
    # In addition calculate fundamental value
    # Fundamental value is: (mean of dividends )*(Num_rounds  - Current round number +1 ) + terminal_value


    virtual = Player.objects.get(id=virtual_id)
    # TODO: we call here MATLAB with (mean_price, fundamental_value).
    # Check for attainability: inventory condition (cash and shares) and one-side condition (they can post to only
    group = Group.objects.get(id=group_id)
    market = random.choice(Constants.markets)
    bid_type = random.choice(['sell', 'buy'])
    direction = 1 if bid_type == 'sell' else -1
    order_by = '-' if bid_type == 'sell' else ''
    epsilon = 1
    current_bids = group.bids.filter(market=market, type=bid_type, active=True).order_by(f'{order_by}value')
    if current_bids.exists():
        value=current_bids.first().value+ direction * epsilon
    else:
        price = getattr(group, f'price_{market}')
        value = price + direction * epsilon
    timestamp = timezone.now()
    data = dict(type=bid_type, market=market, value=value)
    resp = virtual.addBid(data, timestamp)
    bids = group.get_active_bids()

    for i in group.get_non_virtuals():
        msg = {i.participant.code: dict(timestamp=timestamp.strftime('%m_%d_%Y_%H_%M_%S'), action='setBids', bids=bids)}
        _live_send_back(i.participant._session_code, i.participant._index_in_pages,
                        msg)
