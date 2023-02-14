from otree.api import Currency as c, currency_range
from ._builtin import Page, WaitPage
from .models import Constants


class Intro(Page):
    def is_displayed(self):
        return  self.session.config.get('instructions')


class CQ(Page):
    form_model = 'player'
    def is_displayed(self):
        return  self.session.config.get('instructions')

    def get_form_fields(self):
        return [f'question{i}' for i in range(1, 6)]


#page_sequence = [Intro, CQ]
page_sequence = [Intro]