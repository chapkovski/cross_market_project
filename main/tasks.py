from huey.contrib.djhuey import task, periodic_task, db_task
from django.conf import settings
from otree.live import live_payload_function, _live_send_back
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync, sync_to_async
from otree.channels import utils as channel_utils
import json


@db_task()
def handle_update(group, virtual):
    page_index = group.player_set.exclude(virtual=True).first().participant._index_in_pages
    session_code = group.session.code
    group_name = channel_utils.live_group(session_code, page_index)
    message = json.dumps(dict(action='scheduled_virtual_action', participant_code=virtual.participant.code))
    channel_utils.sync_group_send_wrapper(
        group=group_name, type='websocket_receive', event=dict(text=message)
    )

