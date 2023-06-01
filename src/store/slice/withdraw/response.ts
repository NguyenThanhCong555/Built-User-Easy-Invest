import { ErrorResponse } from 'utils/http/response';
import { TransferHistory, TransferHistoryGame } from './types';

export const ERROR_HAD_EXIST_REQUEST_Withdraw = 11;
export const MESSAGE_HAD_EXIST_REQUEST_Withdraw = 'not_exist_profile';

export interface withdrawUsdtResponse extends ErrorResponse {
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

export interface limitWithdrawResponse extends ErrorResponse {
  data: { times: number };
}

export interface TransferHistoryResponse extends ErrorResponse {
  data: {
    requests: TransferHistory[];
    total_page: number;
  };
}
export interface TransferHistoryGameResponse extends ErrorResponse {
  data: {
    requests: TransferHistoryGame[];
    total_page: number;
  };
}
