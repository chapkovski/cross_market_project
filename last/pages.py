from otree.api import Currency as c, currency_range
from ._builtin import  WaitPage
from .models import Constants
from intro.pages import Page

class Q1(Page):
    form_model = 'player'
    form_fields = [
        'fin1',
        'fin2',
        'fin3',
        'eta',
        'sesso',
        'corso_studio',
        'anni_studio',
        'studente'
    ]

class QProf(Page):
    form_model = 'player'
    form_fields = [
        'fin1',
        'fin2',
        'fin3',
        'eta',
        'sesso',
        'istruzione',
        'robo1',
        'robo2',
        'exp'
        ]


class Results(Page):
    pass



# page sequence for students
page_sequence = [Q1, Results]

# page_sequence for professionals
#page_sequence = [Results, QProf]
