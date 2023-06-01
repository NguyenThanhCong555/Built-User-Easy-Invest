import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import { apiGet, apiGetV2, apiPost, apiPostV2 } from 'utils/http/request';
import { rechargeActions as actions } from '.';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';

import { selectAuth } from '../auth/selectors';
import { EditRechargeRequest, RechargeRequest, getRequestHistory } from './request';
import { TransferHistoryResponse, limitRechargeResponse, listBankResponse, rechargeUsdtResponse } from './response';

export function* fetchRechargeUsdt(action: PayloadAction<RechargeRequest>) {
  try {
    const payload = action.payload;
    const url = `/ez/request/usercreatedeposit`;

    const res: AxiosResponse<rechargeUsdtResponse> = yield call(apiPostV2, url, payload, null);

    console.log(res.data);
    if (res.data) {
      yield put(actions.setResponseErrorRecharge({ error: res.data.error, message: res.data.message }));
      yield put(actions.resetLoadingRechargeUsdt());
      yield put(actions.resetCalledTransferHistory());
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export function* fetchEditRechargeUsdt(action: PayloadAction<EditRechargeRequest>) {
  try {
    const payload = action.payload;
    const url = `/ez/request/update`;

    const res: AxiosResponse<rechargeUsdtResponse> = yield call(apiPostV2, url, payload, null);

    console.log(res.data);
    if (res.data) {
      yield put(actions.setResponseErrorRecharge({ error: res.data.error, message: res.data.message }));
      yield put(actions.resetLoadingRechargeUsdt());
      // yield put(actions.responseUpdateCommandWhenEditRecharge(payload));
      yield put(actions.resetCalledTransferHistory());
      yield put(actions.resetCalledTransferHistoryDetail());
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export function* fetchLimitRecharge() {
  try {
    const url = `/ez/request/gettimes`;

    const res: AxiosResponse<limitRechargeResponse> = yield call(apiGetV2, url, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.setLimitRequestRecharge({ times: res.data.data.times }));
    }
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

    console.log(res.data.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseFilterTransferHistory({ response: res.data, page: payload.page }));
      yield put(actions.setCalledTransferHistory());
    }
    yield put(actions.resetLoadingTransferHistoryRecharge());
  } catch (error) {
    console.log(error);
    yield put(actions.resetLoadingTransferHistoryRecharge());
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

    console.log(res.data.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseRefreshFilterTransferHistory(res.data));
      // update local page by 2
      yield put(actions.setTotalPageLocalOfHistory({ numberPage: 2 }));
    }
    yield put(actions.resetLoadingTransferHistoryRecharge());
  } catch (error) {
    console.log(error);
    yield put(actions.resetLoadingTransferHistoryRecharge());
    throw new Error(error);
  }
}

export function* fetchGetListBank() {
  const TYPE_BANK = 1;

  const url = `ez/banking/getallpublic?type=${TYPE_BANK}`;

  const res: AxiosResponse<listBankResponse> = yield call(apiGetV2, url, null);

  console.log(res);
  if (res.data.error === RESPONSE_SUCCESS_ERROR) {
    yield put(actions.responseUpdateListBank(res.data.data.banking_accounts));
    yield put(actions.setCalledListBank());
  }
}

export function* fetchGetListBankBinance() {
  const TYPE_BANK_BINANCE = 0;

  const url = `ez/banking/getallpublic?type=${TYPE_BANK_BINANCE}`;

  const res: AxiosResponse<listBankResponse> = yield call(apiGetV2, url, null);

  console.log(res);
  if (res.data.error === RESPONSE_SUCCESS_ERROR) {
    yield put(actions.responseUpdateListBankBinance(res.data.data.banking_accounts));
    yield put(actions.setCalledListBankBinance());
  }
}

export function* fetchRequestInfo(action: PayloadAction<any>) {
  try {
    const url = `ez/request/getinfo?request_id=${action.payload.request_id}`;
    const res = yield call(apiGetV2, url, null);
    console.log('saga', res);

    if (res.data.error === 0 && res.data.data) {
      yield put(actions.responseGetInfoRequest({ ...res.data.data, id: action.payload.request_id }));
      yield put(actions.addNumberToCalledTransferDetail({ request_id: action.payload.request_id }));
      yield put(actions.resetLoadingTransferDetail());
    } else {
      yield put(actions.resetLoadingTransferDetail());
    }
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingTransferDetail());
    }
  }
}

export function* rechargeSaga() {
  // recharge usdt
  yield takeLatest(actions.requestRechargeUsdt.type, fetchRechargeUsdt);
  // edit recharge usdt
  yield takeLatest(actions.requestEditRechargeUsdt.type, fetchEditRechargeUsdt);

  // get limit recharge
  yield takeLatest(actions.requestLimitRecharge.type, fetchLimitRecharge);
  // get list history
  yield takeLatest(actions.requestGetRequestHistoryRecharge.type, fetchGetRequestHistory);
  // refresh list history
  yield takeLatest(actions.requestRefreshHistoryRecharge.type, fetchRefreshHistory);

  // get list banking
  yield takeLatest(actions.requestGetListBank.type, fetchGetListBank);
  yield takeLatest(actions.requestGetListBankBinance.type, fetchGetListBankBinance);
  // Get info
  yield takeLatest(actions.requestGetInfoRequest.type, fetchRequestInfo);
}
