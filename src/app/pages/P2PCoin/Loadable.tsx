/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const P2PCoin = lazyLoad(
  () => import('./index'),
  module => module.P2PCoin,
);

// export const WalletCoinManagement = lazyLoad(
//   () => import('./WalletCoinManagement'),
//   module => module.WalletCoinManagement,
// );
