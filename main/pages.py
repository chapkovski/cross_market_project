from otree.api import Currency as c, currency_range
from ._builtin import Page, WaitPage
from .models import Constants


class FirstWP(WaitPage):
    def is_displayed(self):
        return self.round_number == 1

    group_by_arrival_time = True
    after_all_players_arrive = 'create_virtuals'


class SetParamsWP(WaitPage):
    after_all_players_arrive = 'set_group_params'


class Intro(Page):
    def is_displayed(self):
        return self.round_number == 1


class Trade(Page):
    live_method = 'register_event'

    def js_vars(self):
        return dict(status=self.player.current_status())


class ResultsWaitPage(WaitPage):
    after_all_players_arrive = 'set_payoffs'


class Results(Page):
    def get_timeout_seconds(self):
        return self.session.config.get('results_wait_time', 20)


page_sequence = [
    FirstWP,
    SetParamsWP,
    # Intro,
    Trade,
    ResultsWaitPage,
    Results
]
