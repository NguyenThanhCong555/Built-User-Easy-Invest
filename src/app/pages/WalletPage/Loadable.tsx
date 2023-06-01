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
export const WalletCoinHistory = lazyLoad(
  () => import('./WalletMainHistory'),
  module => module.WalletMainHistory,
);

export const WalletTransactionDetail = lazyLoad(
  () => import('./WalletTransactionDetail'),
  module => module.WalletTransactionDetail,
);
export const WalletEndTransactionDetails = lazyLoad(
  () => import('./components/TransactionDetails'),
  module => module.TransactionDetails,
);
