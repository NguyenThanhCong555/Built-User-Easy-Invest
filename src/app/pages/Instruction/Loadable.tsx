/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const InstructionRecharge = lazyLoad(
  () => import('./InstructionRecharge'),
  module => module.InstructionRecharge,
);

export const InstructionStakingCoin = lazyLoad(
  () => import('./InstructionStakingCoin'),
  module => module.InstructionStakingCoin,
);

export const InstructionStakingUSDT = lazyLoad(
  () => import('./InstructionStakingUSDT'),
  module => module.InstructionStakingUSDT,
);

export const InstructionTransferCoin = lazyLoad(
  () => import('./InstructionTransferCoin'),
  module => module.InstructionTransferCoin,
);

export const InstructionWithdraw = lazyLoad(
  () => import('./InstructionWithdraw'),
  module => module.InstructionWithdraw,
);
