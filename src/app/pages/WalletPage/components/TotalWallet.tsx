import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Center, createStyles, Flex, Image, Stack, Text } from '@mantine/core';
import { variable } from 'styles/variable';
import ButtonsWallet from './ButtonsWallet';
import { useDispatch, useSelector } from 'react-redux';

import { formatCurrency } from 'utils/formatCurrency';

import coinUSDT from 'assets/icons/coin/usdt.svg';

import { ReactComponent as MoneyReceive } from 'assets/icons/wallet/money-receive.svg';
import { ReactComponent as MoneySend } from 'assets/icons/wallet/money-send.svg';
import { ReactComponent as History } from 'assets/icons/history.svg';
import { ReactComponent as ConvertCard } from 'assets/icons/wallet/convert-card.svg';
import { TButtonWallet } from '../type';
import { useParams } from 'react-router-dom';
import { walletActions } from 'store/slice/wallet';
import { useTranslation } from 'react-i18next';

export interface IpropsData {
  data: any;
}

const TotalWallet = (props: IpropsData) => {
  const { classes } = makeStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dataBtn: TButtonWallet[] = [
    {
      id: 1,
      icon: <MoneyReceive />,
      title: t('wallet.Recharge'),
      path: '/recharge',
    },
    {
      id: 2,
      icon: <ConvertCard />,
      title: t('wallet.Transfer money'),
      path: '/transfer/transfer-by-phone',
    },
    {
      id: 3,
      icon: <MoneySend />,
      title: t('wallet.Withdraw money'),
      path: '/withdraw',
    },
    {
      id: 4,
      icon: <History />,
      title: t('wallet.History'),
      path: `/wallet/history`,
    },
  ];
  const resData = props?.data?.filter((value, index) => {
    return value?.coin_name === 'USDT';
  });

  return (
    <Stack className={classes.stack}>
      <Flex className={classes.flex}>
        <Flex w={'fit-content'} align={'center'} justify={'center'}>
          <Image src={coinUSDT} mr={4} />
          <Text className={classes.title}>&nbsp;USDT</Text>
        </Flex>
        <Text className={classes.title2}> {formatCurrency(resData[0]?.balance ?? 0)}</Text>
      </Flex>

      <ButtonsWallet data={dataBtn} />
    </Stack>
  );
};

const makeStyles = createStyles(() => ({
  stack: {
    backgroundColor: variable.primary.primary2,
    minHeight: 131,
    borderRadius: 14,
    marginTop: 12,
    position: 'relative',
  },

  flex: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 700,
    color: '#fff',
    maxWidth: '90%',
    textAlign: 'center',
  },
  title2: {
    fontSize: 32,
    fontWeight: 500,
    lineHeight: 1.2,
    color: '#fff',
    maxWidth: '90%',
    textAlign: 'center',
    marginBottom: '12px',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 500,
    color: variable.primary.primary4,
    maxWidth: '90%',
    textAlign: 'center',
  },
}));

export default TotalWallet;
