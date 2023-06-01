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
    coin_avatar: '',
    rate_usdt_coin: 0,
    min_transfer: 0,
    purchase_fee: 0,
    selling_fee: 0,
  },

  transactions: [],
  transactionsHistoryUSDT: [],
  transactionsHistoryUSDTByCoin: [],
  calledTransaction: false,
  dataTransactionDetail: {},

  totalPage: 0,
  totalPageUSDT: 0,

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
    // BY CONG

    // User see all coins in wallet
    request_SeeAllCoinsInWallet(state: WalletState, action: PayloadAction<any>) {
      state.response.loading = true;
    },

    response_SeeAllCoinsInWallet(state: WalletState, action: PayloadAction<any>) {
      state.data = action.payload;
      state.response.loading = false;
    },

    request_ViewTransactionHistoryByCoin(state: WalletState, action: PayloadAction<any>) {
      state.response.loading = true;
    },

    response_ViewTransactionHistoryByCoin(state: WalletState, action: PayloadAction<any>) {
      state.response.loading = false;
      // data need push state
      state.transactionsHistoryUSDT = action.payload.data;
      if (action.payload.payload.page !== 1 || 0) {
        // const data = state.transactionsHistoryUSDT.concat(action.payload.data.transactions);
        const mainData = {
          total_page: action.payload.payload.page,
          transactions: action.payload.data.transactions,
        };

        const a = state.transactionsHistoryUSDT.concat();
      } else {
      }
    },

    response_ScrollTransactionHistoryByCoin(state: WalletState, action: PayloadAction<any>) {
      state.response.loading = false;

      state.transactionsHistoryUSDT = action.payload.transactions;
    },

    //Users viewed a trading history of the wallet

    requestUsersViewedATradingHistoryOfTheWallet(state: WalletState, action: PayloadAction<any>) {
      state.response.loading = true;
    },

    responseUsersViewedATradingHistoryOfTheWallet(state: WalletState, action: PayloadAction<any>) {
      state.response.loading = false;
      state.transactionsHistoryUSDTByCoin = action.payload.data;
    },

    // BY CONG

    // Get Transaction Detail
    requestGetTransactionDetail(state: WalletState, action: PayloadAction<any>) {
      state.response.loading = true;
    },

    responseGetTransactionDetail(state: WalletState, action: PayloadAction<any>) {
      state.response.loading = false;
      state.response.error = action.payload.error;
      state.response.message = action.payload.message;

      state.dataTransactionDetail = action.payload.data;
    },

    // Get Wallet Transactions By Coin
    requestGetWalletTransactions(state: WalletState, action: PayloadAction<any>) {
      state.response.loading = true;
    },

    responseGetWalletTransactions(state: WalletState, action: PayloadAction<any>) {
      state.response.loading = false;
      state.response.error = action.payload.error;
      state.response.message = action.payload.message;
      state.calledTransaction = true;

      if (action.payload.data) {
        if (action.payload.data.total_page) state.totalPage = action.payload.data.total_page;
        state.transactions = [...state.transactions, ...action.payload.data.transactions];
      } else {
        state.totalPage = 0;
        state.transactions = [];
      }
    },
    // Filter Transaction
    requestFilterTransactions(state: WalletState, action: PayloadAction<any>) {
      state.response.loading = true;
    },

    responseFilterTransactions(state: WalletState, action: PayloadAction<any>) {
      state.response.loading = false;
      state.response.error = action.payload.error;
      state.response.message = action.payload.message;
      state.calledTransaction = true;

      if (action.payload.data) {
        if (action.payload.data.total_page) {
          state.totalPage = action.payload.data.total_page;
        }
        state.transactions = [...state.transactions, ...action.payload.data.transactions];
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
      if (action.payload.data) {
        state.coin = action.payload.data;
      } else {
        state.coin = {
          userId: -1,
          coin_id: -1,
          coin_name: '',
          balance: 0,
          coin_avatar: '',
          rate_usdt_coin: 0,
          min_transfer: 0,
          purchase_fee: 0,
          selling_fee: 0,
        };
      }

      state.response.loading = false;
      state.response.error = action.payload.error;
      state.response.message = action.payload.message;
    },
    // Reset
    resetResponse(state: WalletState) {
      state.response = {
        loading: false,
        error: -1,
        message: '',
      };
    },

    resetDataTransactions(state: WalletState) {
      state.transactions = [];
    },

    resetTotalPage(state: WalletState) {
      state.totalPage = 0;
    },

    resetCalledTransaction(state: WalletState) {
      state.calledTransaction = false;
    },

    resetAllFieldOfWallet(state: WalletState) {
      return {
        ...initialState,
      };
    },

    // setAmountCoin
    decreaseValueOfCoinId(state: WalletState, action: PayloadAction<{ coinId: number; exchange: number }>) {
      const payload = action.payload;
      const indexCoin = state.data.map(coin => coin.coin_id).indexOf(payload.coinId);

      state.data[indexCoin] = { ...state.data[indexCoin], balance: state.data[indexCoin].balance - payload.exchange };
    },
  },
});

const { actions, reducer } = slice;
export const walletActions = actions;
export const walletReducer = reducer;
