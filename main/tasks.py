from huey.contrib.djhuey import task, periodic_task, db_task
from django.conf import settings
from otree.live import live_payload_function, _live_send_back
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync,sync_to_async

@db_task()
def handle_update(group):
    for i in group.get_players():
        pcode_retval = {i.participant.code: {'action':'from_huey', }}
        _live_send_back(i.participant._session_code, i.participant._index_in_pages,
                        pcode_retval)

