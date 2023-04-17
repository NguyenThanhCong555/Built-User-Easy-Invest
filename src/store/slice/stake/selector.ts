import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.stake || initialState;
export const selectStake = createSelector([selectDomain], stake => stake);

export const selectListStakes = createSelector([selectDomain], stake => stake.stakes);
export const selectCalledStakes = createSelector([selectDomain], stake => stake.calledStakes);

export const selectStakingBook = createSelector([selectDomain], stake => stake.stakingBook);
export const selectCalledStakingBook = createSelector([selectDomain], stake => stake.calledStakingBook);
export const selectTotalUsdtClose = createSelector([selectDomain], stake => stake.totalUsdtClose);
export const selectTotalUsdtOpen = createSelector([selectDomain], stake => stake.totalUsdtOpen);

export const selectBoughtStakes = createSelector([selectDomain], stake => stake.boughtStakes);
export const selectCalledBoughtStakes = createSelector([selectDomain], stake => stake.calledBoughtStakes);

// response
export const selectLoadingGetStakes = createSelector([selectDomain], stake => stake.response.loadingGetStakes);
export const selectLoadingTradingStake = createSelector([selectDomain], stake => stake.response.loadingTradingStake);
export const selectLoadingStakingBook = createSelector([selectDomain], stake => stake.response.loadingStakingBook);
export const selectLoading = createSelector([selectDomain], stake => stake.response.loading);
export const selectError = createSelector([selectDomain], stake => stake.response.error);

export const selectResponseErrorTradingStake = createSelector([selectDomain], stake => stake.response.errorTradingStake);
