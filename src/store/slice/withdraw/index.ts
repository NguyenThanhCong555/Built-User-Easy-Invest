import { useEffect } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { COMPLETE_STEP, START_STEP, TBank, TransferHistory, Withdraw } from './types';
import { INITIAL_VALUE } from 'constants/common';
import { EditWithdrawRequest, getRequestHistory, WithdrawRequest, WithdrawRequestGame } from './request';
import { TransferHistoryGameResponse, TransferHistoryResponse } from './response';

// const dataBank: TBank = ;

export const initialState: Withdraw = {
  withdrawFee: 10,

  addUsdt: '',
  addBinanceId: '',

  addCoinToGame: '',
  addGameId: '',

  transferHistory: [],
  calledTransferHistory: false,
  totalPageOfHistory: INITIAL_VALUE,
  totalPageLocalOfHistory: 1, // 1: initial one page

  transferHistoryGame: [],
  calledTransferHistoryGame: false,
  totalPageOfHistoryGame: INITIAL_VALUE,
  totalPageLocalOfHistoryGame: 1, // 1: initial one page

  response: {
    loadingWithdrawUsdt: false,
    loadingWithdrawToGame: false,
    loadingTransferHistoryWithdraw: false,
    loadingTransferHistoryGameWithdraw: false,

    error: INITIAL_VALUE,
    message: '',
  },
};

