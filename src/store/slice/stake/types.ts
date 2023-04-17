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

export type TStakeBought = {
  id: number; // staking id
  user_id: number;
  project_id: number;
  stake_id: number;
  name: string;
  usdt: number;
  coin: number;
  profit: number;
  time_start: number;
  time_end: number;
  interest_rate: number;
  interest_rate_before: number;
  auto: number;
  status: number;
};

export type TBoughtStakeIteam = {
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
};

export interface Stake {
  stakes: IListStake[];
  calledStakes: number[];

  stakingBook: TStakingBook[];
  calledStakingBook: boolean;
  totalUsdtClose: number;
  totalUsdtOpen: number;

  // statke management
  boughtStakes: TBoughtStakeIteam[];
  calledBoughtStakes: number[];

  response: {
    loading: boolean;
    loadingGetStakes: boolean;
    loadingTradingStake: boolean;
    loadingStakingBook: boolean;
    loadingBoughtStakes: boolean;

    error: number;
    message: string;

    errorTradingStake: number;
    messageTradingStake: string;
  };
}
