import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.coin || initialState;
export const selectCoins = createSelector([selectDomain], coin => coin);

export const selectListCoins = createSelector([selectDomain], coin => coin.listCoins);
export const selectCallListCoin = createSelector([selectDomain], coin => coin.callListCoins);

// response
export const selectLoading = createSelector([selectDomain], coin => coin.response.loading);

export const selectError = createSelector([selectDomain], coin => coin.response.error);
