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
    """
    keep the portofoglio of cash and shares from period to period.


    The price history is not dynamic: we get rid of chart in period 1.
    Price history is a history of closing prices in previous days.
    Mean price and sd - OF THE PREVIOUS DAYS!!!!

    :param group_id:
    :param virtual_id:
    :return:
    """
    # TODO: move to group function

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
    bids = group.bids.filter(active=True).values('trader', 'value', 'type', 'market', 'id', 'trader__virtual')
    bids = list(bids)
    for i in group.get_non_virtuals():
        msg = {i.participant.code: dict(timestamp=timestamp.strftime('%m_%d_%Y_%H_%M_%S'), action='setBids', bids=bids)}
        _live_send_back(i.participant._session_code, i.participant._index_in_pages,
                        msg)
