import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, createStyles } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import CoinManagement from './components/CoinManagement';
import { Frame } from 'app/layouts/Frame';
import { walletActions } from 'store/slice/wallet';
import { selectResponseWallet, selectWalletTotalCoin } from 'store/slice/wallet/selectors';
import Loading from 'app/components/Loading/Loading';

export function WalletCoinManagement() {
  const { classes } = makeStyles();
  const navigate = useNavigate();
  const { coinId } = useParams();

  const { balance, coin_name } = useSelector(selectWalletTotalCoin);
  const { loading } = useSelector(selectResponseWallet);
  const dispatch = useDispatch();

  useEffect(() => {
    if (coinId) dispatch(walletActions.requestGetTotalCoin({ coinId }));

    return () => {
      dispatch(walletActions.resetResponse());
    };
  }, [coinId]);

  return (
    <>
      <Loading visible={loading} />
      <Frame
        titlePage={coin_name}
        onMovePage={() => {
          navigate('/wallet');
        }}
        pb={40}
      >
        <Stack className={classes.stack}>
          <CoinManagement data={balance} />
        </Stack>
      </Frame>
    </>
  );
}

const makeStyles = createStyles(() => ({
  stack: {
    padding: '0 14px 40px 14px',
  },
}));
