import { createTransform } from 'redux-persist';
import { Project } from './slice/project/types';
import { Stake } from './slice/stake/types';
import { WalletState } from './slice/wallet/type';
import { TransactionState } from './slice/transaction/type';
import { ProfileState } from './slice/profile/types';
import { Coin } from './slice/coin/types';
import { Recharge } from './slice/recharge/types';
import { INITIAL_VALUE } from 'constants/common';

export const projectTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as Project),
      calledFirstProjectDetail: [],
      calledFirstProjects: false,
      response: {
        loading: false,
        loadingProjectDetail: false,

        error: -1,
        message: '',
      },
    };
  },
  { whitelist: ['project'] },
);

export const stakeTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as Stake),
      calledStakes: [],
      calledStakesCoin: [],
      stakingBook: [],
      calledStakingBook: false,
      stakingBookCoin: [],
      calledStakingBookCoin: false,
      calledTotalUsdt: false,
      totalPage: INITIAL_VALUE,
      totalPageLocal: 1,
      totalPageCoin: INITIAL_VALUE,
      totalPageLocalCoin: 1,

      calledBoughtStakes: [],
      calledBoughtStakesCoin: [],

      response: {
        loading: false,
        loadingGetStakes: false,

        loadingTradingStake: false,
        loadingStakingBook: false,

        loadingBoughtStakes: false,
        loadingWithdrawStake: false,

        //coin management
        loadingGetStakesCoin: false,
        loadingTradingStakeCoin: false,
        loadingStakingBookCoin: false,
        loadingBoughtStakesCoin: false,
        loadingWithdrawStakeCoin: false,

        error: INITIAL_VALUE,
        message: '',

        messageTradingStake: '',
        errorTradingStake: INITIAL_VALUE,
        errorTradingStakeCoin: INITIAL_VALUE,

        errorWithdrawStake: INITIAL_VALUE,
        messageWithdrawStake: '',
        errorWithdrawStakeCoin: INITIAL_VALUE,
      },
    };
  },
  { whitelist: ['stake'] },
);

export const coinTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as Coin),
      callListCoins: false,

      response: {
        loading: false,
        error: -1,
        message: '',
      },
    };
  },
  { whitelist: ['coin'] },
);

export const walletTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as WalletState),
      //data: [],
      transactions: [],
      calledTransaction: false,
      totalPage: 0,

      response: {
        loading: false,
        error: -1,
        message: '',
      },
    };
  },
  { whitelist: ['wallet'] },
);

export const transactionTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as TransactionState),
      transfer: {
        user: {},
        locked: true,
      },

      response: {
        error: -1,
        message: '',
        loading: false,
      },
      responseUser: {
        error: -1,
        message: '',
        loading: false,
      },
      responseOTP: {
        error: -1,
        message: '',
        loading: false,
      },
    };
  },
  { whitelist: ['transaction'] },
);

export const profileTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as ProfileState),
      calledProfile: false,

      response: {
        error: -1,
        message: '',
        loading: false,
      },
    };
  },
  { whitelist: ['profile'] },
);

export const rechargeTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...(inboundState as Recharge),
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as Recharge),
      addUsdt: '',
      //transferHistory: [],

      calledTransferHistoryDetail: [],
      calledTransferHistory: false,
      totalPageOfHistory: INITIAL_VALUE,
      totalPageLocalOfHistory: 1,

      calledListBank: false,

      response: {
        loadingRechargeUsdt: false,
        loadingTransferHistoryRecharge: false,

        error: INITIAL_VALUE,
        message: '',
      },
    };
  },
  { whitelist: ['recharge'] },
);

export const withdrawTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...(inboundState as Recharge),
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as Recharge),
      calledTransferHistory: false,
      totalPageOfHistory: INITIAL_VALUE,
      totalPageLocalOfHistory: 1,

      calledTransferHistoryGame: false,
      totalPageOfHistoryGame: INITIAL_VALUE,
      totalPageLocalOfHistoryGame: 1, // 1: initial one page

      response: {
        loadingWithdrawUsdt: false,
        loadingWithdrawToGame: false,
        loadingTransferHistoryWithdraw: false,
        loadingTransferHistoryGameWithdraw: false,

        error: INITIAL_VALUE,
        message: '',
      },
    };
  },
  { whitelist: ['withdraw'] },
);

export const systemTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...(inboundState as Recharge),
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as Recharge),
      systemError: false,
    };
  },
  { whitelist: ['system'] },
);
