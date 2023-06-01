export interface TransactionState {
  transfer: {
    user: {};
    locked: boolean;
  };

  response: {
    error: number;
    loading: boolean;
    message: string;
  };

  responseUser: {
    error: number;
    loading: boolean;
    message: string;
  };

  responseOTP: {
    error: number;
    loading: boolean;
    message: string;
  };
}
