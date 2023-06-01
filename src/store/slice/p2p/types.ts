export interface P2PState {
  response: {
    loading: boolean;
    message: string;
    error: number;
  };
}

export interface RequestBuySellCoin {
  coin_id: number;
  exchange: number;
}
