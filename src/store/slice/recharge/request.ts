export type RechargeRequest = {
  coin_id: number;
  exchange: number;
  content: string;
  service: 1; // 1: recharge
  banking_account_id: number;
};

export type EditRechargeRequest = {
  id: number;
  coin_id: number;
  exchange: number;
  content: string;
  service: 1; // 1: recharge
  banking_account_id: number;
};

export type getRequestHistory = {
  page: number;
  service: number;
  beginTime: number;
  endTime: number;
  coin_id?: number;
};
