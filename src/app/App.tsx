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
import { ProjectInformation } from './pages/Projects/ProjectDetail';
import { Stake, StakeManagement, StakingClosed } from './pages/Staking/Loadable';
import { LoginPage, Telephone } from './pages/LoginPage/Loadable';
import PrivateRouter from 'routes/PrivateRouter';
import PublicRouter from 'routes/PublicRouter';
import { WalletCoinManagement, WalletCoinTransactionManagement, WalletPage } from './pages/WalletPage/Loadable';
import { useSelector } from 'react-redux';
import { selectAuth, selectLanguage } from 'store/slice/auth/selectors';
import ModalAuthen from './components/Modal/ModalAuthen';
import { LoginByTelegram } from './pages/LoginPage/LoginByTelegram';
import FilterProvider from './pages/WalletPage/components/FilterContext/FilterProvider';
import { useTranslation } from 'react-i18next';

export function App() {
  const { isAuthen } = useSelector(selectAuth);
  const { i18n } = useTranslation();
  const language = useSelector(selectLanguage);

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, []);

  return (
    <>
      <ModalAuthen isOpen={isAuthen} />
      <Routes>
        <Route path="/login-telegram" element={<LoginByTelegram />} />
        <Route element={<PublicRouter />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/telephone" element={<Telephone />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route element={<Wrapper />}>
            <Route path="/home" element={<HomePage />} />
            {/* project detail */}
            <Route path="/projects/detail/:projectId" element={<ProjectInformation />}></Route>
            {/* stake */}
            <Route path="/stake/:projectId" element={<Stake />}></Route>
            <Route path="/stake-management" element={<StakeManagement />}></Route>
            <Route path="/stake/info/:stakingId" element={<StakingClosed />} />

            <Route path="*" element={<NotFoundPage />} />
            {/* Wallet */}
            <Route path="/wallet">
              <Route index element={<WalletPage />} />
              <Route path="coin/:coinId" element={<WalletCoinManagement />} />
              <Route
                path="coin/:coinId/transaction"
                element={
                  <FilterProvider>
                    <WalletCoinTransactionManagement />
                  </FilterProvider>
                }
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
