/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Wrapper from './components/Wrapper/Wrapper';
import { HomePage } from './pages/HomePage/Loadable';

import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { Stake, StakeCoin, StakeCoinManagement, StakeManagement, StakedCoinDetail, StakedDetail } from './pages/Staking/Loadable';
import { LoginPage, Telephone } from './pages/LoginPage/Loadable';
import PrivateRouter from 'routes/PrivateRouter';
import PublicRouter from 'routes/PublicRouter';
import {
  WalletCoinHistory,
  WalletCoinManagement,
  WalletCoinTransactionManagement,
  WalletEndTransactionDetails,
  WalletPage,
  WalletTransactionDetail,
} from './pages/WalletPage/Loadable';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, selectLanguage } from 'store/slice/auth/selectors';
import ModalAuthen from './components/Modal/ModalAuthen';
import { LoginByTelegram } from './pages/LoginPage/LoginByTelegram';
import FilterProvider from './pages/WalletPage/components/FilterContext/FilterProvider';
import { useTranslation } from 'react-i18next';
import { SimpleProject } from './pages/Projects/Loadable';
import Loading from './components/Loading/Loading';
import { selectLoadingStakingBook } from 'store/slice/stake/selector';
import { selectSystemError } from 'store/slice/system/selector';
import { systemActions } from 'store/slice/system';
import {
  ChooseMethodRecharge,
  DetailHistoryRecharge,
  EditRechargeWithBank,
  EditRechargeWithBinance,
  HistoryRecharge,
  RechargeWithBank,
  RechargeWithBinance,
} from './pages/RechargeUSDT/Loadable';
import { EntryUSDT } from './pages/RechargeUSDT/RechargeWithBank/EntryUSDT';
import { ChooseBank } from './pages/RechargeUSDT/RechargeWithBank/ChooseBank';
import { TransferInformation } from './pages/RechargeUSDT/RechargeWithBank/TransferInformation';
import { Profile } from './pages/Profile/Loadable';
import { TransferCoinByPhone, TransferUSDTByPhone } from './pages/Transfer/Loadable';
import { EntryUSDTBinance } from './pages/RechargeUSDT/RechargeWithBinance/EntryUSDTBinance';
import { TransferInformationBinance } from './pages/RechargeUSDT/RechargeWithBinance/TransferInformationBinance';
import { EditEntryUSDT } from './pages/RechargeUSDT/EditRechargeCommand/RechargeWithBank/EntryUSDT';
import { EditChooseBank } from './pages/RechargeUSDT/EditRechargeCommand/RechargeWithBank/ChooseBank';
import { EditTransferInformation } from './pages/RechargeUSDT/EditRechargeCommand/RechargeWithBank/TransferInformation';
import { EditEntryUSDTBinance } from './pages/RechargeUSDT/EditRechargeCommand/RechargeWithBinance/EntryUSDTBinance';
import { EditTransferInformationBinance } from './pages/RechargeUSDT/EditRechargeCommand/RechargeWithBinance/TransferInformationBinance';
import {
  ChooseMethodWithdraw,
  ConfirmGameWithdraw,
  ConfirmWithdraw,
  DetailHistoryWithdraw,
  EditConfirmWithdraw,
  EditEntryUSDTWithdraw,
  EntryUSDTWithdraw,
  HistoryWithdraw,
  WithdrawToGameID,
} from './pages/Withdraw/Loadable';
import ModalSystemError from './components/Modal/ModalSystemError';
import { P2PCoin } from './pages/P2PCoin/Loadable';
import { ChoosePolicy, Policy, Terms } from './pages/PolicyAndTerms/Loadable';
import {
  InstructionRecharge,
  InstructionStakingCoin,
  InstructionStakingUSDT,
  InstructionTransferCoin,
  InstructionWithdraw,
} from './pages/Instruction/Loadable';

