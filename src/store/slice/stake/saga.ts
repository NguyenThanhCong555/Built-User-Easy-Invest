import { INITIAL_VALUE, RESPONSE_DEFAULT_ERROR, RESPONSE_SUCCESS_ERROR, RESPONSE_SYSTEM_ERROR } from 'constants/common';
import { apiGet, apiGetV2, apiPost, apiPostV2 } from '../../../utils/http/request';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { IListStake, TBoughtStakeItem } from './types';
import { stakeActions as actions } from '.';

import { AxiosResponse } from 'axios';
import {
  BoughtStakeInforResponse,
  FilterStakingResponse,
  ListStakeResponse,
  RESPONSE_ERROR_NOT_ENOUGH_USDT,
  StakingBookResponse,
  TotalUsdtStakeResponse,
  TradingStakeResponse,
} from './response';
import { TradingStakeCoinRequest, TradingStakeRequest, filterStakingBookRequest } from './request';
import { selectAuth } from '../auth/selectors';
import { BaseResponse } from 'utils/http/response';
import { systemActions } from '../system';

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
      yield put(actions.resetLoadingGetStakes());
    } else if (res.data.error === RESPONSE_SYSTEM_ERROR) {
      console.log('system error');
      // yield put(actions.resetLoadingGetStakes());
      throw new Error();
    }
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingGetStakes());
    }
    console.log(error);
    throw new Error(error);
  }
}

export function* FetchGetAllStakeCoinOfProject(action: PayloadAction<{ projectId: number }>) {
  try {
    const projectId = action.payload.projectId;
    const url = `/ez/stake/coin/getcointemplatelist?project_id=${projectId}`;

    const res: AxiosResponse<ListStakeResponse> = yield call(apiGetV2, url, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR && res.data.data) {
      const stake: IListStake = {
        project_id: projectId,
        listStake: res.data.data.stake_template,
      };

      yield put(actions.responseUpdateStakesCoin(stake));
      yield put(actions.updateCalledStakesCoin({ projectId }));
    }
    yield put(actions.resetLoadingGetStakesCoin());
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingGetStakes());
    }
    console.log(error);
    throw new Error(error);
  }
}

// trading
export function* FetchTradingStakeOfProject(action: PayloadAction<TradingStakeRequest>) {
  try {
    const url = `/ez/stake/buystake`;
    const body = action.payload;

    const res: AxiosResponse<TradingStakeResponse> = yield call(apiPostV2, url, body, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.setResponseErrorTradingStake({ error: res.data.error, message: res.data.message }));
      yield put(actions.resetCalledStakingBook());
      yield put(actions.resetTotalPage());
      yield put(actions.resetTotalPageLocal());
      yield put(actions.resetBookingStake());
    } else if (res.data.error === RESPONSE_ERROR_NOT_ENOUGH_USDT) {
      yield put(actions.setResponseErrorTradingStake({ error: res.data.error, message: res.data.message }));
    } else {
      yield put(systemActions.setSystemError());
    }
    yield put(actions.resetLoadingTradingStake());
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingTradingStake());
    }
    console.log(error);
  }
}

export function* FetchTradingStakeCoinOfProject(action: PayloadAction<TradingStakeCoinRequest>) {
  try {
    const url = `/ez/stake/coin/buystake`;
    const body = action.payload;

    const res: AxiosResponse<TradingStakeResponse> = yield call(apiPostV2, url, body, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.resetCalledStakingBookCoin());
      yield put(actions.resetTotalPageCoin());
      yield put(actions.resetTotalPageLocalCoin());
      yield put(actions.resetBookingStakeCoin());
    }
    yield put(actions.setResponseErrorTradingStakeCoin({ error: res.data.error }));
    yield put(actions.resetLoadingTradingStake());
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingTradingStake());
    }
    console.log(error);
  }
}

