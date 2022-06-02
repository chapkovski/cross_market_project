from huey.contrib.djhuey import task, periodic_task, db_task
from django.conf import settings
from otree.live import live_payload_function, _live_send_back
from api.utils import nt_quote_wrapper
from main.models import Group, Player, Constants, BidType
from django.utils import timezone
from pprint import  pprint
bid_types = ['sell', 'buy']


@db_task()
def handle_update(group_id, virtual_id, market, quote, eta):
    virtual = Player.objects.get(id=virtual_id)
    # Check for attainability: inventory condition (cash and shares) and one-side condition (they can post to only
    group = Group.objects.get(id=group_id)
    bid_type = bid_types[quote.get('direction')]
    timestamp = eta
    data = dict(type=bid_type, market=market, value=round(quote.get('quote'), 2))
    resp = virtual.addBid(data, timestamp)

    for i in group.get_non_virtuals():
        msg = {i.participant.code: dict(timestamp=timestamp.strftime('%m_%d_%Y_%H_%M_%S'), **resp.get(i.id_in_group,{}))
               }

        _live_send_back(i.participant._session_code, i.participant._index_in_pages,
                        msg)
