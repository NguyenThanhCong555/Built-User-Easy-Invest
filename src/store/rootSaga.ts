import { all } from 'redux-saga/effects';
import { authSaga } from './slice/auth/saga';

import { projectSaga } from './slice/project/saga';
import { stakeSaga } from './slice/stake/saga';
import { coinSaga } from './slice/coin/saga';
import { walletSaga } from './slice/wallet/saga';
import { transactionSaga } from './slice/transaction/saga';
import { systemSaga } from './slice/system/saga';
import { rechargeSaga } from './slice/recharge/saga';
import { profileSaga } from './slice/profile/saga';
import { withdrawSaga } from './slice/withdraw/saga';
import { p2pSaga } from './slice/p2p/saga';

export default function* rootSaga() {
  yield all([
    projectSaga(),
    stakeSaga(),
    authSaga(),
    coinSaga(),
    walletSaga(),
    transactionSaga(),
    rechargeSaga(),
    systemSaga(),
    systemSaga(),
    profileSaga(),
    withdrawSaga(),
    p2pSaga(),
  ]);
}
