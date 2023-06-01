import React, { useEffect } from 'react';
import { Stack, Text, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Frame } from 'app/layouts/Frame';
import { images } from 'assets/images';
import { useNavigate, useParams } from 'react-router-dom';
import P2PForm from './components/P2PForm';
import { useDispatch, useSelector } from 'react-redux';
import { walletActions } from 'store/slice/wallet';
import { selectWalletTotalCoin } from 'store/slice/wallet/selectors';
import Loading from 'app/components/Loading/Loading';
import { selectResponseWallet } from 'store/slice/wallet/selectors';

export function P2PCoin() {
  const { t } = useTranslation();
  const { classes } = makeStyles();

  const navigate = useNavigate();
  const { coinId } = useParams();
  const dispatch = useDispatch();

  const totalCoin = useSelector(selectWalletTotalCoin);
  const response = useSelector(selectResponseWallet);

  // Chưa tối ưu fetching
  useEffect(() => {
    if (coinId) {
      if (totalCoin?.coin_id !== Number(coinId)) dispatch(walletActions.requestGetTotalCoin({ coinId }));
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
        <title>P2P</title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Loading visible={response.loading} />

      <Frame
        titlePage={totalCoin?.coin_name}
        onMovePage={() => {
          navigate(`/wallet/coin/${coinId}`);
        }}
        pb={40}
      >
        <Stack className={classes.stack}>
          <P2PForm />
        </Stack>
      </Frame>
    </>
  );
}

const makeStyles = createStyles(() => ({
  stack: {
    padding: 14,
  },
}));
