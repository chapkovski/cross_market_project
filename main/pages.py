from otree.api import Currency as c, currency_range
from ._builtin import  WaitPage
from .models import Constants
from intro.pages import Page

class FirstWP(WaitPage):
    def is_displayed(self):
        return self.round_number == 1

    group_by_arrival_time = True
    after_all_players_arrive = 'create_virtuals'


class SetParamsWP(WaitPage):
    after_all_players_arrive = 'set_group_params'





class Intro(Page):
    def is_displayed(self):
        return self.round_number == 1 and self.session.config.get('instructions')


class Trade(Page):
    live_method = 'register_event'
    page_tracker=False
    def js_vars(self):
        return dict(status=self.player.current_status())

    def before_next_page(self):
        self.player.day_is_finished = True


class ResultsWaitPage(WaitPage):
    after_all_players_arrive = 'set_payoffs'


class Results(Page):

    def get_timeout_seconds(self):
        return self.session.config.get('results_wait_time', 20)


class Emotion(Page):
    form_model = 'player'
    form_fields = ['triste','sorpreso', 'disgustato','felice', 'ansia','spaventato', 'annoiato']
        
    def is_displayed(self):
        return self.round_number in [5,10,15] and self.session.config.get('emotions')

class FinalResults(Page):
    def is_displayed(self):
        return self.round_number == Constants.num_rounds
    # def get_timeout_seconds(self):
    #     return self.session.config.get('results_wait_time', 20)


page_sequence = [
    FirstWP,
    # Intro,
    SetParamsWP,
    Trade,
    ResultsWaitPage,
    Results,
    Emotion,
    FinalResults
]
