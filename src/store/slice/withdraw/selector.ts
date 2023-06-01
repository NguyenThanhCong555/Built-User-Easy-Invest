import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.withdraw || initialState;
export const selectRecharge = createSelector([selectDomain], system => system);
export const selectWithdrawFee = createSelector([selectDomain], widthdraw => widthdraw.withdrawFee);
export const selectAddUsdt = createSelector([selectDomain], widthdraw => widthdraw.addUsdt);
export const selectAddBinanceId = createSelector([selectDomain], widthdraw => widthdraw.addBinanceId);
export const selectAddCoinToGame = createSelector([selectDomain], widthdraw => widthdraw.addCoinToGame);
export const selectAddGameId = createSelector([selectDomain], widthdraw => widthdraw.addGameId);

export const selectTransferHistory = createSelector([selectDomain], widthdraw => widthdraw.transferHistory);
export const selectCalledTransferHistory = createSelector([selectDomain], widthdraw => widthdraw.calledTransferHistory);
export const selectTotalPageOfHistory = createSelector([selectDomain], widthdraw => widthdraw.totalPageOfHistory);
export const selectTotalPageLocalOfHistory = createSelector([selectDomain], widthdraw => widthdraw.totalPageLocalOfHistory);

export const selectTransferHistoryGame = createSelector([selectDomain], widthdraw => widthdraw.transferHistoryGame);
export const selectCalledTransferHistoryGame = createSelector([selectDomain], widthdraw => widthdraw.calledTransferHistoryGame);
export const selectTotalPageOfHistoryGame = createSelector([selectDomain], widthdraw => widthdraw.totalPageOfHistoryGame);
export const selectTotalPageLocalOfHistoryGame = createSelector(
  [selectDomain],
  widthdraw => widthdraw.totalPageLocalOfHistoryGame,
);

export const selectErrorWithdrawResponse = createSelector([selectDomain], widthdraw => widthdraw.response.error);
export const selectMessageWithdrawResponse = createSelector([selectDomain], widthdraw => widthdraw.response.message);
