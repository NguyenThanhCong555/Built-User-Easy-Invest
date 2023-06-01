import React from 'react';
import { Flex, Text, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectWalletTotalCoin } from 'store/slice/wallet/selectors';

interface ExchangeRateProps {}

const ExchangeRate = ({}: ExchangeRateProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();

  const totalCoin = useSelector(selectWalletTotalCoin);

  return (
    <Flex className={classes.flex}>
      <Text className={classes.textExchange}>Tỷ giá:</Text>
      <Text className={classes.text}>
        1 USDT = {totalCoin?.rate_usdt_coin} {totalCoin?.coin_name}
      </Text>
    </Flex>
  );
};

const makeStyles = createStyles(() => ({
  flex: {
    marginTop: 40,
    padding: 12,
    border: '1px solid var(--grey-light)',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textExchange: {
    fontSize: 16,
    fontWeight: 700,
  },
  text: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--primary-2)',
  },
}));

export default ExchangeRate;
