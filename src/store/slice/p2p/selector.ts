import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.p2p || initialState;
export const selectResponseP2P = createSelector([selectDomain], state => state.response);
