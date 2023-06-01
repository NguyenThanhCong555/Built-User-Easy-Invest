import { IWalletTotal, IWalletTransactions, ItransactionsHistoryUSDT, ItransactionsHistoryUSDTByCoin } from './response';

export interface WalletState {
  data: IWalletTotal[];
  coin: {
    userId: number;
    coin_id: number;
    coin_name: string;
    balance: number;
    rate_usdt_coin: number;
    min_transfer: number;
    coin_avatar: string;
    purchase_fee: number;
    selling_fee: number;
  };

  transactions: IWalletTransactions[];
  transactionsHistoryUSDT: ItransactionsHistoryUSDT[];
  transactionsHistoryUSDTByCoin: ItransactionsHistoryUSDTByCoin[];
  dataTransactionDetail: any;

  calledTransaction: boolean;
  totalPage: number;
  totalPageUSDT: number;
  response: {
    loading: boolean;
    error: number;
    message: string;
  };
}
