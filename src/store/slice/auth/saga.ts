import { PayloadAction } from '@reduxjs/toolkit';
import { authActions } from '.';
import History from 'app/components/History/History';
import { call, put, takeLatest } from 'redux-saga/effects';
import { checkDeviceId } from 'utils/helpers/checkDeviceId';
import { getCookie } from 'utils/helpers/getCookie';
import { apiGet, apiPost } from 'utils/http/request';
import { getLocalStorage } from 'utils/storage/local';
import { IResponseLoginByOTP } from './response';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';
import { RESPONSE_ERROR_EXPIRED_OTP, RESPONSE_ERROR_INVALID_OTP } from 'constants/account';
import { coinActions } from '../coin';
import { projectActions } from '../project';
import { stakeActions } from '../stake';
import { walletActions } from '../wallet';
import { profileActions } from '../profile';
import { transactionActions } from '../transaction';
import { p2pActions } from '../p2p';
import { rechargeActions } from '../recharge';

export function* handleGetOtp(action) {
  try {
    const res = yield call(apiGet, '/ez/getotp', {
      numberphone: action.payload,
    });
    const { error, message } = res;
    yield put(
      authActions.getOtp({
        login: {
          error: error,
          message: message,
        },
      }),
    );
  } catch {}
}

export function* handleLoginByTelegram() {
  try {
    const header = {};
    const res = yield call(apiGet, '/ez/getlinklogin', header);
    const { link } = res.data;

    setTimeout(() => {
      window.open(link, '_blank');
    });
  } catch {}
}

export function* loginDirectlyByTelegram(action: PayloadAction<{ id: string; token: string }>) {
  checkDeviceId();

  const deviceId = getCookie('device_id_iz');
  const sessionInfo = window.navigator.userAgent;
  const url = `/ez/loginbylink?device_id=${deviceId}&session_info=${sessionInfo}`;
  const body = action.payload;

  const data = yield call(apiPost, url, body, null);
  const next = sessionStorage.getItem('next');

  if (data.error === RESPONSE_SUCCESS_ERROR) {
    yield put(
      authActions.loginByOtp({
        id: data.data.id,
        token: data.data.token,
        username: data.data.username,
        refreshToken: data.data.refresh_token,
        refreshToken_time: data.data.token_exp_time,
      }),
    );

    if (next) {
      History.push(`/projects/${Number(next)}?target=information`);
    }
    sessionStorage.removeItem('next');
  }
  yield put(authActions.setResponseUser({ error: data.error, message: data.message }));
}

export function* handleLoginByOtp(action) {
  try {
    checkDeviceId();
    const deviceId = getCookie('device_id_iz');
    const sessionInfo = window.navigator.userAgent;
    const header = {};
    const { numberphone, otp } = action.payload;
    const body = {
      otp: otp,
      numberphone: numberphone,
    };
    const res = yield call(apiPost, `/ez/loginbyotp?device_id=${deviceId}&session_info=${sessionInfo}`, body, header);
    const { error, data, message } = res;
    const next = sessionStorage.getItem('next');

    if (error === 0) {
      yield put(
        authActions.loginByOtp({
          id: data.id,
          token: data.token,
          username: data.username,
          refreshToken: data.refresh_token,
          refreshToken_time: data.token_exp_time,
        }),
      );

      if (next) {
        yield History.push(`/projects/${Number(next)}?target=information`);
      } else {
        yield History.push('/home');
      }
      sessionStorage.removeItem('next');
    } else {
      yield put(
        authActions.loginByOtpFail({
          login: {
            error: error,
            message: message,
          },
        }),
      );
    }
  } catch {}
}

export function* handleLogout() {
  try {
    const { id, token } = getLocalStorage('persist:user', 'auth');
    const res = yield call(
      apiPost,
      '/ez/logout',
      {},
      {
        userid: id,
        token: token,
      },
    );

    const { error } = res;
    if (error === 0) {
      yield put(authActions.logoutSuccess());
      yield put(coinActions.resetAllFieldOfCoin()); // reset all field coin
      yield put(projectActions.resetAllFieldProject()); // reset all field project
      yield put(stakeActions.resetAllFieldOfStake()); // reset all field stake
      yield put(walletActions.resetAllFieldOfWallet()); // reset all field wallet

      yield put(rechargeActions.resetAllFieldRecharge());
      yield put(profileActions.resetAllFieldOfProfile());
      yield put(transactionActions.resetAllFieldOfTransaction());
      yield put(p2pActions.resetAllFieldOfP2P());

      yield History.push('/');
    } else if (error === 2) {
      yield put(authActions.setIsAuthen());
    }
  } catch {}
}
export function* authSaga() {
  yield takeLatest(authActions.requestGetOtp.type, handleGetOtp);
  yield takeLatest(authActions.requestLoginByTelegram.type, handleLoginByTelegram);
  yield takeLatest(authActions.requestLoginByOtp.type, handleLoginByOtp);
  yield takeLatest(authActions.requestLogout.type, handleLogout);

  // login by telegram
  yield takeLatest(authActions.requestLoginDirectlyTelegram.type, loginDirectlyByTelegram);
}
