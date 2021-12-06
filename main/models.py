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
        bids = []
        for g in self.get_groups():
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
    pass


class Player(BasePlayer):
    def register_event(self, data):
        print('DATA', data)
        timestamp = timezone.now()
        bids = self.group.bids.filter(active=True).values('trader', 'value', 'type', 'market')
        bids = list(bids)
        print(bids)
        return {
            self.id_in_group: dict(timestamp=timestamp.strftime('%m_%d_%Y_%H_%M_%S'), action='setBids', bids=bids)}


class Bid(djmodels.Model):
    class Meta:
        ordering = ['timestamp']
        get_latest_by = 'timestamp'

    group = djmodels.ForeignKey(to=Group, on_delete=djmodels.CASCADE, related_name='bids')
    trader = djmodels.ForeignKey(to=Player, on_delete=djmodels.CASCADE, related_name='bids')
    market = models.StringField()
    value = models.FloatField()
    type = models.StringField()
    timestamp = djmodels.DateTimeField(null=True)
    active = models.BooleanField()
