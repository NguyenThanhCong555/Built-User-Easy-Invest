export type WithdrawRequest = {
  id?: number;
  otp: string;
  coin_id: number;
  exchange: number;
  content: string;
  service: 2; // 2: Withdraw
  other: { banking: string; account_number: string; account_name: string; banking_logo: string };
};
export type WithdrawRequestGame = {
  otp: string;
  coin_id: number;
  exchange: number;
  other: { ID: string };
};

export type EditWithdrawRequest = {
  id: number;
  coin_id: number;
  exchange: number;
  content: string;
  service: 1; // 1: Withdraw
  other: { banking: string; account_number: string; account_name: string; banking_logo: string };
};

export type getRequestHistory = {
  page: number;
  service: number;
  beginTime: number;
  endTime: number;
  coin_id?: number;
};
