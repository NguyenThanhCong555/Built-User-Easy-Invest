import { all } from 'redux-saga/effects';
import { authSaga } from './slice/auth/saga';

import { projectSaga } from './slice/project/saga';
import { stakeSaga } from './slice/stake/saga';
import { coinSaga } from './slice/coin/saga';
import { walletSaga } from './slice/wallet/saga';

export default function* rootSaga() {
  yield all([projectSaga(), stakeSaga(), authSaga(), coinSaga(), walletSaga()]);
}
