import { useEffect } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { System } from './types';
import { INITIAL_VALUE } from 'constants/common';

export const initialState: System = {
  systemError: false,
};

const slice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    // reset
    resetSystemError(state: System) {
      state.systemError = false;
    },

    //
    setSystemError(state: System) {
      state.systemError = true;
    },
  },
});

export const { actions: systemActions, reducer } = slice;

export const systemReducer = reducer;
