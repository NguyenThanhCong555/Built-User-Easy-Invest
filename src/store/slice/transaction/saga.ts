import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGetV2, apiPost, apiPostV2 } from 'utils/http/request';
import { transactionActions } from '.';

function* handleGetUserInformation(action: PayloadAction<any>) {
  try {
    const url = `/ez/user/finduser?phone_number=${action.payload.phone}`;
    const response = yield call(apiGetV2, url, null);

    yield put(transactionActions.responseGetUserInformation(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };
    yield put(transactionActions.responseGetUserInformation(response.data));
  }
}

function* handleGetOTP(action: PayloadAction<any>) {
  try {
    const url = `/ez/getotp`;
    const response = yield call(apiGetV2, url, { numberphone: action.payload.phone });

    yield put(transactionActions.responseGetOTP(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(transactionActions.responseGetOTP(response.data));
  }
}

function* handleTransferCoinByPhone(action: PayloadAction<any>) {
  try {
    const url = `/ez/wallet/transfer`;
    const payload = action.payload;

    const response = yield call(apiPostV2, url, payload, null);

    yield put(transactionActions.responseTransferCoinByPhone(response.data));
  } catch (error) {
    const response = {
      error: 1,
      message: 'system_error',
      data: null,
    };

    yield put(transactionActions.responseTransferCoinByPhone(response.data));
  }
}

export function* transactionSaga() {
  yield takeLatest(transactionActions.requestGetUserInformation.type, handleGetUserInformation);
  yield takeLatest(transactionActions.requestGetOTP.type, handleGetOTP);
  yield takeLatest(transactionActions.requestTransferCoinByPhone.type, handleTransferCoinByPhone);
}
