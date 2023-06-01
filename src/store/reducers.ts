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
import { transactionReducer } from './slice/transaction';
import { rechargeReducer } from './slice/recharge';
import { systemReducer } from './slice/system';
import { profileReducer } from './slice/profile';
import { withdrawReducer } from './slice/withdraw';
import { p2pReducer } from './slice/p2p';

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
    transaction: transactionReducer,
    recharge: rechargeReducer,
    system: systemReducer,
    profile: profileReducer,
    withdraw: withdrawReducer,
    p2p: p2pReducer,
  });
  return rootReducers;
}
