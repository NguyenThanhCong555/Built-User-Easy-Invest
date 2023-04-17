export type coinInfo = {
  project_id: number;
  coin_name: string;
  coin_avatar: string;
  rate_usdt_coin: number;
  min_transfer: number;
  min_interest_rate: number;
  max_interest_rate: number;
};

export interface Coin {
  listCoins: coinInfo[];
  callListCoins: boolean;

  response: {
    loading: boolean;
    error: number;
    message: string;
  };
}
