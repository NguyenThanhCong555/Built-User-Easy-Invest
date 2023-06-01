/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const Profile = lazyLoad(
  () => import('./index'),
  module => module.Profile,
);

// export const WalletCoinManagement = lazyLoad(
//   () => import('./WalletCoinManagement'),
//   module => module.WalletCoinManagement,
// );
