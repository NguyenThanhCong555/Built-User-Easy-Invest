import { Flex, Stack, createStyles } from '@mantine/core';
import { NavContainer } from 'app/components/navigation/NavContainer';
import React, { useLayoutEffect, useState } from 'react';
import { media } from 'styles/media';
import TotalWallet from './components/TotalWallet';
import HistoryTransactionItem from './components/HistoryTransactionItem';
import HistoryTransaction from './components/HistoryTransaction';
import { walletActions } from 'store/slice/wallet';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserSeeAllCoinsInWallet } from 'store/slice/wallet/selectors';
import { Helmet } from 'react-helmet-async';
import { images } from 'assets/images';
import { useTranslation } from 'react-i18next';

interface InPropsStyle {}
export const WalletPage = () => {
  const { classes: c } = createStyleProps({});
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const data = useSelector(selectUserSeeAllCoinsInWallet);
  useLayoutEffect(() => {
    dispatch(walletActions.request_SeeAllCoinsInWallet(true));
  }, []);
  return (
    <>
      <Helmet>
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
        <title>Easy Invest</title>
      </Helmet>
      <Flex className={c.boxWallet}>
        <NavContainer backRole="/" laberHeader={t('Header.Manage Wallet')}>
          <Stack className={c.stack}>
            <TotalWallet data={data} />
            <HistoryTransaction data={data} />
          </Stack>
        </NavContainer>
      </Flex>
    </>
  );
};
const createStyleProps = createStyles((theme, params: InPropsStyle) => ({
  boxWallet: { marginTop: '14px', [`${media.small()}`]: { '&': { marginTop: '0px' } } },
  stack: {
    width: '100%',
    marginTop: '0px',
    '.mantine-h607hx': {
      marginTop: '50px',
    },
  },
}));
