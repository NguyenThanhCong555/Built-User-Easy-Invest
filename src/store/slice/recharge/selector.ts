import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.recharge || initialState;
export const selectRecharge = createSelector([selectDomain], system => system);
export const selectVNDPerUSDT = createSelector([selectDomain], recharge => recharge.VNDPerUSDT);
export const selectOperationStep = createSelector([selectDomain], recharge => recharge.operationStep);
export const selectAddUsdt = createSelector([selectDomain], recharge => recharge.addUsdt);
export const selectChooseBankId = createSelector([selectDomain], recharge => recharge.chooseBankId);
export const selectLimitRequestRecharge = createSelector([selectDomain], recharge => recharge.limitRequestRecharge);

export const selectListBank = createSelector([selectDomain], recharge => recharge.listBank);
export const selectListBankBinance = createSelector([selectDomain], recharge => recharge.listBankBinance);
export const selectCalledListBank = createSelector([selectDomain], recharge => recharge.calledListBank);
export const selectCalledListBankBinance = createSelector([selectDomain], recharge => recharge.calledListBankBinance);

export const selectTransferHistory = createSelector([selectDomain], recharge => recharge.transferHistory);
export const selectCalledTransferHistory = createSelector([selectDomain], recharge => recharge.calledTransferHistory);
export const selectTotalPageOfHistory = createSelector([selectDomain], recharge => recharge.totalPageOfHistory);
export const selectTotalPageLocalOfHistory = createSelector([selectDomain], recharge => recharge.totalPageLocalOfHistory);

export const selectErrorRechargeResponse = createSelector([selectDomain], recharge => recharge.response.error);
export const selectMessageRechargeResponse = createSelector([selectDomain], recharge => recharge.response.message);

export const selectLoadingRechargeUsdt = createSelector([selectDomain], recharge => recharge.response.loadingRechargeUsdt);

export const selectLoadingTransferDetail = createSelector([selectDomain], recharge => recharge.response.loadingTransferDetail);

export const selectListTransferDetail = createSelector([selectDomain], state => state.transferHistoryDetail);
export const selectCalledTransferHistoryDetail = createSelector([selectDomain], state => state.calledTransferHistoryDetail);
