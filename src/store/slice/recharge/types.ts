export const START_STEP = 1;
export const CHOOSE_A_BANK_STEP = 2;
export const COMPLETE_STEP = 3;

export type TBank = {
  id: number;
  userid: number;
  banking_name: string;
  banking_logo: string;
  account_name: string;
  account_number: string;
  qr_code: string;
  status: number;
  short_name: string;
  type: number;
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
  banking_account_id: number;
};

export interface Recharge {
  readonly VNDPerUSDT: number;

  operationStep: number;
  addUsdt: string; // value input
  chooseBankId: number; // user select id of bank

  limitRequestRecharge: number;

  listBank: TBank[];
  listBankBinance: TBank[];
  calledListBank: boolean;
  calledListBankBinance: boolean;

  transferHistory: TransferHistory[];
  calledTransferHistory: boolean;
  totalPageOfHistory: number;
  totalPageLocalOfHistory: number;

  transferHistoryDetail: TransferDetail[];
  calledTransferHistoryDetail: number[];

  response: {
    loadingRechargeUsdt: boolean;
    loadingTransferHistoryRecharge: boolean;

    loadingTransferDetail: boolean;
    error: number;
    message: string;
  };
}

export interface TransferDetail {
  id: number;
  requester_id: number;
  requester: string;
  role: number;
  coin_id: number;
  exchange: number;
  real_exchange: number;
  content: string;
  service: number;
  userid: number;
  create_time: number;
  update_time: number;
  status: number;
  banking_account_id: number;
  other: Other;
  receiver_info: ReceiverInfo;
  requester_info: RequesterInfo;
  banking_info: BankingInfo;
  order_transferred_code: string;
}
export interface Other {}

export interface ReceiverInfo {
  name: string;
  avatar: string;
  phone_number: string;
  create_time: number;
}

export interface RequesterInfo {
  name: string;
  avatar: string;
  phone_number: string;
  create_time: number;
}

export interface BankingInfo {
  id: number;
  userid: number;
  short_name: string;
  banking_name: string;
  banking_logo: string;
  account_name: string;
  account_number: string;
  qr_code: string;
  type: number;
  status: number;
}