const slice = createSlice({
  name: 'withdraw',
  initialState,
  reducers: {
    // reset
    resetAddUsdt(state: Withdraw) {
      state.addUsdt = '';
    },
    resetAddBinanceId(state: Withdraw) {
      state.addBinanceId = '';
    },
    resetAddCoinToGame(state: Withdraw) {
      state.addCoinToGame = '';
    },
    resetAddGameId(state: Withdraw) {
      state.addGameId = '';
    },
    resetLoadingWithdrawUsdt(state: Withdraw) {
      state.response.loadingWithdrawUsdt = false;
    },
    resetLoadingWithdrawToGame(state: Withdraw) {
      state.response.loadingWithdrawToGame = false;
    },
    resetLoadingTransferHistoryWithdraw(state: Withdraw) {
      state.response.loadingTransferHistoryWithdraw = false;
    },
    resetLoadingTransferHistoryGameWithdraw(state: Withdraw) {
      state.response.loadingTransferHistoryGameWithdraw = false;
    },
    resetResponseErrorWithdraw(state: Withdraw) {
      state.response.error = INITIAL_VALUE;
      state.response.message = '';
    },
    resetCalledTransferHistory(state: Withdraw) {
      state.calledTransferHistory = false;
    },
    resetCalledTransferHistoryGame(state: Withdraw) {
      state.calledTransferHistoryGame = false;
    },
    resetTotalPageHistory(state: Withdraw) {
      state.totalPageOfHistory = INITIAL_VALUE;
    },
    resetTotalPageLocalHistory(state: Withdraw) {
      state.totalPageLocalOfHistory = 1;
    },

    //set
    setLoadingRechargeUsdt(state: Withdraw) {
      state.response.loadingWithdrawUsdt = true;
    },
    setLoadingTransferHistoryWithdraw(state: Withdraw) {
      state.response.loadingTransferHistoryWithdraw = true;
    },
    setResponseErrorWithdraw(state: Withdraw, action: PayloadAction<{ error: number; message: string }>) {
      state.response.error = action.payload.error;
      state.response.message = action.payload.message;
    },

    // want to add usdt
    setAddUsdt(state: Withdraw, action: PayloadAction<{ usdt: string }>) {
      state.addUsdt = action.payload.usdt;
    },
    // want to add binance id
    setAddBinanceId(state: Withdraw, action: PayloadAction<{ binanceId: string }>) {
      state.addBinanceId = action.payload.binanceId;
    },
    // want to add coin to game
    setAddCoinToGame(state: Withdraw, action: PayloadAction<{ amount: string }>) {
      state.addCoinToGame = action.payload.amount;
    },
    // want to add game id
    setAddGameId(state: Withdraw, action: PayloadAction<{ gameId: string }>) {
      state.addGameId = action.payload.gameId;
    },

    //Withdraw usdt
    requestWithdrawUsdt(state: Withdraw, action: PayloadAction<WithdrawRequest>) {},
    //edit Withdraw usdt
    requestEditWithdrawUsdt(state: Withdraw, action: PayloadAction<WithdrawRequest>) {},
    //Withdraw usdt
    requestCreateCoinToGameWithdraw(state: Withdraw, action: PayloadAction<WithdrawRequestGame>) {},

    //get request history Withdraw
    setCalledTransferHistory(state: Withdraw) {
      state.calledTransferHistory = true;
    },
    increaseTotalPageLocalHistory(state: Withdraw) {
      state.totalPageLocalOfHistory += 1;
    },
    requestGetRequestHistoryWithdraw(state: Withdraw, action: PayloadAction<getRequestHistory>) {
      state.response.loadingTransferHistoryWithdraw = true;
    },
    requestRefreshHistoryWithdraw(state: Withdraw, action: PayloadAction<getRequestHistory>) {
      state.response.loadingTransferHistoryWithdraw = true;
    },
    responseFilterTransferHistory(state: Withdraw, action: PayloadAction<{ response: TransferHistoryResponse; page: number }>) {
      const payload = action.payload.response;
      //reset data
      if (!state.calledTransferHistory) state.transferHistory = [];
      if (action.payload.page === 1) {
        state.transferHistory = [];
        state.totalPageLocalOfHistory = 2;
      } else {
        state.totalPageLocalOfHistory += 1;
      }

      if (payload.data && payload.data.requests.length !== 0) {
        if (payload.data.total_page) state.totalPageOfHistory = payload.data.total_page;
        state.transferHistory = [...state.transferHistory, ...payload.data.requests];
      } else {
        state.totalPageOfHistory = 1;
        state.transferHistory = [];
      }
    },
    responseRefreshFilterTransferHistory(state: Withdraw, action: PayloadAction<TransferHistoryResponse>) {
      if (action.payload.data && action.payload.data.requests) {
        const payload = action.payload.data;
        if (payload.requests.length === 0) {
          state.totalPageOfHistory = 0;
          state.totalPageLocalOfHistory = 1;
          state.transferHistory = [];
          state.calledTransferHistory = false;
        }

        if (action.payload.data.total_page) state.totalPageOfHistory = action.payload.data.total_page;
        state.totalPageLocalOfHistory = 2;
        state.transferHistory = [...action.payload.data.requests];
        state.calledTransferHistory = true;
      } else {
        state.totalPageOfHistory = 0;
        state.totalPageLocalOfHistory = 1;
        state.transferHistory = [];
        state.calledTransferHistory = false;
      }
    },
    //get request history game Withdraw
    setCalledTransferHistoryGame(state: Withdraw) {
      state.calledTransferHistoryGame = true;
    },
    increaseTotalPageLocalHistoryGame(state: Withdraw) {
      state.totalPageLocalOfHistoryGame += 1;
    },
    requestGetRequestHistoryGameWithdraw(state: Withdraw, action: PayloadAction<getRequestHistory>) {
      state.response.loadingTransferHistoryWithdraw = true;
    },
    requestRefreshHistoryGameWithdraw(state: Withdraw, action: PayloadAction<getRequestHistory>) {
      state.response.loadingTransferHistoryGameWithdraw = true;
    },
    responseFilterTransferHistoryGame(
      state: Withdraw,
      action: PayloadAction<{ response: TransferHistoryGameResponse; page: number }>,
    ) {
      const payload = action.payload.response;
      //reset data
      if (!state.calledTransferHistoryGame) state.transferHistoryGame = [];
      if (action.payload.page === 1) {
        state.transferHistoryGame = [];
        state.totalPageLocalOfHistoryGame = 2;
      } else {
        state.totalPageLocalOfHistoryGame += 1;
      }

      if (payload.data && payload.data.requests.length !== 0) {
        if (payload.data.total_page) state.totalPageOfHistoryGame = payload.data.total_page;
        state.transferHistoryGame = [...state.transferHistoryGame, ...payload.data.requests];
      } else {
        state.totalPageOfHistoryGame = 1;
        state.transferHistoryGame = [];
      }
    },
    responseRefreshFilterTransferHistoryGame(state: Withdraw, action: PayloadAction<TransferHistoryGameResponse>) {
      if (action.payload.data && action.payload.data.requests) {
        const payload = action.payload.data;
        if (payload.requests.length === 0) {
          state.totalPageOfHistoryGame = 0;
          state.totalPageLocalOfHistoryGame = 1;
          state.transferHistoryGame = [];
          state.calledTransferHistoryGame = false;
        }

        if (action.payload.data.total_page) state.totalPageOfHistoryGame = action.payload.data.total_page;
        state.totalPageLocalOfHistoryGame = 2;
        state.transferHistoryGame = [...action.payload.data.requests];
        state.calledTransferHistoryGame = true;
      } else {
        state.totalPageOfHistoryGame = 0;
        state.totalPageLocalOfHistoryGame = 1;
        state.transferHistoryGame = [];
        state.calledTransferHistoryGame = false;
      }
    },
  },
});

export const { actions: withdrawActions, reducer } = slice;

export const withdrawReducer = reducer;
