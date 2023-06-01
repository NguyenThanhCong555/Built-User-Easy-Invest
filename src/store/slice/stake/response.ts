import { ErrorResponse } from 'utils/http/response';
import { SimpleStake, TStakeBought, TStakingBook } from './types';
import { TCoinInfo } from '../project/types';

export const RESPONSE_ERROR_NOT_ENOUGH_USDT = 50;
export const RESPONSE_ERROR_EXCEED_MAX = 13;
export const RESPONSE_ERROR_BELOW_MIN = 12;

export interface ListStakeResponse extends ErrorResponse {
  data: {
    coin_info: TCoinInfo;
    stake_template: SimpleStake[];
  };
}

export type boughtStake = {
  user_id: number;
  project_id: number;
  stake_id: number;
  usdt: number;
  coin: number;
  profit: number;
  time_start: number;
  time_end: number;
  interest_rate_before: number;
  auto: 0 | 1;
  id: number;
};
export interface TradingStakeResponse extends ErrorResponse {
  data: boughtStake;
}

export interface StakingBookResponse extends ErrorResponse {
  data: {
    data: TStakingBook[];
    usdt_stake_close: number;
    usdt_stake_open: number;
  };
}

export interface FilterStakingResponse extends ErrorResponse {
  data: {
    staking: TStakingBook[];
    total_page: number;
  };
}

export interface TotalUsdtStakeResponse extends ErrorResponse {
  data: { total_usdt_staking: number };
}

export interface BoughtStakeInforResponse extends ErrorResponse {
  data: TStakeBought;
}
