import { useEffect } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { Stake, IListStake, TBoughtStakeItem, TStakeBought } from './types';
import { stakeSaga } from './saga';

import { filterStakingBookRequest, TradingStakeCoinRequest, TradingStakeRequest } from './request';
import { FilterStakingResponse, StakingBookResponse } from './response';
import { CLOSE, INITIAL_VALUE } from 'constants/common';

export const initialState: Stake = {
  stakes: [],
  calledStakes: [],

  stakesCoin: [],
  calledStakesCoin: [],

  stakingBook: [],
  calledStakingBook: false,
  totalPage: INITIAL_VALUE,
  totalPageLocal: 1, // 1: initial one page

  stakingBookCoin: [],
  calledStakingBookCoin: false,
  totalPageCoin: INITIAL_VALUE,
  totalPageLocalCoin: 1, // 1: initial one page

  totalUsdt: 0,
  calledTotalUsdt: false,

  // statke management
  boughtStakes: [],
  calledBoughtStakes: [],

  boughtStakesCoin: [],
  calledBoughtStakesCoin: [],

  response: {
    loading: false,
    loadingGetStakes: false,

    loadingTradingStake: false,
    loadingStakingBook: false,

    loadingBoughtStakes: false,
    loadingWithdrawStake: false,

    //coin management
    loadingGetStakesCoin: false,
    loadingTradingStakeCoin: false,
    loadingStakingBookCoin: false,
    loadingBoughtStakesCoin: false,
    loadingWithdrawStakeCoin: false,

    error: INITIAL_VALUE,
    message: '',

    messageTradingStake: '',
    errorTradingStake: INITIAL_VALUE,
    errorTradingStakeCoin: INITIAL_VALUE,

    errorWithdrawStake: INITIAL_VALUE,
    messageWithdrawStake: '',
    errorWithdrawStakeCoin: INITIAL_VALUE,
  },
};

