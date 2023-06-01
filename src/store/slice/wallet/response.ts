import { ErrorResponse } from 'utils/http/response';

export interface WalletTotalResponse extends ErrorResponse {
  data: {
    [x: string]: any;
    usdt: number;
  };
}

export interface WalletTransactionsResponse extends ErrorResponse {
  data: {
    transactions: IWalletTransactions[];
  };
}

export interface WalletTotalCoinResponse extends ErrorResponse {
  data: IWalletTotalTotal;
}

export interface IWalletTotal {
  coin: string;
  balance: number;
  userid: number;
  coin_avatar: string;
  coin_name: string;
  coin_id?: number;
  min_transfer?: number;
}

export interface ItransactionsHistoryUSDT {
  balance: number | string;
  coin_id: number;
  coin_name: string;
  create_time: number | string;
  exchange: number | string;
  id: number | string;
  service: number | string;
  status: number | string;
  user_id: number;
  total_page: any;
  transactions: any;
}
export interface ItransactionsHistoryUSDTByCoin {
  balance: number | string;
  coin_id: number;
  coin_name: string;
  create_time: number | string;
  detail: {
    action: string | number;
    coin_avatar: string;
    project: {
      avatar: string;
      name: string;
    };
    stake: {
      interest_rate: number | string;
      timeframe: number | string;
    };
  };
  exchange: number | string;
  id: number | string;
  service: number | string;
  status: number | string;
  user_id: number;
}

export interface IWalletTransactions {
  id: number;
  user_id: number;
  exchange: number;
  balance: number;
  service: number;
  create_time: number;
  status: number;
}

export interface IWalletTotalTotal {
  coin: string;
  balance: number;
  userid: number;
}
