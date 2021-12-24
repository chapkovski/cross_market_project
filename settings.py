from os import environ
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
SESSION_CONFIGS = [
    dict(
        name='market_disjoint',
        display_name="market disjoint",
        num_demo_participants=3,
        app_sequence=['main'],
        merged=False
    ),
    dict(
        name='market_merged',
        display_name="market merged",
        num_demo_participants=3,
        app_sequence=['main'],
        merged=True
    ),
]

# if you set a property in SESSION_CONFIG_DEFAULTS, it will be inherited by all configs
# in SESSION_CONFIGS, except those that explicitly override it.
# the session config can be accessed from methods in your apps as self.session.config,
# e.g. self.session.config['participation_fee']

SESSION_CONFIG_DEFAULTS = dict(
    real_world_currency_per_point=1.00, participation_fee=0.00, doc="",
    initial_shares_A=2,
    initial_shares_B=2,
    initial_money_A=250,
    initial_money_B=250,
    starting_price_A=100,
    starting_price_B=100,
    group_size=3,
    day_length=150,
    dividends_A='0, 10, 16, 22',
    dividends_B='-20,-10,0,10, 20',
    terminal_A=50.0,
    terminal_B=70.0

)

# ISO-639 code
# for example: de, fr, ja, ko, zh-hans
LANGUAGE_CODE = 'en'

# e.g. EUR, GBP, CNY, JPY
REAL_WORLD_CURRENCY_CODE = 'USD'
USE_POINTS = True

ADMIN_USERNAME = 'admin'
# for security, best to set admin password in an environment variable
ADMIN_PASSWORD = environ.get('OTREE_ADMIN_PASSWORD')

DEMO_PAGE_INTRO_HTML = """ """

SECRET_KEY = '@zp663)siip88aobjn01c4zs6)ev9h4j5jt@kbrke4!fdp^q15'

# if an app is included in SESSION_CONFIGS, you don't need to list it here
INSTALLED_APPS = ['otree',
                  'huey.contrib.djhuey',
                  ]
from huey import SqliteHuey

# HUEY = SqliteHuey('db.sqlite3')
# HUEY = {
#     'huey_class': 'huey.SqliteHuey',
#     'immediate_use_memory': False,
#     "immediate": False
# }
# HUEY = {'huey_class': 'huey.SqliteHuey',
#         # 'name': 'spirit',
#         'filename': os.path.join(BASE_DIR, 'huey.sqlite3'),
#         'immediate_use_memory': False,
#         "immediate": False
#         }
# HUEY = {
#     'huey_class': 'huey.SqliteHuey',
#     'name': 'spirit',
#     'filename': os.path.join(BASE_DIR, 'huey.sqlite3'),
#     'immediate_use_memory': False,
#     'immediate': False,
#     'utc': True,
#     'connection': {},
#     'consumer': {
#         'workers': os.cpu_count() * 2 + 1,
#         'worker_type': 'thread',
#         'initial_delay': 0.1,
#         'backoff': 1.15,
#         'max_delay': 10.0,
#         'scheduler_interval': 1,
#         'periodic': True,
#         'check_worker_health': True,
#         'health_check_interval': 1,
#     }
# }
from channels_redis.core import  RedisChannelLayer
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        # "CONFIG": {
        #     "hosts": [("127.0.0.1", 6379)],
        # },
    },
}
