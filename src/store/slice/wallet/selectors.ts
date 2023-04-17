import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectDomain = state => state?.wallet || initialState;
export const selectWalletTotalCoin = createSelector([selectDomain], state => state.coin);

export const selectResponseWallet = createSelector([selectDomain], state => state.response);
export const selectWalletTransactions = createSelector([selectDomain], state => state.transactions);
