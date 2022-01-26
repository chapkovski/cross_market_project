from typing import Optional

from fastapi import FastAPI
from utils import market_maker_posting_quotes, noise_trading_posting_quotes
app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/mm_bids/")
def read_item(A:int, risk_aversion_MM:float, kappa_mm:float, Q:int, q_mm:float, sigma_mm:float,
                                      aux_S:float, tt:int, T:int):
    return market_maker_posting_quotes(A, risk_aversion_MM, kappa_mm, Q, q_mm, sigma_mm, aux_S, tt, T)

@app.get("/nt_quotes/")
def read_item(tt:int, fundamental_value:float, phi:float, kappa:float, alfa:float, aux_p1:float):
    return noise_trading_posting_quotes(tt, fundamental_value, phi, kappa, alfa, aux_p1)