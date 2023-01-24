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


author = 'Philipp Chapkovski'

doc = """
Your app description
"""


class Constants(BaseConstants):
    name_in_url = 'last'
    players_per_group = None
    num_rounds = 1


class Subsession(BaseSubsession):
    pass


class Group(BaseGroup):
    pass


class Player(BasePlayer):
    fin1 = models.IntegerField(
        choices=[[1, "più di oggi"], [2, "lo stesso ammontare"], [3, "meno di oggi"], [4, "non so"]],
        label="Immagina di ricevere in regalo 100 Euro. Immagina inoltre di dover attendere 1 anno prima di poter incassare la somma e che l'inflazione sia all'1%. Rispetto ad oggi tra un anno potrai acquistare:",
        widget=widgets.RadioSelectHorizontal,
    )
    fin2 = models.IntegerField(
        label="Immagina di mettere 100 Euro in un conto di risparmio, senza costi aggiuntivi che garantisce il 2% di interessi all'anno. Immagina inoltre di non effettuare alcun prelievo o versamento da questo conto. Quanto avrai a disposizione in totale tra un anno?",
        min=0, max=150
    )

    fin3 = models.IntegerField(
        choices=[[1, "più di 110"], [2, "esattamente 110"], [3, "meno di 110"], [4, "non so"]],
        label="In relazione ancora allo stesso conto di risparmio, immagina sempre di non effettuare pagamenti o ritiri dal conto e non ci sono tasse. Quanto avrai a disposizione tra 5 anni? ",
        widget=widgets.RadioSelectHorizontal,
    )

    robo1 = models.IntegerField(
        choices=[[1, "sì"], [2, "no"]],
        label="Hai usato robo-advisors in passato?",
        widget=widgets.RadioSelectHorizontal,
    )
    robo2 = models.IntegerField(
        choices=[[1, "sì"], [2, "no"], [3, "non so"]],
        label="Sei disposto ad usare robo-advisors in futuro per consigliare le tue scelte finanziarie?",
        widget=widgets.RadioSelectHorizontal,
    )

    exp = models.IntegerField(
        choices=[[1, "1 (bassa)"], [2, "no"], [7, "7 (alta)"]],
        label="Come valuteresti la tua esperienza con i mercati finanziari reali?",
        widget=widgets.RadioSelectHorizontal,
    )

    eta = models.IntegerField(label="Quanti anni hai?", max=60, min=18)

    sesso = models.StringField(
        choices=[["Maschio", "Maschio"], ["Femmina ", "Femmina "], ["Altro", "Altro"]],
        label="Qual è il tuo sesso?",
        widget=widgets.RadioSelect,
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

    anni_studio = models.IntegerField(label="Da quanti anni studi all'università?")

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

    istruzione = models.StringField(
        blank=False,
        choices=[
            ["Dottorato", "Dottorato"],
            ["Laurea specialistica", "Laurea specialistica"],
            ["Laurea triennale", "Laurea triennale"],
            ["Diploma", "Diploma"],
            ["Altro", "Altro"],
        ],
        label="Seleziona l'opzione che ti riguarda",
        widget=widgets.RadioSelect,
    )
