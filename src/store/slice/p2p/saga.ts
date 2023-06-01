import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { p2pActions } from '.';
import { apiGetV2, apiPostV2 } from 'utils/http/request';
import History from 'app/components/History/History';
import { RequestBuySellCoin } from './types';

function* handleBuyCoin(action: PayloadAction<RequestBuySellCoin>) {
  try {
    const url = `/ez/wallet/purchase`;
    const response = yield call(apiPostV2, url, action.payload, null);

    yield put(p2pActions.responseBuyCoin(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(p2pActions.responseBuyCoin(response));
  }
}

function* handleSellCoin(action: PayloadAction<RequestBuySellCoin>) {
  try {
    const url = `/ez/wallet/selling`;
    const response = yield call(apiPostV2, url, action.payload, null);

    yield put(p2pActions.responseSellCoin(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(p2pActions.responseSellCoin(response));
  }
}

export function* p2pSaga() {
  yield takeLatest(p2pActions.requestBuyCoin.type, handleBuyCoin);
  yield takeLatest(p2pActions.requestSellCoin.type, handleSellCoin);
}
