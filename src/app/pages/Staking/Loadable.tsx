/**
 * Asynchronously loads the component for HomePage
 */

// import { LoadingOverlay } from 'app/components/Popup/LoadingOverlay';
import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const Stake = lazyLoad(
  () => import('./Stake'),
  module => module.Stake,
  // { fallback: <LoadingOverlay /> },
);

export const StakeCoin = lazyLoad(
  () => import('./StakeCoin'),
  module => module.StakeCoin,
  // { fallback: <LoadingOverlay /> },
);

export const StakeManagement = lazyLoad(
  () => import('./StakeManagement'),
  module => module.StakeManagement,
  // { fallback: <LoadingOverlay /> },
);

export const StakedDetail = lazyLoad(
  () => import('./StakeDetail'),
  module => module.StakedDetail,
  // { fallback: <LoadingOverlay /> },
);

export const StakeCoinManagement = lazyLoad(
  () => import('./StakeCoinManagement'),
  module => module.StakeCoinManagement,
  // { fallback: <LoadingOverlay /> },
);

export const StakedCoinDetail = lazyLoad(
  () => import('./StakeCoinDetail'),
  module => module.StakedCoinDetail,
  // { fallback: <LoadingOverlay /> },
);
