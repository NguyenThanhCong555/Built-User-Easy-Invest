export type TradingStakeRequest = {
  project_id: number;
  stake_id: number;
  usdt: number;
  auto: 0 | 1;
};

export type TradingStakeCoinRequest = {
  project_id: number;
  stake_id: number;
  coin: number;
  auto: 0 | 1;
};

export type filterStakingBookRequest = {
  coinId: number;
  status: number;
  beginTime: number;
  endTime: number;
  page: number;
};
