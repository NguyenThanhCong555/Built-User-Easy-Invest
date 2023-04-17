/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const WalletPage = lazyLoad(
  () => import('./index'),
  module => module.WalletPage,
);

export const WalletCoinManagement = lazyLoad(
  () => import('./WalletCoinManagement'),
  module => module.WalletCoinManagement,
);

export const WalletCoinTransactionManagement = lazyLoad(
  () => import('./WalletCoinTransactionManagement'),
  module => module.WalletCoinTransactionManagement,
);
