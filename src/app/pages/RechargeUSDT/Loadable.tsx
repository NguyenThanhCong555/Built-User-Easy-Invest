/**
 * Asynchronously loads the component for HomePage
 */

// import { LoadingOverlay } from 'app/components/Popup/LoadingOverlay';
import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const ChooseMethodRecharge = lazyLoad(
  () => import('./ChooseMethodRecharge'),
  module => module.ChooseMethodRecharge,
  // { fallback: <LoadingOverlay /> },
);

export const RechargeWithBank = lazyLoad(
  () => import('./RechargeWithBank'),
  module => module.RechargeWithBank,
  // { fallback: <LoadingOverlay /> },
);

export const RechargeWithBinance = lazyLoad(
  () => import('./RechargeWithBinance'),
  module => module.RechargeWithBinance,
  // { fallback: <LoadingOverlay /> },
);

export const HistoryRecharge = lazyLoad(
  () => import('./History'),
  module => module.HistoryRecharge,
  // { fallback: <LoadingOverlay /> },
);
export const DetailHistoryRecharge = lazyLoad(
  () => import('./History/DetailHistory'),
  module => module.DetailHistoryRecharge,
  // { fallback: <LoadingOverlay /> },
);

// edit recharge history
export const EditRechargeWithBank = lazyLoad(
  () => import('./EditRechargeCommand/RechargeWithBank'),
  module => module.EditRechargeWithBank,
);

export const EditRechargeWithBinance = lazyLoad(
  () => import('./EditRechargeCommand/RechargeWithBinance'),
  module => module.EditRechargeWithBinance,
);
