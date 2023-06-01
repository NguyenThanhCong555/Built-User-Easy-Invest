export const START_STEP = 1;
export const CHOOSE_A_BANK_STEP = 2;
export const COMPLETE_STEP = 3;

export const RESPONSE_ERROR_TRANSACTION_WITHDRAW = 10;
export const RESPONSE_ERROR_EXPIRED_OTP_WITHDRAW = 15;
export const RESPONSE_ERROR_INVALID_OTP_WITHDRAW = 16;

export type TBank = {
  bankId: number;
  bankName: string;
  nameReceiver: string;
  accountNumber: string;
  avatarBank: string;
  QRCode: string;
};

export type TransferHistory = {
  id: number;
  requester: string;
  coin_id: number;
  exchange: number;
  real_exchange: number;
  content: string;
  service: number;
  userid: number;
  create_time: number;
  update_time: number;
  status: number;
  other: { banking: string; account_number: string; account_name: string; banking_logo: string };
  coin_name: 'USDT';
  coin_avatar: string;
};

export type TransferHistoryGame = {
  id: number;
  requester: string;
  coin_id: number;
  exchange: number;
  real_exchange: number;
  content: string;
  service: number;
  userid: number;
  create_time: number;
  update_time: number;
  status: number;
  other: { ID: string };
  coin_name: 'USDT';
  coin_avatar: string;
};

export interface Withdraw {
  readonly withdrawFee: number;

  addUsdt: string; // value input
  addBinanceId: string;

  addCoinToGame: string;
  addGameId: string;

  transferHistory: TransferHistory[];
  calledTransferHistory: boolean;
  totalPageOfHistory: number;
  totalPageLocalOfHistory: number;

  transferHistoryGame: TransferHistoryGame[];
  calledTransferHistoryGame: boolean;
  totalPageOfHistoryGame: number;
  totalPageLocalOfHistoryGame: number;

  response: {
    loadingWithdrawUsdt: boolean;
    loadingWithdrawToGame: boolean;
    loadingTransferHistoryWithdraw: boolean;
    loadingTransferHistoryGameWithdraw: boolean;

    error: number;
    message: string;
  };
}
