import matlab.engine
from pprint import pprint



def get_engine(name):
    eng = matlab.engine.connect_matlab(name)
    print(eng.sqrt(4.0))
    return eng


eng = get_engine('FILKA')


def get_nt_quote(round_number, num_rounds, prev_price, dividends):
    alfa = 0.85;
    kappa = 2.0;
    phi = 0.0;
    tt = float(round_number)
    T = num_rounds
    auxS = float(prev_price)
    d1_end = 1.80;

    t = range(1, T + 1);

    D = [round(sum(dividends) / len(dividends) * (T - i + 1) + d1_end, 4) for i in t]
    D = matlab.double(D)

    res = eng.nt_quotes(tt, D, phi, kappa, alfa, auxS)
    return res


def get_mm_bids(round_number, num_rounds, prev_price, prev_volatility):
    A = 10.0;
    Q = 30.0;
    risk_aversion_MM = 0.5;
    kappa_mm = 1.0;
    q_mm = 2.0;
    sigma_mm = float(prev_volatility)
    auxS = float(prev_price)
    tt = float(round_number)
    T = float(num_rounds)
    output = eng.mm(A, risk_aversion_MM, kappa_mm, Q, q_mm, sigma_mm, auxS, tt, T);
    return output


if __name__ == '__main__':
    pprint(get_mm_bids(1, 15, 100, 0.5))
    pprint(get_nt_quote(round_number=1, num_rounds=15, prev_price=100,  dividends=[0, 0.1, 0.16, 0.22]))
