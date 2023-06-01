import { createSlice } from 'utils/@reduxjs/toolkit';
import { TransactionState } from './type';
import { PayloadAction } from '@reduxjs/toolkit';

export const initialState: TransactionState = {
  transfer: {
    user: {},
    locked: true,
  },

  response: {
    error: -1,
    message: '',
    loading: false,
  },
  responseUser: {
    error: -1,
    message: '',
    loading: false,
  },
  responseOTP: {
    error: -1,
    message: '',
    loading: false,
  },
};

const slice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    requestGetUserInformation(state: TransactionState, action: PayloadAction<any>) {
      state.responseUser.loading = true;
    },

    responseGetUserInformation(state: TransactionState, action: PayloadAction<any>) {
      state.responseUser.loading = false;
      state.responseUser.message = action.payload.message;
      state.responseUser.error = action.payload.error;

      // Check if data
      if (action.payload.data) {
        state.transfer.user = action.payload.data;
        state.transfer.locked = false;
      }
    },

    requestSetLocked(state: TransactionState) {
      state.transfer.locked = true;
    },

    requestGetOTP(state: TransactionState, action: PayloadAction<any>) {
      state.responseOTP.loading = true;
    },

    responseGetOTP(state: TransactionState, action: PayloadAction<any>) {
      state.responseOTP.loading = false;
      state.responseOTP.message = action.payload.message;
      state.responseOTP.error = action.payload.error;
    },

    requestTransferCoinByPhone(state: TransactionState, action: PayloadAction<any>) {
      state.response.loading = true;
    },

    responseTransferCoinByPhone(state: TransactionState, action: PayloadAction<any>) {
      state.response.loading = false;
      state.response.message = action.payload.message;
      state.response.error = action.payload.error;
    },

    // Reset
    resetDataUser(state: TransactionState) {
      state.transfer = {
        user: {},
        locked: true,
      };
    },

    resetResponse(state: TransactionState) {
      state.response = {
        error: -1,
        message: '',
        loading: false,
      };
    },

    resetResponseUser(state: TransactionState) {
      state.responseUser = {
        error: -1,
        message: '',
        loading: false,
      };
    },

    resetResponseOTP(state: TransactionState) {
      state.responseOTP = {
        error: -1,
        message: '',
        loading: false,
      };
    },

    resetAllFieldOfTransaction(state: TransactionState) {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = slice;
export const transactionActions = actions;
export const transactionReducer = reducer;
