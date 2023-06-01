import React, { useCallback } from 'react';
import { Avatar, Box, Center, createStyles, Divider, Flex, Image, Stack, Text } from '@mantine/core';
import { primary, variable } from 'styles/variable';

import { ReactComponent as CoinUSDT } from 'assets/icons/coin/usdt.svg';
import { ReactComponent as MoneyReceive } from 'assets/icons/wallet/money-receive.svg';
import { ReactComponent as MoneySend } from 'assets/icons/wallet/money-send.svg';
import { ReactComponent as ConvertCard } from 'assets/icons/wallet/convert-card.svg';

import { formatCurrency } from 'utils/formatCurrency';
import { EResponseTransactions } from '../type';

import { useSelector } from 'react-redux';

interface HistoryTransactionItemProps {
  data: any;
  id: number | string;
}

const HistoryTransactionItem = ({ data, id }: HistoryTransactionItemProps) => {
  const { classes } = makeStyles();

  const renderImageTransaction = useCallback((image: string, service: string): JSX.Element => {
    switch (service) {
      case EResponseTransactions.Recharge:
        return <MoneyReceive />;
      case EResponseTransactions.Withdraw:
        return <MoneySend />;
      case EResponseTransactions.Transfer:
        return <ConvertCard />;
      default:
        return <Avatar src={image} />;
    }
  }, []);
  return (
    <Flex className={classes.flex}>
      <Box className={classes.box}>
        <Center className={classes.center}>
          <Flex sx={{ borderRadius: '60%', overflow: 'hidden' }} w={35} h={35}>
            {renderImageTransaction(data?.coin_avatar, data?.coin_id)}
          </Flex>
        </Center>
      </Box>
      <Stack className={classes.stack1}>
        <Text className={classes.title}>{data.coin_name}</Text>
      </Stack>

      <Stack className={classes.stack2}>
        <Flex className={classes.flexNumber}>
          <Text fz={16} fw={700} c={primary.primary2} mr={20}>
            {formatCurrency(data?.balance)}
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

const makeStyles = createStyles(() => ({
  flex: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'space-between',
    border: '1px solid #976FEA',
    borderRadius: '8px',
    boxShadow: '0 2px 0 0 #976FEA',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  box: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    marginLeft: '8px',
  },

  stack1: {
    gap: 0,
    flex: 1,
    flexShrink: 0,
    minWidth: 74,
  },

  stack2: {
    gap: 0,
    flexShrink: 0,
  },

  flexNumber: {
    justifyContent: 'flex-end',
    gap: 5,
  },

  title: {
    fontSize: 16,
    fontWeight: 700,
    color: '#000',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 500,
    color: variable.primary.primary4,
  },
  date: {
    fontSize: 12,
    fontWeight: 500,
    color: variable.neutral.grey,
    textAlign: 'end',
  },
  number: {
    fontSize: 16,
    fontWeight: 700,
    color: variable.secondary.secondary1,

    '@media (max-width: 768px)': {
      maxWidth: 74,
    },
  },

  minusNumber: {
    color: '#000',
    maxWidth: 400,

    '@media (max-width: 768px)': {
      maxWidth: 74,
    },
  },

  center: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    overflow: 'hidden',
    // backgroundColor: variable.primary.primary5,
  },
}));

export default HistoryTransactionItem;
