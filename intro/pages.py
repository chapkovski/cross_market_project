from otree.api import Currency as c, currency_range
from ._builtin import Page as oTreePage, WaitPage
from .models import Constants


class Page(oTreePage):
    page_tracker = True
    live_method = 'register_page_arrival'


class HoldPage(Page):
    def get_timeout_seconds(self):
        return self.session.config.get('hold_seconds', 10)

    def vars_for_template(self):
        return dict(
            wait_message=self.session.config.get(
                'wait_message', ' Please wait...')
        )


class Intro(Page):
    page_tracker = True
    live_method = 'register_page_arrival'

    def is_displayed(self):
        return self.session.config.get('instructions')


class CQ(Page):
    form_model = 'player'

    def is_displayed(self):
        return self.session.config.get('instructions')

    def get_form_fields(self):
        return [f'question{i}' for i in range(1, 6)]


#page_sequence = [Intro, CQ]
page_sequence = [
    HoldPage,
    Intro]
