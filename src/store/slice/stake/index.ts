import { useEffect } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { Stake, IListStake, TBoughtStakeIteam } from './types';
import { stakeSaga } from './saga';

import { TradingStakeRequest } from './request';
import { StakingBookResponse } from './response';

export const initialState: Stake = {
  stakes: [],
  calledStakes: [],

  stakingBook: [],
  calledStakingBook: false,
  totalUsdtClose: 0,
  totalUsdtOpen: 0,

  // statke management
  boughtStakes: [],
  calledBoughtStakes: [],

  response: {
    loading: false,
    loadingGetStakes: false,
    loadingTradingStake: false,
    loadingStakingBook: false,
    loadingBoughtStakes: false,

    error: -1,
    message: '',

    messageTradingStake: '',
    errorTradingStake: -1,
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
    resetLoadingTradingStake(state: Stake) {
      state.response.loadingTradingStake = false;
    },
    resetLoadingStakingBook(state: Stake) {
      state.response.loadingStakingBook = false;
    },
    resetLoadingBoughtStakes(state: Stake) {
      state.response.loadingBoughtStakes = false;
    },
    resetResponse(state: Stake) {
      state.response = {
        loading: false,
        loadingGetStakes: false,
        loadingTradingStake: false,
        loadingStakingBook: false,
        loadingBoughtStakes: false,

        error: -1,
        message: '',
        errorTradingStake: -1,
        messageTradingStake: '',
      };
    },
    resetResponseTradingStake(state: Stake) {
      state.response.errorTradingStake = -1;
      state.response.messageTradingStake = '';
    },
    resetCalledStakingBook(state: Stake) {
      state.calledStakingBook = false;
    },
    resetAllFieldOfStake(state: Stake) {
      state.stakes = [];
      state.calledStakes = [];
      state.stakingBook = [];
      state.calledStakingBook = false;
      state.totalUsdtClose = 0;
      state.totalUsdtOpen = 0;
      state.boughtStakes = [];
      state.calledBoughtStakes = [];
      state.response = {
        loading: false,
        loadingGetStakes: false,
        loadingTradingStake: false,
        loadingStakingBook: false,
        loadingBoughtStakes: false,

        error: -1,
        message: '',

        messageTradingStake: '',
        errorTradingStake: -1,
      };
    },
    // set
    setResponseErrorTradingStake(state: Stake, action: PayloadAction<{ error: number; message: string }>) {
      state.response.errorTradingStake = action.payload.error;
      state.response.messageTradingStake = action.payload.message;
    },

    // get alll stakes
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

    // trading stake
    requestTradingStake(state: Stake, action: PayloadAction<TradingStakeRequest>) {
      state.response.loadingTradingStake = true;
    },

    // get staking book
    setCalledStakingBook(state: Stake) {
      state.calledStakingBook = true;
    },
    requestGetStakingBook(state: Stake) {
      state.response.loadingStakingBook = true;
    },
    responseGetStakingBook(state: Stake, action: PayloadAction<StakingBookResponse>) {
      const stakingBooks = action.payload.data.data;
      const stakeUsdtClose = action.payload.data.usdt_stake_close;
      const stakeUsdtOpen = action.payload.data.usdt_stake_open;

      state.totalUsdtClose = stakeUsdtClose;
      state.totalUsdtOpen = stakeUsdtOpen;
      state.stakingBook = stakingBooks;
    },

    // give stake infor
    requestSimpleBoughtStake(state: Stake, action: PayloadAction<{ stakingId: number }>) {
      state.response.loadingBoughtStakes = true;
    },
    addStakingIdToCalledBoughtStakes(state: Stake, action: PayloadAction<{ stakingId: number }>) {
      const stakingId = action.payload.stakingId;

      state.calledBoughtStakes.push(stakingId);
    },
    responseUpdateBoughtStakes(state: Stake, action: PayloadAction<TBoughtStakeIteam>) {
      const payload = { ...action.payload };

      for (let [index, oldState] of state.boughtStakes.entries()) {
        if (oldState.stakingId === payload.stakingId) {
          state.boughtStakes[index] = payload;
          return;
        }
      }

      state.boughtStakes.unshift(payload);
    },
  },
});

export const { actions: stakeActions, reducer } = slice;

export const stakeReducer = reducer;
