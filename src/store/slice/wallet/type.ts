import { IWalletTotal, IWalletTransactions } from './response';

export interface WalletState {
  data: IWalletTotal[];
  coin: { userId: number; coin_id: number; coin_name: string; balance: number };

  transactions: IWalletTransactions[];
  dataTransactionDetail: any;

  totalPage: number;
  response: {
    loading: boolean;
    error: number;
    message: string;
  };
}
