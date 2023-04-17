import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import { apiGet, apiGetV2, apiPost } from 'utils/http/request';
import { coinActions as actions } from '.';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';
import { responseAllCoins } from './response';
import { selectAuth } from '../auth/selectors';

export function* FetchListCoins() {
  try {
    const url = `/ez/coin/getlist`;

    const res: AxiosResponse<responseAllCoins> = yield call(apiGetV2, url, null);

    console.log(res.data);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseWhenFetchListCoins(res.data.data.coins));
      yield put(actions.setCallListCoins());
      yield put(actions.resetLoading());
    } else yield put(actions.resetLoading());
  } catch (error) {
    console.log(error);
  }
}

export function* coinSaga() {
  //get project detail
  yield takeLatest(actions.requestGetListCoins.type, FetchListCoins);
}
