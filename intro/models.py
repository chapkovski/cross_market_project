from main.models import PageRegister
import dateparser
from datetime import datetime, timedelta
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

from django.utils import timezone
author = 'Your name here'

doc = """
Your app description
"""


class Constants(BaseConstants):
    name_in_url = 'intro'
    players_per_group = None
    num_rounds = 1


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


def register_page_arrival(player, data):
    server_time = timezone.now()
    client_time = data.get('time')
    client_timezone = data.get('timezone','')
    client_offset = data.get('offset',0)
    page_name = player.participant._current_page_name
    milliseconds = data.get('milliseconds', 0)
    client_time_parsed = dateparser.parse(client_time)
    client_time_parsed += timedelta(milliseconds=milliseconds)
    p = PageRegister.objects.create(
        client_timezone =client_timezone,
        client_time_str = client_time,
        client_offset=client_offset,
        server_time_str=server_time.strftime("%m/%d/%Y, %H:%M:%S:%f %z"),
        client_time=client_time_parsed,
        server_time=server_time,
        page_name=page_name,
        owner=player.participant
    )
    print(p)


class Player(BasePlayer):
    register_page_arrival = register_page_arrival
    question1 = models.IntegerField(
        choices=[[1, "1.80"], [2, "2.80"], [3, "0"]],
        label="A quale prezzo vengono acquistate le azioni di tipo A al termine dell'esperimento?",
        max=3,
        min=1,
        widget=widgets.RadioSelectHorizontal,
    )

    question2 = models.IntegerField(
        choices=[[1, "1.80"], [2, "2.80"], [3, "0"]],
        label="A quale prezzo vengono acquistate le azioni di tipo B al termine dell'esperimento?",
        max=3,
        min=1,
        widget=widgets.RadioSelectHorizontal,
    )

    question3 = models.IntegerField(
        choices=[[1, "0"], [2, "0.12"], [3, "-0.12"]],
        label="A quanto ammonta il dividendo medio per una azione A?",
        max=3,
        min=1,
        widget=widgets.RadioSelectHorizontal,
    )
    question4 = models.IntegerField(
        choices=[[1, "0"], [2, "0.12"], [3, "-0.12"]],
        label="A quanto ammonta il dividendo medio per una azione B?",
        max=3,
        min=1,
        widget=widgets.RadioSelectHorizontal,
    )
    question5 = models.IntegerField(
        choices=[[1, "100"], [2, "90"], [3, "110"]],
        label="Immagina di aver un elenco di offerte di vendita, 90, 100, 110. Quale tra queste è la migliore?",
        max=3,
        min=1,
        widget=widgets.RadioSelectHorizontal,
    )

    question6 = models.IntegerField(
        choices=[[1, "100"], [2, "90"], [3, "110"]],
        label="Immagina di aver un elenco di offerte di vendita, 90, 100, 110. Quale tra queste è la migliore?",
        max=3,
        min=1,
        widget=widgets.RadioSelectHorizontal,
    )

    corso_studio = models.StringField(
        choices=[
            ["Agraria", "Agraria"],
            ["Biologia", "Biologia"],
            ["Chimica", "Chimica"],
            ["Economia", "Economia"],
            ["Farmacia", "Farmacia"],
            ["Filosofia", "Filosofia"],
            ["Fisica", "Fisica"],
            ["Giurisprudenza", "Giurisprudenza"],
            ["Informatica", "Informatica"],
            ["Ingegneria", "Ingegneria"],
            ["Matematica", "Matematica"],
            ["Medicina", "Medicina"],
            ["Lingue", "Lingue"],
            ["Altro", "Altro"],
        ],
        label="Quale è il tuo corso di studi?",
        widget=widgets.RadioSelect,
    )

    anni_studio = models.IntegerField(
        label="Da quanti anni studi all'università?")
    studente = models.StringField(
        blank=False,
        choices=[
            ["Studente", "Studente"],
            ["Studente Lavoratore", "Studente Lavoratore"],
            ["Altro", "Altro"],
        ],
        label="Seleziona l'opzione che ti riguarda",
        widget=widgets.RadioSelect,
    )
