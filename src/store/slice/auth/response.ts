import { ErrorResponse } from 'utils/http/response';

export interface IResponseLoginByOTP extends ErrorResponse {
  data: { id: number; token: string; role: number };
}
