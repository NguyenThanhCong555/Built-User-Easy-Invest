import { useEffect } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { COMPLETE_STEP, Recharge, START_STEP, TBank, TransferDetail, TransferHistory } from './types';
import { INITIAL_VALUE } from 'constants/common';
import { EditRechargeRequest, getRequestHistory, RechargeRequest } from './request';
import { TransferHistoryResponse } from './response';

export const initialState: Recharge = {
  VNDPerUSDT: 23239,

  operationStep: START_STEP,
  addUsdt: '',
  chooseBankId: INITIAL_VALUE,
  limitRequestRecharge: -1,

  listBank: [],
  listBankBinance: [],
  calledListBank: false,
  calledListBankBinance: false,

  transferHistory: [],
  calledTransferHistory: false,
  totalPageOfHistory: INITIAL_VALUE,
  totalPageLocalOfHistory: 1, // 1: initial one page

  transferHistoryDetail: [],
  calledTransferHistoryDetail: [],

  response: {
    loadingRechargeUsdt: false,
    loadingTransferHistoryRecharge: false,
    loadingTransferDetail: false,

    error: INITIAL_VALUE,
    message: '',
  },
};

const slice = createSlice({
  name: 'recharge',
  initialState,
  reducers: {
    // reset
    resetOperationStep(state: Recharge) {
      state.operationStep = START_STEP;
    },
    resetAddUsdt(state: Recharge) {
      state.addUsdt = '';
    },
    resetChooseBankId(state: Recharge) {
      state.chooseBankId = INITIAL_VALUE;
    },
    resetLoadingRechargeUsdt(state: Recharge) {
      state.response.loadingRechargeUsdt = false;
    },
    resetLoadingTransferHistoryRecharge(state: Recharge) {
      state.response.loadingTransferHistoryRecharge = false;
    },
    resetResponseErrorRecharge(state: Recharge) {
      state.response.error = INITIAL_VALUE;
      state.response.message = '';
    },
    resetCalledTransferHistory(state: Recharge) {
      state.calledTransferHistory = false;
    },
    resetCalledTransferHistoryDetail(state: Recharge) {
      state.calledTransferHistoryDetail = [];
    },
    resetTotalPageHistory(state: Recharge) {
      state.totalPageOfHistory = INITIAL_VALUE;
    },
    resetTotalPageLocalHistory(state: Recharge) {
      state.totalPageLocalOfHistory = 1;
    },

    //set
    setLoadingRechargeUsdt(state: Recharge) {
      state.response.loadingRechargeUsdt = true;
    },
    setLoadingTransferHistoryRecharge(state: Recharge) {
      state.response.loadingTransferHistoryRecharge = true;
    },
    setResponseErrorRecharge(state: Recharge, action: PayloadAction<{ error: number; message: string }>) {
      state.response.error = action.payload.error;
      state.response.message = action.payload.message;
    },
    setTotalPageLocalOfHistory(state: Recharge, action: PayloadAction<{ numberPage: number }>) {
      state.totalPageLocalOfHistory = action.payload.numberPage;
    },

    // operation step
    setOperationStep(state: Recharge, action: PayloadAction<{ step: number }>) {
      state.operationStep = action.payload.step;
    },
    increaseOperationStep(state: Recharge) {
      if (state.operationStep === COMPLETE_STEP) return;
      state.operationStep = state.operationStep + 1;
    },
    decreaseOperationStep(state: Recharge) {
      if (state.operationStep === START_STEP) return;

      state.operationStep = state.operationStep - 1;
    },
    // want to add usdt
    setAddUsdt(state: Recharge, action: PayloadAction<{ usdt: string }>) {
      state.addUsdt = action.payload.usdt;
    },

    // choose bankId
    setChooseBankId(state: Recharge, action: PayloadAction<{ bankingId: number }>) {
      state.chooseBankId = action.payload.bankingId;
    },

    //recharge usdt
    requestRechargeUsdt(state: Recharge, action: PayloadAction<RechargeRequest>) {
      state.response.loadingRechargeUsdt = true;
    },

    // get limit request recharge
    requestLimitRecharge(state: Recharge) {},
    setLimitRequestRecharge(state: Recharge, action: PayloadAction<{ times: number }>) {
      state.limitRequestRecharge = action.payload.times;
    },

    //get request history recharge
    setCalledTransferHistory(state: Recharge) {
      state.calledTransferHistory = true;
    },
    increaseTotalPageLocalHistory(state: Recharge) {
      state.totalPageLocalOfHistory += 1;
    },
    requestGetRequestHistoryRecharge(state: Recharge, action: PayloadAction<getRequestHistory>) {
      state.response.loadingTransferHistoryRecharge = true;
    },
    requestRefreshHistoryRecharge(state: Recharge, action: PayloadAction<getRequestHistory>) {
      state.response.loadingTransferHistoryRecharge = true;
    },
    responseFilterTransferHistory(state: Recharge, action: PayloadAction<{ response: TransferHistoryResponse; page: number }>) {
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
    responseRefreshFilterTransferHistory(state: Recharge, action: PayloadAction<TransferHistoryResponse>) {
      if (action.payload.data && action.payload.data.requests) {
        const payload = action.payload.data;
        if (payload.requests.length === 0) {
          state.totalPageOfHistory = 0;
          state.totalPageLocalOfHistory = 1;
          state.transferHistory = [];
          state.calledTransferHistory = false;
          return;
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

    // edit recharge
    requestEditRechargeUsdt(state: Recharge, action: PayloadAction<EditRechargeRequest>) {},
    responseUpdateCommandWhenEditRecharge(state: Recharge, action: PayloadAction<EditRechargeRequest>) {
      const payload = action.payload;

      for (let [index, history] of state.transferHistory.entries()) {
        if (history.id === payload.id) {
          state.transferHistory[index] = {
            ...state.transferHistory[index],
            exchange: payload.exchange,
            content: payload.content,
            banking_account_id: payload.banking_account_id,
          };
        }
      }

      for (let [index, history] of state.transferHistoryDetail.entries()) {
        if (history.id === payload.id) {
          state.transferHistoryDetail[index] = {
            ...state.transferHistoryDetail[index],
            exchange: payload.exchange,
            content: payload.content,
            banking_account_id: payload.banking_account_id,
          };
        }
      }
    },

    // get list bank
    setCalledListBank(state: Recharge) {
      state.calledListBank = true;
    },
    setCalledListBankBinance(state: Recharge) {
      state.calledListBankBinance = true;
    },
    resetCalledListBank(state: Recharge) {
      state.calledListBank = false;
    },
    resetCalledListBankBinance(state: Recharge) {
      state.calledListBankBinance = false;
    },
    requestGetListBank(state: Recharge) {},
    requestGetListBankBinance(state: Recharge) {},
    responseUpdateListBank(state: Recharge, action: PayloadAction<TBank[]>) {
      state.listBank = action.payload;
    },
    responseUpdateListBankBinance(state: Recharge, action: PayloadAction<TBank[]>) {
      state.listBankBinance = action.payload;
    },

    // Get info request
    requestGetInfoRequest(state: Recharge, action: PayloadAction<any>) {
      state.response.loadingTransferDetail = true;
    },

    addNumberToCalledTransferDetail(state: Recharge, action: PayloadAction<{ request_id: number }>) {
      state.calledTransferHistoryDetail.push(action.payload.request_id);
    },

    resetLoadingTransferDetail(state: Recharge) {
      state.response.loadingTransferDetail = false;
    },

    responseGetInfoRequest(state: Recharge, action: PayloadAction<TransferDetail>) {
      for (let [index, oldDetail] of state.transferHistoryDetail.entries()) {
        if (oldDetail.id === action.payload.id) {
          state.transferHistoryDetail[index] = action.payload;
          return;
        }
      }

      state.transferHistoryDetail.push(action.payload);
    },

    // Reset all of field
    resetAllFieldRecharge(state: Recharge) {
      return {
        ...initialState,
      };
    },
  },
});

export const { actions: rechargeActions, reducer } = slice;

export const rechargeReducer = reducer;
