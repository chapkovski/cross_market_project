from huey.contrib.djhuey import task, periodic_task, db_task
from django.conf import settings

@db_task()
def handle_update(player):
    from .models import  Player
    print(player.id)
    p = Player.objects.get(id=player.id)
    print(p.participant.code)
    # print(Player.objects.all())
    p.huey_val+=1
    p.save()
    p.register_event(dict(action='JOPAJOPAJOPA!'))
    print('PIZDA!')
    return 'JOPA'