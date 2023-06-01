import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { P2PState, RequestBuySellCoin } from './types';

export const initialState: P2PState = {
  response: {
    loading: false,
    error: -1,
    message: '',
  },
};

const slice = createSlice({
  name: 'p2p',
  initialState,
  reducers: {
    requestBuyCoin(state: P2PState, action: PayloadAction<RequestBuySellCoin>) {
      state.response.loading = true;
    },

    responseBuyCoin(state: P2PState, action: PayloadAction<any>) {
      state.response.message = action.payload.message;
      state.response.error = action.payload.error;
      state.response.loading = false;
    },

    requestSellCoin(state: P2PState, action: PayloadAction<RequestBuySellCoin>) {
      state.response.loading = true;
    },

    responseSellCoin(state: P2PState, action: PayloadAction<any>) {
      state.response.message = action.payload.message;
      state.response.error = action.payload.error;
      state.response.loading = false;
    },

    // Reset
    resetResponse(state: P2PState) {
      state.response = {
        loading: false,
        error: -1,
        message: '',
      };
    },
    resetAllFieldOfP2P(state: P2PState) {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = slice;
export const p2pActions = actions;
export const p2pReducer = reducer;
