from otree.api import Currency as c, currency_range
from ._builtin import Page, WaitPage
from .models import Constants

class FirstWP(WaitPage):
    def is_displayed(self):
        return self.round_number == 1
    group_by_arrival_time = True
    after_all_players_arrive = 'set_group_params'

class MyPage(Page):
    live_method = 'register_event'
    def js_vars(self):
        return dict(status=self.player.current_status())

class ResultsWaitPage(WaitPage):
    pass


class Results(Page):
    pass


page_sequence = [
    FirstWP,
    MyPage, ResultsWaitPage, Results]