export function App() {
  const { isAuthen } = useSelector(selectAuth);
  const { i18n } = useTranslation();
  const language = useSelector(selectLanguage);
  const systemError = useSelector(selectSystemError);

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, []);

  return (
    <>
      <ModalAuthen isOpen={isAuthen} />
      <ModalSystemError isOpen={systemError} />
      <Routes>
        <Route path="/login-telegram" element={<LoginByTelegram />} />
        <Route element={<PublicRouter />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/telephone" element={<Telephone />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route element={<Wrapper />}>
            <Route path="/home" element={<HomePage />} />
            {/* project */}
            <Route path="/projects/:projectId" element={<SimpleProject />}></Route>
            {/* stake */}
            <Route path="/projects/stakes/:projectId" element={<Stake />}></Route>
            <Route path="/stake-management" element={<StakeManagement />}></Route>
            <Route path="/stake/info/:stakingId" element={<StakedDetail />} />

            {/* stake coin */}
            <Route path="/projects/stakes-coin/:projectId" element={<StakeCoin />}></Route>
            <Route path="/stake-coin-management" element={<StakeCoinManagement />}></Route>
            <Route path="/stake-coin/info/:stakingId" element={<StakedCoinDetail />} />

            <Route path="*" element={<NotFoundPage />} />
            {/* Wallet */}
            <Route path="/wallet">
              <Route path="info-project/:transactionId" element={<WalletEndTransactionDetails />} />
              <Route index element={<WalletPage />} />
              <Route path="coin/:coinId">
                <Route index element={<WalletCoinManagement />} />
                {/* P2P Coin */}
                <Route path="p2p" element={<P2PCoin />} />
                {/* withdraw coin to game */}
                <Route path="withdraw" element={<WithdrawToGameID />} />
                <Route path="withdraw/confirm" element={<ConfirmGameWithdraw />}></Route>
              </Route>
              <Route
                path="history"
                element={
                  <FilterProvider>
                    <WalletCoinHistory />
                  </FilterProvider>
                }
              />
              <Route
                path="coin/:coinId/transaction"
                element={
                  <FilterProvider>
                    <WalletCoinTransactionManagement />
                  </FilterProvider>
                }
              />
              <Route path="transaction/detail/:transactionId" element={<WalletTransactionDetail />} />
            </Route>

            {/* recharge USDT */}
            <Route path="/recharge">
              <Route index element={<ChooseMethodRecharge />}></Route>
              <Route path="bank" element={<RechargeWithBank />}>
                <Route index element={<EntryUSDT />}></Route>
                <Route path="choose" element={<ChooseBank />}></Route>
                <Route path="complete" element={<TransferInformation />}></Route>
              </Route>
              <Route path="binance" element={<RechargeWithBinance />}>
                <Route index element={<EntryUSDTBinance />}></Route>
                <Route path="complete" element={<TransferInformationBinance />}></Route>
              </Route>
              <Route path="history" element={<HistoryRecharge />}></Route>
              <Route path="history/detail/:detailRechargeId" element={<DetailHistoryRecharge />}></Route>
              {/* edit */}
              <Route path="edit/bank" element={<EditRechargeWithBank />}>
                <Route path=":detailRechargeId" element={<EditEntryUSDT />}></Route>
                <Route path="choose/:detailRechargeId" element={<EditChooseBank />}></Route>
                <Route path="complete/:detailRechargeId" element={<EditTransferInformation />}></Route>
              </Route>
              <Route path="edit/binance" element={<EditRechargeWithBinance />}>
                <Route path=":detailRechargeId" element={<EditEntryUSDTBinance />}></Route>
                <Route path="complete/:detailRechargeId" element={<EditTransferInformationBinance />}></Route>
              </Route>
            </Route>

            {/* withdraw */}
            <Route path="/withdraw">
              <Route index element={<ChooseMethodWithdraw />}></Route>
              <Route path="entry" element={<EntryUSDTWithdraw />}></Route>
              <Route path="confirm" element={<ConfirmWithdraw />}></Route>
              <Route path="history" element={<HistoryWithdraw />}></Route>
              <Route path="history/detail/:detailWithdrawId" element={<DetailHistoryWithdraw />}></Route>
              {/* edit */}
              <Route path="edit/entry/:detailWithdrawId" element={<EditEntryUSDTWithdraw />}></Route>
              <Route path="edit/confirm/:detailWithdrawId" element={<EditConfirmWithdraw />}></Route>
            </Route>

            {/* Profile */}
            <Route path="profile" element={<Profile />} />

            {/* Transfer */}
            <Route path="/transfer">
              <Route path="transfer-by-phone" element={<TransferUSDTByPhone />} />
              <Route path="transfer-by-phone/:coinId" element={<TransferCoinByPhone />} />
            </Route>

            <Route path="/policy-terms" element={<ChoosePolicy />}></Route>
            <Route path="/policy" element={<Policy />}></Route>
            <Route path="/terms" element={<Terms />}></Route>

            {/* Instruction Page */}
            <Route path="/instruction">
              <Route path="recharge" element={<InstructionRecharge />} />
              <Route path="withdraw" element={<InstructionWithdraw />} />
              <Route path="staking-usdt" element={<InstructionStakingUSDT />} />
              <Route path="staking-coin" element={<InstructionStakingCoin />} />
              <Route path="transfer-coin" element={<InstructionTransferCoin />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
