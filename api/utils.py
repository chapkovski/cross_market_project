import numpy as np
from scipy.linalg import expm
from math import log
import logging
from .params import  MM_PARAMS
logger = logging.getLogger(__name__)

NT_MARKET_PARAMS = dict(A=dict(T=0.25,
                               alfa=0.8499,
                               kappa=4.1946
                               ),
                        B=dict(T=0,
                               alfa=1-0.8499,
                               kappa=2))


def aux_func_v_mm(q, tt, Q, M, T):
    """

    :return:
    """

    """Original matlab function
    function aux1=aux_func_v_mm(q,tt,Q,M,T)
        % we create a list of integers from -q to q with a step of 1
        aux_ix = -Q:1:Q;
        % we find a position of aux_ix in this list of integers
        ix = find(aux_ix==q);
        % we creat a vector of ones of the length of double Q, and multiply it with
        % exponent
        aux = ones(1,2*Q+1)*expm(-M*(T-tt));
         
         % and we return the value of it from the index of Q
        aux1 = aux(ix);
        
        end

    """
    aux_ix = np.arange(-Q, Q, 1)
    ix = np.where(aux_ix == q)[0][0]
    aux = np.ones(2 * Q + 1).dot(expm(-M * (T - tt)))
    return aux[ix]


def market_maker_posting_quotes(A, risk_aversion_MM, kappa_mm, Q, q_mm, sigma_mm, aux_S, tt, T):
    """

    :return:
    """

    """Original matlab function
    function  [s_bid, s_ask] = market_maker_posting_quotes(A, risk_aversion_MM, kappa_mm, Q, q_mm, sigma_mm, aux_S,  tt, T)
    %for a given asset
    % -A, risk_aversion_MM, kappa_mm are general parameters
    % -Q is the maximum inventory ,
    % -q_mm is the current inventory 
    % -sigma_mm, aux_S is the volatility (st. dev) and average of the previous trading time 
    % period
    % at tt=0 is set to zero and to fundamental value, respectively
    % -tt is the trading period
    %for a mm (selected to post a new bids)
    %generate the quote and the direction of trade
    % the quote and direction are both vectors
    %MM automatically updates their quotes, cancelling the old ones
    %try A=10; Q=30; risk_aversion_MM=0.5; kappa_m=1, q_mm=2; sigma_mm=0.5; auxS=100; tt=1; T=15
            eta_mm = A*(1+risk_aversion_MM/kappa_mm)^(-(1+kappa_mm/risk_aversion_MM));
            alfa_mm = 0.5*kappa_mm*risk_aversion_MM*sigma_mm^2;
            aux_QQ = -Q:1:Q;
            M = diag(alfa_mm.*(aux_QQ).^2)+diag(-eta_mm*ones(1,2*Q),1)+diag(-eta_mm*ones(1,2*Q),-1);
     
            
            v_mm = @(q,tt) aux_func_v_mm(q,tt,Q,M,T);
    
            aux_term3 = log(1+risk_aversion_MM/kappa_mm)/risk_aversion_MM;
            
                   
            s_bid = aux_S+...
                -log(v_mm(q_mm,tt)/v_mm(q_mm+1,tt))/kappa_mm+...
                -aux_term3;
                
            if s_bid <= 0
                s_bid  = 0.01;
            end
            s_ask = aux_S+...
                +log(v_mm(q_mm,tt)/v_mm(q_mm-1,tt))/kappa_mm+...
                +aux_term3;
    
    
    end
    """

    eta_mm = A * (1 + risk_aversion_MM / kappa_mm) ** (-(1 + kappa_mm / risk_aversion_MM))
    alfa_mm = 0.5 * kappa_mm * risk_aversion_MM * sigma_mm ** 2;
    aux_QQ = np.arange(-Q, Q + 1, 1)
    M = np.diag(alfa_mm * (aux_QQ) ** 2) + np.diag(-eta_mm * np.ones(2 * Q), 1) + np.diag(-eta_mm * np.ones(2 * Q), -1)

    def v_mm(q, tt):
        return aux_func_v_mm(q, tt, Q, M, T)

    aux_term3 = log(1 + risk_aversion_MM / kappa_mm) / risk_aversion_MM

    s_bid = aux_S + -log(v_mm(q_mm, tt) / v_mm(q_mm + 1, tt)) / kappa_mm + -aux_term3

    if s_bid <= 0:
        s_bid = 0.01

    s_ask = aux_S + +log(v_mm(q_mm, tt) / v_mm(q_mm - 1, tt)) / kappa_mm + +aux_term3
    return dict(s_bid=round(s_bid, 2), s_ask=round(s_ask, 2))


def noise_trading_posting_quotes(tt, fundamental_value, phi, kappa, alfa, aux_p1, seed_base):
    """

    :return:
    """
    """Original matlab function
    
    function  [quote, direction]=noise_trading_posting_quotes(tt,D,phi,kappa,alfa,aux_p1)
        
        %for a trader (selected to post a new bid)
        %generate the quote and the direction of trade
        %attention !!!!!!!!!!!!!!!--->
        %the inventory condition is controllated in the script aux_LOB_dynamics.m
        
        %flag to know if the trader is a buyer or a seller
        direction=binornd(1,max(0.5-phi*tt,0));
        u1= (kappa*D(tt))*rand(1,1);
        quote=(1-alfa)*u1+alfa*aux_p1;
        
        quote=round(quote*100)/100;
        end
        
    """
    rng = np.random.default_rng(tt+seed_base)

    direction = rng.binomial(1, max(0.5 - phi * tt, 0))
    u1 = kappa * fundamental_value * rng.random()
    print(f'{alfa=},{u1=},{aux_p1=}')
    quote = (1 - alfa) * u1 + alfa * aux_p1
    return dict(direction=direction, quote=quote)


def nt_quote_wrapper(round_number, fundamental_value, aux_S, num_rounds, market, seed_base):
    params = NT_MARKET_PARAMS[market].copy()
    params['phi'] = params.get('T', 0)/num_rounds
    params.pop('T', None)
    return noise_trading_posting_quotes(tt=round_number,
                                        fundamental_value=fundamental_value,
                                        aux_p1=aux_S,
                                        seed_base=seed_base,
                                        **params)


def mm_wrapper(round_number, num_rounds, aux_S, sigma_mm, risk_aversion, q_mm):
    res = market_maker_posting_quotes(A=int(MM_PARAMS.A),
                                      risk_aversion_MM=risk_aversion,
                                      kappa_mm=MM_PARAMS.kappa_mm,
                                      Q=int(MM_PARAMS.Q),
                                      q_mm=q_mm,
                                      sigma_mm=sigma_mm,
                                      aux_S=aux_S, tt=round_number, T=num_rounds)
    logger.info(
        f'MM returns {res}. Other params: {risk_aversion=}; {q_mm=}; {sigma_mm=}; {aux_S}; {round_number=};{num_rounds=}')
    return res


if __name__ == '__main__':

    res = market_maker_posting_quotes(A=10, risk_aversion_MM=.5, kappa_mm=1, Q=30, q_mm=2, sigma_mm=.5,
                                      aux_S=100, tt=1, T=15)

    print(res)
    res = noise_trading_posting_quotes(tt=1, fundamental_value=3, phi=0, kappa=2, alfa=0.85, aux_p1=100)
    print(res)
