import { useEffect } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coin, coinInfo } from './types';
import { INITIAL_VALUE } from 'constants/common';

export const initialState: Coin = {
  listCoins: [],
  callListCoins: false,

  response: {
    loading: false,
    error: INITIAL_VALUE,
    message: '',
  },
};

const slice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    // reset
    resetCallListCoins(state: Coin) {
      state.callListCoins = false;
    },
    resetLoading(state: Coin) {
      state.response.loading = false;
    },

    resetAllFieldProject(state: Coin) {
      state.response = {
        loading: false,
        error: INITIAL_VALUE,
        message: '',
      };
    },

    resetAllFieldOfCoin(state: Coin) {
      state.listCoins = [];
      state.callListCoins = false;

      state.response = {
        loading: false,
        error: INITIAL_VALUE,
        message: '',
      };
    },

    // set field
    setCallListCoins(state: Coin) {
      state.callListCoins = true;
    },

    //get list coins
    requestGetListCoins(state: Coin) {
      state.response.loading = true;
    },
    responseWhenFetchListCoins(state: Coin, action: PayloadAction<coinInfo[]>) {
      state.listCoins = action.payload;
    },
  },
});

export const { actions: coinActions, reducer } = slice;

export const coinReducer = reducer;
