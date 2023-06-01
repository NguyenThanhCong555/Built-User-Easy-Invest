export type SimpleStake = {
  id: number;
  project_id: number;
  interest_rate: number;
  interest_rate_before: number;
  min_stake: number;
  max_stake: number;
  timeframe: number;
  description: { title: string; content: string };
  status: 0 | 1;
};
export type IListStake = {
  project_id: number;
  listStake: SimpleStake[];
};

export type TCoinInfo = {
  id: number;
  coin_name: string;
  coin_avatar: string;
  rate_usdt_coin: number;
  min_transfer: number;
};

export interface TStakeBought {
  id: number;
  user_id: number;
  project_id: number;
  stake_id: number;
  coin_id: number;
  usdt: number;
  coin: number;
  profit: number;
  time_start: number;
  time_end: number;
  time_withdraw: number;
  interest_rate: number;
  interest_rate_before: number;
  renewal: number;
  auto: number;
  status: number;
  received_coin: number;
  received_coin_before: number;
  project_name: string;
  coin_info: TCoinInfo;
}

export type TBoughtStakeItem = {
  stakingId: number;
  stakeInfor: TStakeBought;
};

export type TStakingBook = {
  id: number;
  user_id: number;
  project_id: number;
  stake_id: number;
  usdt: number;
  coin: number;
  profit: number;
  time_start: number;
  time_end: number;
  interest_rate: number;
  interest_rate_before: number;
  auto: 0 | 1; // auto invest : 1
  status: 0 | 1; // 0: close 1:staking
  coin_info: TCoinInfo;
};

export interface Stake {
  stakes: IListStake[];
  calledStakes: number[];

  stakesCoin: IListStake[];
  calledStakesCoin: number[];

  stakingBook: TStakingBook[];
  calledStakingBook: boolean;
  totalPage: number;
  totalPageLocal: number;

  totalUsdt: number;
  calledTotalUsdt: boolean;

  // coin management
  stakingBookCoin: TStakingBook[];
  calledStakingBookCoin: boolean;
  totalPageCoin: number;
  totalPageLocalCoin: number;

  // stake management information
  boughtStakes: TStakeBought[];
  calledBoughtStakes: number[];

  boughtStakesCoin: TStakeBought[];
  calledBoughtStakesCoin: number[];

  response: {
    loading: boolean;
    loadingGetStakes: boolean;
    loadingGetStakesCoin: boolean;

    loadingTradingStake: boolean;
    loadingTradingStakeCoin: boolean;

    loadingStakingBook: boolean;
    loadingBoughtStakes: boolean;
    loadingWithdrawStake: boolean;

    loadingStakingBookCoin: boolean;
    loadingBoughtStakesCoin: boolean;
    loadingWithdrawStakeCoin: boolean;

    error: number;
    message: string;

    errorTradingStake: number;
    messageTradingStake: string;
    errorTradingStakeCoin: number;

    errorWithdrawStake: number;
    messageWithdrawStake: string;
    errorWithdrawStakeCoin: number;
  };
}