const slice = createSlice({
  name: 'stake',
  initialState,
  reducers: {
    // reset
    resetLoadingGetStakes(state: Stake) {
      state.response.loadingGetStakes = false;
    },
    resetLoadingGetStakesCoin(state: Stake) {
      state.response.loadingGetStakesCoin = false;
    },
    resetLoadingTradingStake(state: Stake) {
      state.response.loadingTradingStake = false;
    },
    resetLoadingStakingBook(state: Stake) {
      state.response.loadingStakingBook = false;
    },
    resetLoadingBoughtStakes(state: Stake) {
      state.response.loadingBoughtStakes = false;
    },
    resetLoadingWithdrawStake(state: Stake) {
      state.response.loadingWithdrawStake = false;
    },
    resetTotalPage(state: Stake) {
      state.totalPage = INITIAL_VALUE;
    },
    resetTotalPageLocal(state: Stake) {
      state.totalPageLocal = 1;
    },
    resetBookingStake(state: Stake) {
      state.stakingBook = [];
    },
    resetLoadingStakingBookCoin(state: Stake) {
      state.response.loadingStakingBookCoin = false;
    },
    resetLoadingBoughtStakesCoin(state: Stake) {
      state.response.loadingBoughtStakesCoin = false;
    },
    resetLoadingWithdrawStakeCoin(state: Stake) {
      state.response.loadingWithdrawStakeCoin = false;
    },
    resetTotalPageCoin(state: Stake) {
      state.totalPageCoin = INITIAL_VALUE;
    },
    resetTotalPageLocalCoin(state: Stake) {
      state.totalPageLocalCoin = 1;
    },
    resetBookingStakeCoin(state: Stake) {
      state.stakingBookCoin = [];
    },
    resetResponse(state: Stake) {
      state.response = initialState.response;
    },
    resetResponseTradingStake(state: Stake) {
      state.response.errorTradingStake = -INITIAL_VALUE;
      state.response.messageTradingStake = '';
    },
    resetResponseTradingStakeCoin(state: Stake) {
      state.response.errorTradingStakeCoin = -INITIAL_VALUE;
    },
    resetResponseWithdrawStake(state: Stake) {
      state.response.errorWithdrawStake = -INITIAL_VALUE;
      state.response.messageWithdrawStake = '';
    },
    resetCalledStakingBook(state: Stake) {
      state.calledStakingBook = false;
    },
    resetResponseWithdrawStakeCoin(state: Stake) {
      state.response.errorWithdrawStakeCoin = -INITIAL_VALUE;
    },
    resetCalledStakingBookCoin(state: Stake) {
      state.calledStakingBookCoin = false;
    },
    resetAllFieldOfStake(state: Stake) {
      return { ...initialState };
    },
    // set
    setResponseErrorTradingStake(state: Stake, action: PayloadAction<{ error: number; message: string }>) {
      state.response.errorTradingStake = action.payload.error;
      state.response.messageTradingStake = action.payload.message;
    },
    setResponseErrorTradingStakeCoin(state: Stake, action: PayloadAction<{ error: number }>) {
      state.response.errorTradingStakeCoin = action.payload.error;
    },
    setResponseErrorWithdrawStake(state: Stake, action: PayloadAction<{ error: number; message: string }>) {
      state.response.errorWithdrawStake = action.payload.error;
      state.response.messageWithdrawStake = action.payload.message;
    },
    setResponseErrorWithdrawStakeCoin(state: Stake, action: PayloadAction<{ error: number }>) {
      state.response.errorWithdrawStakeCoin = action.payload.error;
    },

    // get all stakes
    requestGetAllStakeOfProject(state: Stake, action: PayloadAction<{ projectId: number }>) {
      state.response.loadingGetStakes = true;
    },
    responseUpdateStakes(state: Stake, action: PayloadAction<IListStake>) {
      const payload = { ...action.payload };

      for (let [index, oldState] of state.stakes.entries()) {
        if (oldState.project_id === payload.project_id) {
          state.stakes[index] = payload;
          return;
        }
      }

      state.stakes.unshift(payload);
    },
    updateCalledStakes(state: Stake, action: PayloadAction<{ projectId: number }>) {
      const projectId = action.payload.projectId;

      state.calledStakes.unshift(projectId);
    },

    // get all stakes coin
    requestGetAllStakeCoinOfProject(state: Stake, action: PayloadAction<{ projectId: number }>) {
      state.response.loadingGetStakesCoin = true;
    },
    responseUpdateStakesCoin(state: Stake, action: PayloadAction<IListStake>) {
      const payload = { ...action.payload };

      for (let [index, oldState] of state.stakesCoin.entries()) {
        if (oldState.project_id === payload.project_id) {
          state.stakesCoin[index] = payload;
          return;
        }
      }

      state.stakesCoin.unshift(payload);
    },
    updateCalledStakesCoin(state: Stake, action: PayloadAction<{ projectId: number }>) {
      const projectId = action.payload.projectId;

      state.calledStakesCoin.unshift(projectId);
    },

    // trading stake
    requestTradingStake(state: Stake, action: PayloadAction<TradingStakeRequest>) {
      state.response.loadingTradingStake = true;
    },
    // trading stake coin
    requestTradingStakeCoin(state: Stake, action: PayloadAction<TradingStakeCoinRequest>) {
      state.response.loadingTradingStake = true;
    },

    // get staking book
    setCalledStakingBook(state: Stake) {
      state.calledStakingBook = true;
    },
    requestGetStakingBook(state: Stake) {
      state.response.loadingStakingBook = true;
    },
    // get staking book coin
    setCalledStakingBookCoin(state: Stake) {
      state.calledStakingBookCoin = true;
    },
    requestGetStakingBookCoin(state: Stake) {
      state.response.loadingStakingBookCoin = true;
    },

    // filter staking book
    setTotalPage(state: Stake, action: PayloadAction<{ totalPage: number }>) {
      state.totalPage = action.payload.totalPage;
    },
    increaseTotalPageLocal(state: Stake) {
      state.totalPageLocal += 1;
    },
    requestFilterStakingBook(state: Stake, action: PayloadAction<filterStakingBookRequest>) {
      state.response.loadingStakingBook = true;
    },
    requestReFreshFilterStakingBook(state: Stake, action: PayloadAction<filterStakingBookRequest>) {
      state.response.loadingStakingBook = true;
    },
    responseFilterStakingBook(state: Stake, action: PayloadAction<FilterStakingResponse>) {
      if (action.payload.data) {
        if (action.payload.data.total_page) state.totalPage = action.payload.data.total_page;
        state.stakingBook = [...state.stakingBook, ...action.payload.data.staking];
      } else {
        state.totalPage = 0;
        state.stakingBook = [];
      }
    },
    responseRefreshFilterStakingBook(state: Stake, action: PayloadAction<FilterStakingResponse>) {
      if (action.payload.data) {
        const payload = action.payload.data;
        if (payload.staking.length === 0) {
          state.totalPage = 0;
          state.totalPageLocal = 1;
          state.stakingBook = [];
          state.calledStakingBook = false;
          return;
        }

        if (payload.total_page) state.totalPage = payload.total_page;
        state.totalPageLocal = 2;
        state.stakingBook = [...payload.staking];
        state.calledStakingBook = true;
      } else {
        state.totalPage = 0;
        state.totalPageLocal = 1;
        state.stakingBook = [];
        state.calledStakingBook = false;
      }
    },

    // filter staking book coin
    setTotalPageCoin(state: Stake, action: PayloadAction<{ totalPage: number }>) {
      state.totalPageCoin = action.payload.totalPage;
    },
    increaseTotalPageLocalCoin(state: Stake) {
      state.totalPageLocalCoin += 1;
    },
    requestFilterStakingBookCoin(state: Stake, action: PayloadAction<filterStakingBookRequest>) {
      state.response.loadingStakingBookCoin = true;
    },
    requestReFreshFilterStakingBookCoin(state: Stake, action: PayloadAction<filterStakingBookRequest>) {
      state.response.loadingStakingBookCoin = true;
    },
    responseFilterStakingBookCoin(state: Stake, action: PayloadAction<FilterStakingResponse>) {
      if (action.payload.data) {
        if (action.payload.data.total_page) state.totalPageCoin = action.payload.data.total_page;
        state.stakingBookCoin = [...state.stakingBookCoin, ...action.payload.data.staking];
      } else {
        state.totalPageCoin = 0;
        state.stakingBookCoin = [];
      }
    },
    responseRefreshFilterStakingBookCoin(state: Stake, action: PayloadAction<FilterStakingResponse>) {
      if (action.payload.data) {
        const payload = action.payload.data;
        if (payload.staking.length === 0) {
          state.totalPageCoin = 0;
          state.totalPageLocalCoin = 1;
          state.stakingBookCoin = [];
          state.calledStakingBookCoin = false;
          return;
        }

        if (payload.total_page) state.totalPageCoin = payload.total_page;
        state.totalPageLocalCoin = 2;
        state.stakingBookCoin = [...payload.staking];
        state.calledStakingBookCoin = true;
      } else {
        state.totalPageCoin = 0;
        state.totalPageLocalCoin = 1;
        state.stakingBookCoin = [];
        state.calledStakingBookCoin = false;
      }
    },

    // get total usdt
    setCalledTotalPage(state: Stake) {
      state.calledTotalUsdt = true;
    },
    requestTotalUSDTStake(state: Stake) {},
    responseTotalUsdtStake(state: Stake, action: PayloadAction<{ totalUsdt: number }>) {
      state.totalUsdt = action.payload.totalUsdt;
    },

    // give stake infor
    requestSimpleBoughtStake(state: Stake, action: PayloadAction<{ stakingId: number }>) {
      state.response.loadingBoughtStakes = true;
    },
    addStakingIdToCalledBoughtStakes(state: Stake, action: PayloadAction<{ stakingId: number }>) {
      const stakingId = action.payload.stakingId;

      state.calledBoughtStakes.push(stakingId);
    },
    responseUpdateBoughtStakes(state: Stake, action: PayloadAction<TStakeBought>) {
      const payload = action.payload;

      for (let [index, oldState] of state.boughtStakes.entries()) {
        if (oldState.id === payload.id) {
          state.boughtStakes[index] = payload;
          return;
        }
      }

      state.boughtStakes.unshift(payload);
    },
    removeStakingIdInBoughtStakes(state: Stake, action: PayloadAction<{ stakingId: number }>) {
      const stakingId = action.payload.stakingId;

      let indexOfTarge = state.calledBoughtStakes.indexOf(stakingId);

      if (indexOfTarge === -1) {
        return;
      }
      state.calledBoughtStakes[indexOfTarge] = state.calledBoughtStakes[state.calledBoughtStakes.length - 1];
      state.calledBoughtStakes.pop();
    },

    // give stake infor coin
    requestSimpleBoughtStakeCoin(state: Stake, action: PayloadAction<{ stakingId: number }>) {
      state.response.loadingBoughtStakesCoin = true;
    },
    addStakingIdToCalledBoughtStakesCoin(state: Stake, action: PayloadAction<{ stakingId: number }>) {
      const stakingId = action.payload.stakingId;

      state.calledBoughtStakesCoin.push(stakingId);
    },
    responseUpdateBoughtStakesCoin(state: Stake, action: PayloadAction<TStakeBought>) {
      const payload = action.payload;

      for (let [index, oldState] of state.boughtStakesCoin.entries()) {
        if (oldState.id === payload.id) {
          state.boughtStakesCoin[index] = payload;
          return;
        }
      }

      state.boughtStakesCoin.unshift(payload);
    },
    removeStakingIdInBoughtStakesCoin(state: Stake, action: PayloadAction<{ stakingId: number }>) {
      const stakingId = action.payload.stakingId;

      let indexOfTarge = state.calledBoughtStakesCoin.indexOf(stakingId);

      if (indexOfTarge === -1) {
        return;
      }
      state.calledBoughtStakesCoin[indexOfTarge] = state.calledBoughtStakesCoin[state.calledBoughtStakesCoin.length - 1];
      state.calledBoughtStakesCoin.pop();
    },

    // withdraw stake
    requestWithdrawStake(state: Stake, action: PayloadAction<{ stakingId: number }>) {
      state.response.loadingWithdrawStake = true;
    },
    updateFieldStateWithListStakeBook(state: Stake, action: PayloadAction<{ stakingId: number }>) {
      const stakingId = action.payload.stakingId;
      for (let [index, stateBook] of state.stakingBook.entries()) {
        if (stateBook.id === stakingId) {
          state.stakingBook[index].status = CLOSE;
          return;
        }
      }
    },
    updateFieldStateBoughtStake(state: Stake, action: PayloadAction<{ stakingId: number }>) {
      const stakingId = action.payload.stakingId;

      for (let [index, boughtStake] of state.boughtStakes.entries()) {
        if (boughtStake.id === stakingId) {
          state.boughtStakes[index] = { ...state.boughtStakes[index], status: 1 };
        }
      }
    },
    // withdraw stake coin
    requestWithdrawStakeCoin(state: Stake, action: PayloadAction<{ stakingId: number }>) {
      state.response.loadingWithdrawStakeCoin = true;
    },
    updateFieldStateWithListStakeBookCoin(state: Stake, action: PayloadAction<{ stakingId: number }>) {
      const stakingId = action.payload.stakingId;
      for (let [index, stateBook] of state.stakingBookCoin.entries()) {
        if (stateBook.id === stakingId) {
          state.stakingBookCoin[index].status = CLOSE;
          return;
        }
      }
    },
    updateFieldStateBoughtStakeCoin(state: Stake, action: PayloadAction<{ stakingId: number }>) {
      const stakingId = action.payload.stakingId;

      for (let [index, boughtStake] of state.boughtStakesCoin.entries()) {
        if (boughtStake.id === stakingId) {
          state.boughtStakesCoin[index] = { ...state.boughtStakesCoin[index], status: 1 };
        }
      }
    },
  },
});

export const { actions: stakeActions, reducer } = slice;

export const stakeReducer = reducer;
