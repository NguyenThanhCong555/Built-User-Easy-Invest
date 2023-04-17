/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import { InjectedReducersType } from 'utils/types/injector-typings';
import { authReducer } from './slice/auth';

import { projectReducer } from './slice/project';
import { stakeReducer } from './slice/stake';
import { coinReducer } from './slice/coin';
import { walletReducer } from './slice/wallet';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  const rootReducers = combineReducers({
    // Initially we don't have any injectedReducers, so returning identity function to avoid the error
    project: projectReducer,
    stake: stakeReducer,
    auth: authReducer,
    coin: coinReducer,
    wallet: walletReducer,
  });
  return rootReducers;
}
