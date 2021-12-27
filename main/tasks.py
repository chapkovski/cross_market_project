from huey.contrib.djhuey import task, periodic_task, db_task
from django.conf import settings
from otree.live import live_payload_function, _live_send_back
from pprint import pprint
from otree.channels import utils as channel_utils
import json
from main.models import Group, Player, Constants, BidType
import random
from django.utils import timezone

@db_task()
def handle_update(group_id, virtual_id):
    virtual = Player.objects.get(id=virtual_id)
    group = Group.objects.get(id=group_id)
    market = random.choice(Constants.markets)
    bid_type = random.choice([BidType.sell, BidType.buy])
    epsilon = 1
    price = getattr(group, f'price_{market}')
    direction = 1 if bid_type == 'sell' else -1
    timestamp = timezone.now()
    value = price + direction * epsilon
    data = dict(type=bid_type, market=market, value=value)
    resp = virtual.addBid(data, timestamp)
    bids = group.bids.filter(active=True).values('trader', 'value', 'type', 'market', 'id')
    bids = list(bids)
    msg =  {
        0: dict(timestamp=timestamp.strftime('%m_%d_%Y_%H_%M_%S'), action='setBids', bids=bids)}
    print('-------------------------')
    return
    page_index = group.index_in_pages
    session_code = group.session.code
    group_name = channel_utils.live_group(session_code, page_index)
    message = json.dumps(dict(action='scheduled_virtual_action', virtual_player_id=virtual.id))
    channel_utils.sync_group_send_wrapper(
        group=group_name, type='websocket_receive', event=dict(text=message)
    )
