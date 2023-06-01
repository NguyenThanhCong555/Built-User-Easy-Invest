import { ErrorResponse } from 'utils/http/response';
import { TBank, TransferHistory } from './types';

export const ERROR_HAD_EXIST_REQUEST_RECHARGE = 11;
export const MESSAGE_HAD_EXIST_REQUEST_RECHARGE = 'not_exist_profile';

export interface rechargeUsdtResponse extends ErrorResponse {
  data: {
    coin_id: number;
    exchange: number;
    content: string;
    service: number;
    userid: number;
    requester: string;
    create_time: number;
    update_time: number;
    status: number;
    id: number;
  };
}

export interface limitRechargeResponse extends ErrorResponse {
  data: { times: number };
}

export interface TransferHistoryResponse extends ErrorResponse {
  data: {
    requests: TransferHistory[];
    total_page: number;
  };
}

export interface listBankResponse extends ErrorResponse {
  data: {
    banking_accounts: TBank[];
  };
}
