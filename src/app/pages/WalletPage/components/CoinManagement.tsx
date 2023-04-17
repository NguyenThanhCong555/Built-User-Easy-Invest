import React from 'react';
import { TButtonWallet } from '../type';

import { ReactComponent as ConvertCard } from 'assets/icons/wallet/convert-card.svg';
import { ReactComponent as History } from 'assets/icons/wallet/history.svg';
import { Flex, Stack, Text, createStyles } from '@mantine/core';
import ButtonsWallet from './ButtonsWallet';
import { variable } from 'styles/variable';
// import { formatCurrency } from 'utils/formatCurrency';
import { useLocation } from 'react-router-dom';
import { formatCoinUS } from 'utils/helpers/formatCoinUs';

interface CoinManagementProps {
  data: string | number;
}

const CoinManagement = ({ data }: CoinManagementProps) => {
  const { classes } = makeStyles();
  const { state } = useLocation();

  const dataBtn: TButtonWallet[] = [
    {
      id: 1,
      icon: <ConvertCard />,
      title: 'Chuyển',
      path: '/',
    },
    {
      id: 2,
      icon: <History />,
      title: 'Lịch sử',
      path: 'transaction',
    },
  ];

  return (
    <Stack className={classes.stack}>
      <Flex className={classes.flex}>
        <Text className={classes.title}>{formatCoinUS(Number(data))}</Text>
        <Text className={classes.subtitle}>~ {formatCoinUS(Number(data))} USDT</Text>
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
    fontSize: 32,
    fontWeight: 500,
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 500,
    color: variable.primary.primary4,
  },
}));

export default CoinManagement;
