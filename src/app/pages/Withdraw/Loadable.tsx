/**
 * Asynchronously loads the component for HomePage
 */

// import { LoadingOverlay } from 'app/components/Popup/LoadingOverlay';
import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const ChooseMethodWithdraw = lazyLoad(
  () => import('./ChooseMethodWithdraw'),
  module => module.ChooseMethodWithdraw,
  // { fallback: <LoadingOverlay /> },
);

export const EntryUSDTWithdraw = lazyLoad(
  () => import('./WithdrawWithBinance/EntryUSDT'),
  module => module.EntryUSDT,
  // { fallback: <LoadingOverlay /> },
);

export const ConfirmWithdraw = lazyLoad(
  () => import('./WithdrawWithBinance/ConfirmOTP'),
  module => module.ConfirmOTP,
  // { fallback: <LoadingOverlay /> },
);

export const EditEntryUSDTWithdraw = lazyLoad(
  () => import('./EditWithdraw/EditEntryUSDT'),
  module => module.EditEntryUSDT,
  // { fallback: <LoadingOverlay /> },
);

export const EditConfirmWithdraw = lazyLoad(
  () => import('./EditWithdraw/EditConfirmOTP'),
  module => module.EditConfirmOTP,
  // { fallback: <LoadingOverlay /> },
);

export const HistoryWithdraw = lazyLoad(
  () => import('./History'),
  module => module.HistoryWithdraw,
  // { fallback: <LoadingOverlay /> },
);
export const DetailHistoryWithdraw = lazyLoad(
  () => import('./History/DetailHistory'),
  module => module.DetailHistoryWithdraw,
  // { fallback: <LoadingOverlay /> },
);

export const WithdrawToGameID = lazyLoad(
  () => import('./CoinToTheGame/Entry'),
  module => module.CoinToTheGame,
  // { fallback: <LoadingOverlay /> },
);

export const ConfirmGameWithdraw = lazyLoad(
  () => import('./CoinToTheGame/ConfirmOTP'),
  module => module.ConfirmOTP,
  // { fallback: <LoadingOverlay /> },
);
