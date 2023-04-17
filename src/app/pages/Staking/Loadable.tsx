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
export const StakeManagement = lazyLoad(
  () => import('./StakeManagement'),
  module => module.StakeManagement,
  // { fallback: <LoadingOverlay /> },
);

export const StakingClosed = lazyLoad(
  () => import('./StakingClosed'),
  module => module.StakingClosed,
  // { fallback: <LoadingOverlay /> },
);
