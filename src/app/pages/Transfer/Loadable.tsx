/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const TransferCoinByPhone = lazyLoad(
  () => import('./TransferCoinByPhone'),
  module => module.TransferCoinByPhone,
);

export const TransferUSDTByPhone = lazyLoad(
  () => import('./TransferUSDTByPhone'),
  module => module.TransferUSDTByPhone,
);
