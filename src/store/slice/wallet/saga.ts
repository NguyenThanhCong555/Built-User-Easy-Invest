import { call, put, select, takeLatest } from 'redux-saga/effects';
import { selectAuth } from '../auth/selectors';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiGet } from 'utils/http/request';
import { walletActions } from '.';
import History from 'app/components/History/History';

// Get Wallet Transaction By Coin
function* getTransactionsByCoin(action: PayloadAction<any>) {
  try {
    const { id, token } = yield select(selectAuth);
    const url = `/ez/transaction/getbycoin?coin_id=${action.payload.coinId}&page=${action.payload.page}&count=${action.payload.count}`;

    const response = yield call(apiGet, url, { userid: id, token: token });

    // {"error":2,"message":"unauthorized"}
    // {"error":0,"message":"success","data":{"total_page":0,"transactions":[]}}
    // Có coin nhưng ko có giao dịch, giống ko có coin ko có giao dịch
    console.log(response);

    yield put(walletActions.responseGetWalletTransactions(response));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };
    // yield put(walletActions.responseGetTotalCoin(response));
  }
}

// Get wallet total
function* getWalletTotalCoin(action: PayloadAction<{ coinId: string }>) {
  try {
    const { id, token } = yield select(selectAuth);
    const url = `/ez/wallet/getbycoin?coin_id=${action.payload.coinId}`;

    const response = yield call(apiGet, url, { userid: id, token: token });

    // {"error":2,"message":"unauthorized"}
    // {"error":0,"message":"success","data":{"userid":11,"coin_id":1,"coin_name":"USDT","balance":1.0E7}}
    // {"error":0,"message":"success","data": null}
    // {error: 10, message: 'wallet_not_exist_coin'}

    if ((response.error === 0 && !response.data) || response.error === 10) {
      History.push('/404');
    }

    yield put(walletActions.responseGetTotalCoin(response));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };
    yield put(walletActions.responseGetTotalCoin(response));
  }
}
export function* walletSaga() {
  yield takeLatest(walletActions.requestGetTotalCoin.type, getWalletTotalCoin);
  yield takeLatest(walletActions.requestGetWalletTransactions.type, getTransactionsByCoin);
}
