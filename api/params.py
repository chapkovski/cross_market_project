import numpy as np
from scipy.linalg import expm
from math import log
import logging
from enum import Enum

logger = logging.getLogger(__name__)

NT_MARKET_PARAMS = dict(A=dict(T=0.25,
                               alfa=0.8499,
                               kappa=4.1946
                               ),
                        B=dict(T=0,
                               alfa=1 - 0.8499,
                               kappa=2))


class MM_PARAMS(float, Enum):
    A = 50
    Q = 20
    kappa_mm = 1
