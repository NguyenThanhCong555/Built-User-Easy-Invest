import { call, put, select, takeLatest } from 'redux-saga/effects';
import { selectAuth } from '../auth/selectors';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiGetV2 } from 'utils/http/request';
import { walletActions } from '.';
import History from 'app/components/History/History';

// by cong

export function* UserSeeAllCoinsInWallet(action: PayloadAction<any>) {
  try {
    const { id, token } = yield select(selectAuth);
    const url = '/ez/wallet/getinfo';
    const header = { userid: id, token: token };
    const res = yield call(apiGetV2, url, header);
    if (res.data.error === 0) {
      yield put(walletActions.response_SeeAllCoinsInWallet(res.data.data.assets));
    } else {
      console.log('error connected!');
    }
  } catch {}
}

export function* UsersViewTransactionHistoryByCoin(action: PayloadAction<any>) {
  try {
    const { id, token } = yield select(selectAuth);
    const url = `/ez/transaction/getbycoin?coin_id=${action.payload.coin_id}&page=${action.payload.page}&count=${action.payload.count}`;
    const header = { userid: id, token: token };
    const res = yield call(apiGetV2, url, header);
    const data = {
      payload: action.payload,
      data: res.data.data,
    };
    if (res.data.error === 0) {
      action.payload.page == 1
        ? yield put(walletActions.response_ViewTransactionHistoryByCoin(data))
        : yield put(walletActions.response_ScrollTransactionHistoryByCoin(res.data.data));
    }
  } catch {}
}

// export function* ScrollTransactionHistoryByCoin(action: PayloadAction<any>) {
//   try {
//     const { id, token } = yield select(selectAuth);
//     const url = `/ez/transaction/getbycoin?coin_id=${action.payload.coin_id}&page=${action.payload.page}&count=${action.payload.count}`;
//     const header = { userid: id, token: token };
//     const res = yield call(apiGetV2, url, header);
//     const dataRes = yield {
//       transactions: res.data.data.transactions,
//       total_page: action.payload.page,
//     };

//     if (res.data.error == 0) {
//       yield put(walletActions.response_ScrollTransactionHistoryByCoin(dataRes));
//     }
//   } catch {}
// }

function* UsersViewedATradingHistoryOfTheWallet(action: PayloadAction<any>) {
  try {
    const url = `/ez/transaction/getinfo?transaction_id=${action.payload.transaction_id}&}`;
    const { id, token } = yield select(selectAuth);
    const header = { userid: id, token: token };
    const res = yield call(apiGetV2, url, header);
    if (res.data.error == 0) {
      const action = {
        data: res.data.data,
      };
      yield put(walletActions.responseUsersViewedATradingHistoryOfTheWallet(action));
    }
  } catch {}
}

// by cong

// Get TransactionDetail
function* getTransactionDetail(action: PayloadAction<any>) {
  try {
    const url = `/ez/transaction/getinfo?transaction_id=${action.payload.transactionId}`;
    const response = yield call(apiGetV2, url, null);

    if (response.data?.message === 'success' && !response.data.data) History.push('/wallet/transaction/detail');
    yield put(walletActions.responseGetTransactionDetail(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(walletActions.responseGetTransactionDetail(response.data));
  }
}

// Get Wallet Transaction By Coin
function* getTransactionsByCoin(action: PayloadAction<any>) {
  try {
    const url = `/ez/transaction/getbycoin?coin_id=${action.payload.coinId}&page=${action.payload.page}`;
    const response = yield call(apiGetV2, url, null);
    yield put(walletActions.responseGetWalletTransactions(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };
    yield put(walletActions.responseGetWalletTransactions(response.data));
  }
}

// Get wallet total
function* getWalletTotalCoin(action: PayloadAction<{ coinId: string }>) {
  try {
    const url = `/ez/wallet/getbycoin?coin_id=${action.payload.coinId}`;
    const response = yield call(apiGetV2, url, null);

    // {"error":2,"message":"unauthorized"}
    // {"error":0,"message":"success","data":{"userid":11,"coin_id":1,"coin_name":"USDT","balance":1.0E7}}
    // {"error":0,"message":"success","data": null}
    // {error: 10, message: 'wallet_not_exist_coin'}

    if ((response.data.error === 0 && !response.data.data) || response.data.error === 10) {
      History.push('/wallet/coin');
    }

    yield put(walletActions.responseGetTotalCoin(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };
    yield put(walletActions.responseGetTotalCoin(response.data));
  }
}

function* filterTransactions(action: PayloadAction<any>) {
  try {
    const url = `/ez/transaction/filter?coin_id=${action.payload.coinId}&begin_time=${action.payload.begin_time}&end_time=${action.payload.end_time}&page=${action.payload.page}`;
    const response = yield call(apiGetV2, url, null);

    yield put(walletActions.responseFilterTransactions(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(walletActions.responseFilterTransactions(response.data));
  }
}

export function* walletSaga() {
  yield takeLatest(walletActions.requestGetTotalCoin.type, getWalletTotalCoin);
  yield takeLatest(walletActions.requestGetWalletTransactions.type, getTransactionsByCoin);
  yield takeLatest(walletActions.request_SeeAllCoinsInWallet, UserSeeAllCoinsInWallet);
  yield takeLatest(walletActions.requestFilterTransactions.type, filterTransactions);
  yield takeLatest(walletActions.request_ViewTransactionHistoryByCoin.type, UsersViewTransactionHistoryByCoin);
  // yield takeLatest(walletActions.request_ScrollTransactionHistoryByCoin.type, ScrollTransactionHistoryByCoin);
  yield takeLatest(walletActions.requestGetTransactionDetail.type, getTransactionDetail);
  yield takeLatest(walletActions.requestUsersViewedATradingHistoryOfTheWallet.type, UsersViewedATradingHistoryOfTheWallet);
}