export function* FetchFilterStaking(action: PayloadAction<filterStakingBookRequest>) {
  try {
    const payload = action.payload;
    let url = `/ez/stake/filterstaking?page=${payload.page ? payload.page : 1}`;
    if (payload.beginTime !== 0) url = `${url}&begin_time=${payload.beginTime}`;
    if (payload.endTime !== 0) url = `${url}&end_time=${payload.endTime}`;
    if (payload.coinId !== RESPONSE_DEFAULT_ERROR) url = `${url}&coin_id=${payload.coinId}`;
    if (payload.status !== RESPONSE_DEFAULT_ERROR) url = `${url}&status=${payload.status}`;

    const res: AxiosResponse<FilterStakingResponse> = yield call(apiGetV2, url, null);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseFilterStakingBook(res.data));
      yield put(actions.setCalledStakingBook());
      yield put(actions.increaseTotalPageLocal());
    }

    yield put(actions.resetLoadingStakingBook());
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingBoughtStakes());
    }
    console.log(error);
  }
}

export function* FetchFilterStakingCoin(action: PayloadAction<filterStakingBookRequest>) {
  try {
    const payload = action.payload;
    let url = `/ez/stake/coin/filterstaking?page=${payload.page ? payload.page : 1}`;
    if (payload.beginTime !== 0) url = `${url}&begin_time=${payload.beginTime}`;
    if (payload.endTime !== 0) url = `${url}&end_time=${payload.endTime}`;
    if (payload.coinId !== RESPONSE_DEFAULT_ERROR) url = `${url}&coin_id=${payload.coinId}`;
    if (payload.status !== RESPONSE_DEFAULT_ERROR) url = `${url}&status=${payload.status}`;

    const res: AxiosResponse<FilterStakingResponse> = yield call(apiGetV2, url, null);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseFilterStakingBookCoin(res.data));
      yield put(actions.setCalledStakingBookCoin());
      yield put(actions.increaseTotalPageLocalCoin());
    }

    yield put(actions.resetLoadingStakingBookCoin());
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingBoughtStakesCoin());
    }
    console.log(error);
  }
}

export function* FetchRefreshFilterStaking(action: PayloadAction<filterStakingBookRequest>) {
  try {
    const payload = action.payload;
    let url = `/ez/stake/filterstaking?page=1`;
    if (payload.beginTime !== 0) url = `${url}&begin_time=${payload.beginTime}`;
    if (payload.endTime !== 0) url = `${url}&end_time=${payload.endTime}`;
    if (payload.coinId !== INITIAL_VALUE) url = `${url}&coin_id=${payload.coinId}`;
    if (payload.status !== INITIAL_VALUE) url = `${url}&status=${payload.status}`;

    const res: AxiosResponse<FilterStakingResponse> = yield call(apiGetV2, url, null);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseRefreshFilterStakingBook(res.data));
    }

    yield put(actions.resetLoadingStakingBook());
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingBoughtStakes());
    }
    console.log(error);
  }
}

export function* FetchRefreshFilterStakingCoin(action: PayloadAction<filterStakingBookRequest>) {
  try {
    const payload = action.payload;
    let url = `/ez/stake/coin/filterstaking?page=1`;
    if (payload.beginTime !== 0) url = `${url}&begin_time=${payload.beginTime}`;
    if (payload.endTime !== 0) url = `${url}&end_time=${payload.endTime}`;
    if (payload.coinId !== INITIAL_VALUE) url = `${url}&coin_id=${payload.coinId}`;
    if (payload.status !== INITIAL_VALUE) url = `${url}&status=${payload.status}`;

    const res: AxiosResponse<FilterStakingResponse> = yield call(apiGetV2, url, null);

    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseRefreshFilterStakingBookCoin(res.data));
    }

    yield put(actions.resetLoadingStakingBookCoin());
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingBoughtStakes());
    }
    console.log(error);
  }
}

