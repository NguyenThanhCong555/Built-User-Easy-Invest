import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectDomain = state => state?.transaction || initialState;
export const selectTransferPhoneData = createSelector([selectDomain], state => state.transfer);
export const selectResponseUser = createSelector([selectDomain], state => state.responseUser);
export const selectResponseOTP = createSelector([selectDomain], state => state.responseOTP);
export const selectResponse = createSelector([selectDomain], state => state.response);
