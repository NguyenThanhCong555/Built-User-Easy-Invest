import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { WalletState } from './type';

export const initialState: WalletState = {
  data: [],
  coin: {
    userId: -1,
    coin_id: -1,
    coin_name: '',
    balance: 0,
  },

  transactions: [],
  dataTransactionDetail: {},

  totalPage: 0,

  response: {
    loading: false,
    error: -1,
    message: '',
  },
};

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // Get Wallet Transactions By Coin
    requestGetWalletTransactions(state: WalletState, action: PayloadAction<any>) {
      state.response.loading = true;
    },

    responseGetWalletTransactions(state: WalletState, action: PayloadAction<any>) {
      state.response.loading = false;
      state.response.error = action.payload.error;
      state.response.message = action.payload.message;

      if (action.payload.data) {
        state.totalPage = action.payload.data.total_page;
        state.transactions = action.payload.data.transactions;
      } else {
        state.totalPage = 0;
        state.transactions = [];
      }
    },

    // Get Coin info include (coin_name, balance, userId, coin_id)
    requestGetTotalCoin(state: WalletState, action: PayloadAction<{ coinId: string }>) {
      state.response.loading = true;
    },

    responseGetTotalCoin(state: WalletState, action: PayloadAction<any>) {
      state.response.loading = false;
      state.response.error = action.payload.error;
      state.response.message = action.payload.message;

      if (action.payload.data) {
        state.coin = action.payload.data;
      } else {
        state.coin = {
          userId: -1,
          coin_id: -1,
          coin_name: '',
          balance: 0,
        };
      }
    },
    // Reset
    resetResponse(state: WalletState) {
      state.response = {
        loading: false,
        error: -1,
        message: '',
      };
    },
    resetAllFieldOfWallet(state: WalletState) {
      state.data = [];
      state.coin = {
        userId: -1,
        coin_id: -1,
        coin_name: '',
        balance: 0,
      };

      state.transactions = [];
      state.dataTransactionDetail = {};

      state.totalPage = 0;

      state.response = {
        loading: false,
        error: -1,
        message: '',
      };
    },
  },
});

const { actions, reducer } = slice;
export const walletActions = actions;
export const walletReducer = reducer;
