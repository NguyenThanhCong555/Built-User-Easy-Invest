import React from 'react';
import { TButtonWallet } from '../type';

import { ReactComponent as ConvertCard } from 'assets/icons/wallet/convert-card.svg';
import { ReactComponent as History } from 'assets/icons/wallet/history.svg';
import { ReactComponent as Swap } from 'assets/icons/wallet/swap.svg';
import { ReactComponent as Withdraw } from 'assets/icons/wallet/withdraw.svg';
import { Avatar, Flex, Stack, Text, createStyles } from '@mantine/core';
import ButtonsWallet from './ButtonsWallet';
import { variable } from 'styles/variable';
// import { formatCurrency } from 'utils/formatCurrency';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { selectWalletTotalCoin } from 'store/slice/wallet/selectors';
import { useSelector } from 'react-redux';

interface CoinManagementProps {}

const CoinManagement = ({}: CoinManagementProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const { state } = useLocation();
  const { coinId } = useParams();

  const totalCoin = useSelector(selectWalletTotalCoin);

  const dataBtn: TButtonWallet[] = [
    {
      id: 1,
      icon: <ConvertCard />,
      title: t('wallet.Transfer'),
      path: `/transfer/transfer-by-phone/${coinId}`,
    },
    {
      id: 2,
      icon: <Swap />,
      title: 'P2P',
      path: 'p2p',
    },
    {
      id: 3,
      icon: <Withdraw />,
      title: t('wallet.Withdraw'),
      path: 'withdraw',
    },
    {
      id: 4,
      icon: <History />,
      title: t('wallet.History'),
      path: 'transaction',
    },
  ];

  /*
  1 USDT = 1500 TOSI
  0.01 USDT = 0.01/1500 TOSI
            = 0.00000666666 TOSI

*/

  return (
    <Stack className={classes.stack}>
      <Flex className={classes.flex}>
        <Flex className={classes.flexCoin}>
          <Avatar src={totalCoin?.coin_avatar} />
          <Text className={classes.titleCoin}>{totalCoin?.coin_name}</Text>
        </Flex>
        <Text className={classes.title}>{numberWithCommas(Number(totalCoin?.balance), 8)}</Text>
        {/* <Text className={classes.subtitle}>~ {numberWithCommas((Number(data) / rate).toFixed(2))} USDT</Text> */}
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
    marginBottom: 40,
  },

  flexCoin: {
    alignItems: 'center',
  },

  titleCoin: {
    fontSize: 20,
    fontWeight: 500,
    color: '#fff',
    marginLeft: 10,
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