// total usdt
export function* FetchTotalUsdtStake() {
  try {
    let url = '/ez/stake/getassets';

    const res: AxiosResponse<TotalUsdtStakeResponse> = yield call(apiGetV2, url, null);

    console.log(res);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseTotalUsdtStake({ totalUsdt: res.data.data.total_usdt_staking }));
      yield put(actions.setCalledTotalPage());
    }
  } catch (error) {
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
      yield put(actions.responseUpdateBoughtStakes(res.data.data));
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

export function* FetchInformationOntoBoughtStakeCoin(action: PayloadAction<{ stakingId: number }>) {
  try {
    const stakingId = action.payload.stakingId;
    const url = `/ez/stake/getstakinginfo?staking_id=${stakingId}`;

    const res: AxiosResponse<BoughtStakeInforResponse> = yield call(apiGetV2, url, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.responseUpdateBoughtStakesCoin(res.data.data));
      yield put(actions.addStakingIdToCalledBoughtStakesCoin({ stakingId }));
    }
    yield put(actions.resetLoadingBoughtStakesCoin());
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingBoughtStakesCoin());
    }
    console.log(error);
  }
}

export function* FetchWithdrawStake(action: PayloadAction<{ stakingId: number }>) {
  try {
    const stakingId = action.payload.stakingId;
    const url = `/ez/stake/getprofit`;

    const res: AxiosResponse<BaseResponse> = yield call(apiPostV2, url, { staking_id: stakingId }, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.updateFieldStateWithListStakeBook({ stakingId }));
      yield put(actions.setResponseErrorWithdrawStake({ error: res.data.error, message: res.data.message }));
      yield put(actions.removeStakingIdInBoughtStakes({ stakingId }));
      yield put(actions.updateFieldStateBoughtStake({ stakingId }));
    }
    yield put(actions.resetLoadingWithdrawStake());
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingWithdrawStake());
    }
    console.log(error);
  }
}

export function* FetchWithdrawStakeCoin(action: PayloadAction<{ stakingId: number }>) {
  try {
    const stakingId = action.payload.stakingId;
    const url = `/ez/stake/coin/getprofit`;

    const res: AxiosResponse<BaseResponse> = yield call(apiPostV2, url, { staking_id: stakingId }, null);

    console.log(res.data);
    if (res.data.error === RESPONSE_SUCCESS_ERROR) {
      yield put(actions.updateFieldStateWithListStakeBookCoin({ stakingId }));
      yield put(actions.setResponseErrorWithdrawStakeCoin({ error: res.data.error }));
      yield put(actions.removeStakingIdInBoughtStakesCoin({ stakingId }));
      yield put(actions.updateFieldStateBoughtStakeCoin({ stakingId }));
    }
    yield put(actions.resetLoadingWithdrawStakeCoin());
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingWithdrawStakeCoin());
    }
    console.log(error);
  }
}

export function* stakeSaga() {
  //get stake detail
  yield takeLatest(actions.requestGetAllStakeOfProject.type, FetchGetAllStakeOfProject);
  //get stake coin detail
  yield takeLatest(actions.requestGetAllStakeCoinOfProject.type, FetchGetAllStakeCoinOfProject);
  //trading stake
  yield takeLatest(actions.requestTradingStake.type, FetchTradingStakeOfProject);
  //trading stake coin
  yield takeLatest(actions.requestTradingStakeCoin.type, FetchTradingStakeCoinOfProject);
  // filter staking book
  yield takeLatest(actions.requestFilterStakingBook.type, FetchFilterStaking);
  yield takeLatest(actions.requestFilterStakingBookCoin.type, FetchFilterStakingCoin);
  // filter staking book
  yield takeLatest(actions.requestReFreshFilterStakingBook.type, FetchRefreshFilterStaking);
  yield takeLatest(actions.requestReFreshFilterStakingBookCoin.type, FetchRefreshFilterStakingCoin);
  // get total usdt stake
  yield takeLatest(actions.requestTotalUSDTStake.type, FetchTotalUsdtStake);

  // bought stake
  yield takeLatest(actions.requestSimpleBoughtStake.type, FetchInformationOntoBoughtStake);
  yield takeLatest(actions.requestSimpleBoughtStakeCoin.type, FetchInformationOntoBoughtStakeCoin);
  // withdraw stake
  yield takeLatest(actions.requestWithdrawStake.type, FetchWithdrawStake);
  yield takeLatest(actions.requestWithdrawStakeCoin.type, FetchWithdrawStakeCoin);
}
