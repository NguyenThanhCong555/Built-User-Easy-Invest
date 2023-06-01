import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.stake || initialState;
export const selectStake = createSelector([selectDomain], stake => stake);

export const selectListStakes = createSelector([selectDomain], stake => stake.stakes);
export const selectCalledStakes = createSelector([selectDomain], stake => stake.calledStakes);
export const selectListStakesCoin = createSelector([selectDomain], stake => stake.stakesCoin);
export const selectCalledStakesCoin = createSelector([selectDomain], stake => stake.calledStakesCoin);

export const selectStakingBook = createSelector([selectDomain], stake => stake.stakingBook);
export const selectCalledStakingBook = createSelector([selectDomain], stake => stake.calledStakingBook);
export const selectTotalPage = createSelector([selectDomain], stake => stake.totalPage);
export const selectTotalPageLocal = createSelector([selectDomain], stake => stake.totalPageLocal);
export const selectStakingBookCoin = createSelector([selectDomain], stake => stake.stakingBookCoin);
export const selectCalledStakingBookCoin = createSelector([selectDomain], stake => stake.calledStakingBookCoin);
export const selectTotalPageCoin = createSelector([selectDomain], stake => stake.totalPageCoin);
export const selectTotalPageLocalCoin = createSelector([selectDomain], stake => stake.totalPageLocalCoin);

export const selectTotalUsdt = createSelector([selectDomain], stake => stake.totalUsdt);
export const selectCalledTotal = createSelector([selectDomain], stake => stake.calledTotalUsdt);

export const selectBoughtStakes = createSelector([selectDomain], stake => stake.boughtStakes);
export const selectCalledBoughtStakes = createSelector([selectDomain], stake => stake.calledBoughtStakes);
export const selectBoughtStakesCoin = createSelector([selectDomain], stake => stake.boughtStakesCoin);
export const selectCalledBoughtStakesCoin = createSelector([selectDomain], stake => stake.calledBoughtStakesCoin);

// response
export const selectLoadingGetStakes = createSelector([selectDomain], stake => stake.response.loadingGetStakes);
export const selectLoadingGetStakesCoin = createSelector([selectDomain], stake => stake.response.loadingGetStakesCoin);
export const selectLoadingTradingStake = createSelector([selectDomain], stake => stake.response.loadingTradingStake);
export const selectLoadingTradingStakeCoin = createSelector([selectDomain], stake => stake.response.loadingTradingStakeCoin);
export const selectLoadingStakingBook = createSelector([selectDomain], stake => stake.response.loadingStakingBook);
export const selectLoadingWithdrawStake = createSelector([selectDomain], stake => stake.response.loadingWithdrawStake);
export const selectLoadingStakingBookCoin = createSelector([selectDomain], stake => stake.response.loadingStakingBookCoin);
export const selectLoadingWithdrawStakeCoin = createSelector([selectDomain], stake => stake.response.loadingWithdrawStakeCoin);
export const selectLoading = createSelector([selectDomain], stake => stake.response.loading);
export const selectError = createSelector([selectDomain], stake => stake.response.error);

export const selectResponseErrorTradingStake = createSelector([selectDomain], stake => stake.response.errorTradingStake);
export const selectResponseErrorTradingStakeCoin = createSelector([selectDomain], stake => stake.response.errorTradingStakeCoin);
export const selectResponseErrorWithdrawStake = createSelector([selectDomain], stake => stake.response.errorWithdrawStake);
export const selectResponseErrorWithdrawStakeCoin = createSelector(
  [selectDomain],
  stake => stake.response.errorWithdrawStakeCoin,
);
