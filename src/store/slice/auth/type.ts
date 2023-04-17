export interface LoginState {
  error?: number;
  message?: string;
}
export interface ProjectState {
  id: number;
  name: string;
  avatar: string;
  author: {
    name: string;
  };
  state: number | string;
  total_invested: number | string;
}
export interface AuthState {
  id: number;
  token: string;
  username: string;
  refreshToken: string;
  refreshToken_time: number;
  language: string;
  isLogin: boolean;
  isAuthen: boolean;
  isMobile: boolean;
  isError: boolean;
  isLoading: boolean;
  login: LoginState;
  projects: ProjectState[];

  response: {
    messageLoginTelegram: string;
    errorLoginTelegram: number;
  };
}
