from os import environ
import os
EXTENSION_APPS = ['main']
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
app_sequence = [
#    'intro',
    'main',
#    'last'
    ]
SESSION_CONFIGS = [
    dict(
        name='market_disjoint',
        display_name="market disjoint",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=False,
        seed_base=10
    ),
    dict(
        name='market_disjoint_20',
        display_name="market disjoint 2",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=False,
        seed_base=20
    ),
    dict(
        name='market_disjoint_30',
        display_name="market disjoint 3",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=False,
        seed_base=30
    ),
    dict(
        name='market_disjoint_40',
        display_name="market disjoint 4",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=False,
        seed_base=40
    ),
    dict(
        name='market_disjoint_50',
        display_name="market disjoint 5",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=False,
        seed_base=50
    ),
    dict(
        name='market_disjoint_60',
        display_name="market disjoint 6",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=False,
        seed_base=60
    ),
    dict(
        name='market_disjoint_70',
        display_name="market disjoint 7",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=False,
        seed_base=70
    ),
    dict(
        name='market_disjoint_80',
        display_name="market disjoint 8",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=False,
        seed_base=80
    ),
    dict(
        name='market_disjoint_90',
        display_name="market disjoint 9",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=False,
        seed_base=90
    ),
    dict(
        name='market_disjoint_100',
        display_name="market disjoint 10",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=False,
        seed_base=100
    ),
    dict(
        name='market_merged',
        display_name="market merged",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=True,
        seed_base=10
    ),
    dict(
        name='market_merged_20',
        display_name="market merged 2",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=True,
        seed_base=20
    ),
    dict(
        name='market_merged_30',
        display_name="market merged 3",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=True,
        seed_base=30
    ),
    dict(
        name='market_merged_40',
        display_name="market merged 4",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=True,
        seed_base=40
    ),
    dict(
        name='market_merged_50',
        display_name="market merged 5",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=True,
        seed_base=50
    ),
    dict(
        name='market_merged_60',
        display_name="market merged 6",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=True,
        seed_base=60
    ),
    dict(
        name='market_merged_70',
        display_name="market merged 7",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=True,
        seed_base=70
    ),
    dict(
        name='market_merged_80',
        display_name="market merged 8",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=True,
        seed_base=80
    ),
    dict(
        name='market_merged_90',
        display_name="market merged 9",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=True,
        seed_base=90
    ),
    dict(
        name='market_merged_100',
        display_name="market merged 10",
        num_demo_participants=1,
        app_sequence=app_sequence,
        merged=True,
        seed_base=100
    )
]

# if you set a property in SESSION_CONFIG_DEFAULTS, it will be inherited by all configs
# in SESSION_CONFIGS, except those that explicitly override it.
# the session config can be accessed from methods in your apps as self.session.config,
# e.g. self.session.config['participation_fee']

SESSION_CONFIG_DEFAULTS = dict(
    instructions=True,
    real_world_currency_per_point=1.00, participation_fee=0.00, doc="",
    initial_shares_A=2,
    initial_shares_B=2,
    initial_money_A_virtual=10,
    initial_money_B_virtual=10,
    initial_money_A_human=10,
    initial_money_B_human=10,
    seed_base=10,
    group_size=1,
    day_length=180,
    dividends_A='0, 0.10, 0.16, 0.22',
    dividends_B='-0.20,-0.10,0,0.10, 0.20',
    terminal_A=1.80,
    terminal_B=2.80,
    num_virtual_players=30,
    num_mms=10,
    max_calls=6,
    results_wait_time=30
)

# ISO-639 code
# for example: de, fr, ja, ko, zh-hans
LANGUAGE_CODE = 'it'

# e.g. EUR, GBP, CNY, JPY
REAL_WORLD_CURRENCY_CODE = 'USD'
USE_POINTS = True
POINTS_CUSTOM_NAME = 'ECU'
POINTS_DECIMAL_PLACES = 2
REAL_WORLD_CURRENCY_DECIMAL_PLACES = 2
ADMIN_USERNAME = 'admin'
# for security, best to set admin password in an environment variable
ADMIN_PASSWORD = environ.get('OTREE_ADMIN_PASSWORD')

DEMO_PAGE_INTRO_HTML = """ """

SECRET_KEY = '@zp663)siip88aobjn01c4zs6)ev9h4j5jt@kbrke4!fdp^q15'

# if an app is included in SESSION_CONFIGS, you don't need to list it here
INSTALLED_APPS = ['otree',
                  'huey.contrib.djhuey',
                  ]

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",

    },
}
from huey import RedisHuey
from redis import ConnectionPool

REDIS_URL = os.environ.get('REDIS_URL', "redis://localhost:6379")

if REDIS_URL:
    HUEY = {
        'huey_class': 'huey.RedisHuey',  # Huey implementation to use.
        # 'name': settings.DATABASES['default']['NAME'],  # Use db name for huey.
        'results': True,  # Store return values of tasks.
        'store_none': False,  # If a task returns None, do not save to results.
        'immediate': False,
        'utc': True,  # Use UTC for all times internally.
        'blocking': True,  # Perform blocking pop rather than poll Redis.
        'connection': {
            # 'host': 'localhost',
            # 'port': 6379,
            # 'db': 0,
            # 'connection_pool': None,  # Definitely you should use pooling!
            # ... tons of other options, see redis-py for details.

            # huey-specific connection parameters.
            'read_timeout': 1,  # If not polling (blocking pop), use timeout.
            'url': REDIS_URL,  # Allow Redis config via a DSN.
        },
        'consumer': {
            'workers': 10,
            'worker_type': 'thread',
            'initial_delay': 0.1,  # Smallest polling interval, same as -d.
            'backoff': 1.15,  # Exponential backoff using this rate, -b.
            'max_delay': 10.0,  # Max possible polling interval, -m.
            'scheduler_interval': 1,  # Check schedule every second, -s.
            'periodic': True,  # Enable crontab feature.
            'check_worker_health': True,  # Enable worker health checks.
            'health_check_interval': 1,  # Check worker health every second.
        },
    }

    CHANNEL_LAYERS['default']["CONFIG"] = {
        "hosts": [REDIS_URL],
    }
