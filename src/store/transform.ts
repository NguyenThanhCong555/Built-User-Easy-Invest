import { createTransform } from 'redux-persist';
import { Project } from './slice/project/types';
import { Stake } from './slice/stake/types';

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
      calledStakingBook: false,

      response: {
        loading: false,
        loadingGetStakes: false,
        loadingTradingStake: false,

        error: -1,
        message: '',

        messageTradingStake: '',
        errorTradingStake: -1,
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
      ...(outboundState as Stake),
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
