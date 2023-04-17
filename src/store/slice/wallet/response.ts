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
