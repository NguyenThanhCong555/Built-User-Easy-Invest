import { ErrorResponse } from 'utils/http/response';
import { coinInfo } from './types';

export interface responseAllCoins extends ErrorResponse {
  data: { coins: coinInfo[] };
}
