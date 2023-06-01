import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectDomain = state => state?.wallet || initialState;
export const selectUserSeeAllCoinsInWallet = createSelector([selectDomain], state => state.data);
export const selectWalletTotalCoin = createSelector([selectDomain], state => state.coin);

export const selectResponseWallet = createSelector([selectDomain], state => state.response);
export const selectWalletTransactions = createSelector([selectDomain], state => state.transactions);
export const selectTransactionsHistoryUSDT = createSelector([selectDomain], state => state.transactionsHistoryUSDT);
export const selectTransactionsHistoryUSDTByCoin = createSelector([selectDomain], state => state.transactionsHistoryUSDTByCoin);
export const selecTotalPageUSDT = createSelector([selectDomain], state => state.totalPageUSDT);

export const selectWalletTotalPage = createSelector([selectDomain], state => state.totalPage);

export const selectCalledTransactions = createSelector([selectDomain], state => state.calledTransaction);

export const selectTransactionDetail = createSelector([selectDomain], state => state.dataTransactionDetail);
