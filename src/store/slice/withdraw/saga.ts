import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import { apiGet, apiGetV2, apiPost, apiPostV2 } from 'utils/http/request';
import { withdrawActions as actions } from '.';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';

import { WithdrawRequest, WithdrawRequestGame, getRequestHistory } from './request';
import { TransferHistoryGameResponse, TransferHistoryResponse, withdrawUsdtResponse } from './response';
import { walletActions } from '../wallet';

export function* fetchWithdrawUsdt(action: PayloadAction<WithdrawRequest>) {
  try {
    const payload = action.payload;
    const url = `/ez/request/usercreatewithdraw`;

    const res: AxiosResponse<withdrawUsdtResponse> = yield call(apiPostV2, url, payload, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.resetCalledTransferHistory());
      yield put(walletActions.decreaseValueOfCoinId({ coinId: 1, exchange: payload.exchange }));
    }

    yield put(actions.resetLoadingWithdrawUsdt());
    yield put(actions.setResponseErrorWithdraw({ error: res.data.error, message: res.data.message }));
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export function* fetchEditWithdrawUsdt(action: PayloadAction<WithdrawRequest>) {
  try {
    const payload = action.payload;
    const url = `/ez/request/update`;

    const res: AxiosResponse<withdrawUsdtResponse> = yield call(apiPostV2, url, payload, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.resetCalledTransferHistory());
    }

    yield put(actions.resetLoadingWithdrawUsdt());
    yield put(actions.setResponseErrorWithdraw({ error: res.data.error, message: res.data.message }));
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export function* fetchGetRequestHistory(action: PayloadAction<getRequestHistory>) {
  try {
    const payload = action.payload;
    let url = `/ez/request/getbyservice?page=${payload.page ? payload.page : 1}&service=${payload.service}`;
    if (payload.beginTime !== 0) url = `${url}&begin_time=${payload.beginTime}`;
    if (payload.endTime !== 0) url = `${url}&end_time=${payload.endTime}`;

    const res: AxiosResponse<TransferHistoryResponse> = yield call(apiGetV2, url, null);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseFilterTransferHistory({ response: res.data, page: payload.page }));
      yield put(actions.setCalledTransferHistory());
    }
    yield put(actions.resetLoadingTransferHistoryWithdraw());
  } catch (error) {
    console.log(error);
    yield put(actions.resetLoadingTransferHistoryWithdraw());
    throw new Error(error);
  }
}

export function* fetchRefreshHistory(action: PayloadAction<getRequestHistory>) {
  try {
    const payload = action.payload;
    let url = `/ez/request/getbyservice?page=${payload.page ? payload.page : 1}&service=${payload.service}`;
    if (payload.beginTime !== 0) url = `${url}&begin_time=${payload.beginTime}`;
    if (payload.endTime !== 0) url = `${url}&end_time=${payload.endTime}`;

    const res: AxiosResponse<TransferHistoryResponse> = yield call(apiGetV2, url, null);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseRefreshFilterTransferHistory(res.data));
    }
    yield put(actions.resetLoadingTransferHistoryWithdraw());
  } catch (error) {
    console.log(error);
    yield put(actions.resetLoadingTransferHistoryWithdraw());
    throw new Error(error);
  }
}

// with game
export function* fetchWithdrawToGame(action: PayloadAction<WithdrawRequestGame>) {
  try {
    const payload = action.payload;
    const url = `/ez/request/withdrawtogame`;

    const res: AxiosResponse<withdrawUsdtResponse> = yield call(apiPostV2, url, payload, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.resetCalledTransferHistoryGame());
    }

    yield put(actions.resetLoadingWithdrawToGame());
    yield put(actions.setResponseErrorWithdraw({ error: res.data.error, message: res.data.message }));
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export function* fetchGetRequestHistoryGame(action: PayloadAction<getRequestHistory>) {
  try {
    const payload = action.payload;
    let url = `/ez/request/getbyservice?page=${payload.page ? payload.page : 1}&service=${payload.service}`;
    if (payload.beginTime !== 0) url = `${url}&begin_time=${payload.beginTime}`;
    if (payload.endTime !== 0) url = `${url}&end_time=${payload.endTime}`;
    if (payload.coin_id) url = `${url}&coin_id=${payload.coin_id}`;

    const res: AxiosResponse<TransferHistoryGameResponse> = yield call(apiGetV2, url, null);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseFilterTransferHistoryGame({ response: res.data, page: payload.page }));
      yield put(actions.setCalledTransferHistoryGame());
    }
    yield put(actions.resetLoadingTransferHistoryGameWithdraw());
  } catch (error) {
    console.log(error);
    yield put(actions.resetLoadingTransferHistoryGameWithdraw());
    throw new Error(error);
  }
}
export function* fetchRefreshHistoryGame(action: PayloadAction<getRequestHistory>) {
  try {
    const payload = action.payload;
    let url = `/ez/request/getbyservice?page=${payload.page ? payload.page : 1}&service=${payload.service}`;
    if (payload.beginTime !== 0) url = `${url}&begin_time=${payload.beginTime}`;
    if (payload.endTime !== 0) url = `${url}&end_time=${payload.endTime}`;
    if (payload.coin_id) url = `${url}&coin_id=${payload.coin_id}`;

    const res: AxiosResponse<TransferHistoryGameResponse> = yield call(apiGetV2, url, null);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseRefreshFilterTransferHistoryGame(res.data));
    }
    yield put(actions.resetLoadingTransferHistoryGameWithdraw());
  } catch (error) {
    console.log(error);
    yield put(actions.resetLoadingTransferHistoryGameWithdraw());
    throw new Error(error);
  }
}

export function* withdrawSaga() {
  // recharge usdt
  yield takeLatest(actions.requestWithdrawUsdt.type, fetchWithdrawUsdt);
  // edit recharge usdt
  yield takeLatest(actions.requestEditWithdrawUsdt.type, fetchEditWithdrawUsdt);
  // get list history
  yield takeLatest(actions.requestGetRequestHistoryWithdraw.type, fetchGetRequestHistory);
  // refresh list history
  yield takeLatest(actions.requestRefreshHistoryWithdraw.type, fetchRefreshHistory);

  // withdraw to game
  yield takeLatest(actions.requestCreateCoinToGameWithdraw.type, fetchWithdrawToGame);
  // get list history game
  yield takeLatest(actions.requestGetRequestHistoryGameWithdraw.type, fetchGetRequestHistoryGame);
  // refresh list history
  yield takeLatest(actions.requestRefreshHistoryGameWithdraw.type, fetchRefreshHistoryGame);
}
