import { AuthState, ProjectState } from './type';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export const initialState: AuthState = {
  id: -1,
  token: '',
  refreshToken: '',
  refreshToken_time: 0,
  username: '',
  language: 'en-US',
  isLogin: false,
  isMobile: false,
  isAuthen: false,
  isError: false,
  isLoading: false,
  projects: [],
  login: { error: -1, message: '' },

  response: {
    messageLoginTelegram: '',
    errorLoginTelegram: -1,
  },
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessDevice(state: AuthState, action: PayloadAction<boolean>) {
      state.isMobile = action.payload;
    },

    requestLoginByTelegram(state: AuthState) {
      state.isLoading = true;
    },
    loginByTelegram(state: AuthState, action: PayloadAction<AuthState>) {
      state.isLoading = false;
      state.login = action.payload.login;
    },

    requestGetOtp(state: AuthState, action: PayloadAction<any>) {
      state.isLoading = true;
    },
    getOtp(
      state: AuthState,
      action: PayloadAction<{
        login: {
          error: number;
          message: string;
        };
      }>,
    ) {
      state.isLoading = false;
      state.login = action.payload.login;
    },

    requestLoginByOtp(state: AuthState, action: PayloadAction<any>) {
      state.isLoading = true;
    },
    loginByOtp(
      state: AuthState,
      action: PayloadAction<{
        id: number;
        token: string;
        username: string;
        refreshToken: string;
        refreshToken_time: number;
      }>,
    ) {
      state.isLoading = false;
      state.isLogin = true;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.refreshToken = action.payload.refreshToken;
      state.refreshToken_time = action.payload.refreshToken_time;
    },
    loginByOtpFail(
      state: AuthState,
      action: PayloadAction<{
        login: {
          error: number;
          message: string;
        };
      }>,
    ) {
      state.isLoading = false;
      state.login = action.payload.login;
    },

    requestLogout(state: AuthState) {
      state.isLoading = true;
    },
    logoutSuccess(state: AuthState) {
      return {
        ...initialState,
        language: state.language,
      };
    },

    getAllProject(
      state: AuthState,
      action: PayloadAction<{
        projects: ProjectState[];
      }>,
    ) {
      state.projects = action.payload.projects;
    },

    setLanguage(
      state: AuthState,
      action: PayloadAction<{
        language: string;
      }>,
    ) {
      state.language = action.payload.language;
    },

    setIsAuthen(state: AuthState) {
      state.isAuthen = true;
    },
    resetIsAuthen(state: AuthState) {
      state.isAuthen = false;
    },
    // Rest State
    resetLogin(state: AuthState) {
      state.login = {
        error: -1,
        message: '',
      };
    },
    resetIsLoading(state: AuthState) {
      state.isLoading = false;
    },

    //login telegram
    resetResponseLoginTelegram(state: AuthState) {
      state.response.errorLoginTelegram = -1;
      state.response.messageLoginTelegram = '';
    },
    setResponseUser(state: AuthState, action: PayloadAction<{ error: number; message: string }>) {
      state.response.errorLoginTelegram = action.payload.error;
      state.response.messageLoginTelegram = action.payload.message;
    },
    requestLoginDirectlyTelegram(state: AuthState, action: PayloadAction<{ id: string; token: string }>) {},
  },
});

const { actions, reducer } = slice;
export const authActions = actions;
export const authReducer = reducer;
