import { RESPONSE_SUCCESS_ERROR } from 'constants/common';
import { apiGet, apiGetV2, apiPost, apiPostV2 } from '../../../utils/http/request';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { IListStake, TBoughtStakeIteam } from './types';
import { stakeActions as actions } from '.';

import { AxiosResponse } from 'axios';
import {
  BoughtStakeInforResponse,
  ListStakeResponse,
  RESPONSE_ERROR_NOT_ENOUGH_USDT,
  StakingBookResponse,
  TradingStakeResponse,
} from './response';
import { TradingStakeRequest } from './request';
import { selectAuth } from '../auth/selectors';

export function* FetchGetAllStakeOfProject(action: PayloadAction<{ projectId: number }>) {
  try {
    const projectId = action.payload.projectId;
    const url = `/ez/stake/gettemplatelist?project_id=${projectId}`;

    const res: AxiosResponse<ListStakeResponse> = yield call(apiGetV2, url, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR && res.data.data) {
      const stake: IListStake = {
        project_id: projectId,
        listStake: res.data.data.stake_template,
      };

      yield put(actions.responseUpdateStakes(stake));
      yield put(actions.updateCalledStakes({ projectId }));
    }
    yield put(actions.resetLoadingGetStakes());
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingGetStakes());
    }
    console.log(error);
  }
}

export function* FetchTradingStakeOfProject(action: PayloadAction<TradingStakeRequest>) {
  try {
    const url = `/ez/stake/buystake`;
    const body = action.payload;

    const res: AxiosResponse<TradingStakeResponse> = yield call(apiPostV2, url, body, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.setResponseErrorTradingStake({ error: res.data.error, message: res.data.message }));
      yield put(actions.resetLoadingTradingStake());
      yield put(actions.resetCalledStakingBook());
    } else if (res.data.error === RESPONSE_ERROR_NOT_ENOUGH_USDT) {
      yield put(actions.setResponseErrorTradingStake({ error: res.data.error, message: res.data.message }));
      yield put(actions.resetLoadingTradingStake());
    }
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingTradingStake());
    }
    console.log(error);
  }
}

export function* FetchStakingBook() {
  try {
    const url = `/ez/stake/getassets`;

    const res: AxiosResponse<StakingBookResponse> = yield call(apiGetV2, url, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseGetStakingBook(res.data));
      yield put(actions.setCalledStakingBook());
    }

    yield put(actions.resetLoadingStakingBook());
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingTradingStake());
    }
    console.log(error);
  }
}

export function* FetchInformationOntoBoughtStake(action: PayloadAction<{ stakingId: number }>) {
  try {
    const stakingId = action.payload.stakingId;
    const url = `/ez/stake/getstakinginfo?staking_id=${stakingId}`;

    const res: AxiosResponse<BoughtStakeInforResponse> = yield call(apiGetV2, url, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      const stakeInfor: TBoughtStakeIteam = {
        stakingId: stakingId,
        stakeInfor: res.data.data,
      };

      yield put(actions.responseUpdateBoughtStakes(stakeInfor));
      yield put(actions.addStakingIdToCalledBoughtStakes({ stakingId }));
    }
    yield put(actions.resetLoadingBoughtStakes());
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingBoughtStakes());
    }
    console.log(error);
  }
}

export function* stakeSaga() {
  //get stake detail
  yield takeLatest(actions.requestGetAllStakeOfProject.type, FetchGetAllStakeOfProject);
  //trading stake
  yield takeLatest(actions.requestTradingStake.type, FetchTradingStakeOfProject);
  // staking book
  yield takeLatest(actions.requestGetStakingBook.type, FetchStakingBook);

  // bought stake
  yield takeLatest(actions.requestSimpleBoughtStake.type, FetchInformationOntoBoughtStake);
}
