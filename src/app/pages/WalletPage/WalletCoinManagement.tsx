import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, createStyles } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import CoinManagement from './components/CoinManagement';
import { Frame } from 'app/layouts/Frame';
import { walletActions } from 'store/slice/wallet';
import { selectResponseWallet, selectWalletTotalCoin } from 'store/slice/wallet/selectors';
import Loading from 'app/components/Loading/Loading';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { images } from 'assets/images';
import ExchangeRate from './components/ExchangeRate';

export function WalletCoinManagement() {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const navigate = useNavigate();
  const { coinId } = useParams();

  const totalCoin = useSelector(selectWalletTotalCoin);
  const { loading } = useSelector(selectResponseWallet);
  const dispatch = useDispatch();

  useEffect(() => {
    if (coinId) {
      // Nếu thêm tiền thì nó ko fetching mà phải f5 (nhưng nếu fetching lại thì hơi kì)
      dispatch(walletActions.requestGetTotalCoin({ coinId }));
    }
  }, [coinId]);

  useEffect(() => {
    return () => {
      dispatch(walletActions.resetResponse());
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {t('wallet.Manage wallet/coin')} - {`${totalCoin?.coin_name}`}
        </title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Loading visible={loading} />
      <Frame
        titlePage={totalCoin?.coin_name}
        onMovePage={() => {
          navigate('/wallet');
        }}
        pb={40}
      >
        <Stack className={classes.stack}>
          <CoinManagement />
          <ExchangeRate />
        </Stack>
      </Frame>
    </>
  );
}

const makeStyles = createStyles(() => ({
  stack: {
    padding: '0 14px 20px 14px',
  },
}));
