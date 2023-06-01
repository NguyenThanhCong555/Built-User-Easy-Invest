import { Flex, Stack, Text, createStyles } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectWalletTotalCoin } from 'store/slice/wallet/selectors';

interface ContentTransactionProps {
  form: UseFormReturnType<any>;
  type: number;
}

const ContentTransaction = ({ form, type }: ContentTransactionProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const totalCoin = useSelector(selectWalletTotalCoin);

  const [usdt, setUsdt] = useState<number | string>(0);
  const [fee, setFee] = useState<number | string>(0);
  const [total, setTotal] = useState<number | string>(0);

  // 1 - buy
  // 2 - sell
  useEffect(() => {
    if (totalCoin?.coin_id !== -1) {
      const USDT = form.values.quantity / totalCoin?.rate_usdt_coin;
      const fee = type === 1 ? totalCoin?.purchase_fee : totalCoin?.selling_fee;
      const feeTransaction = (USDT * fee) / 100;
      const totalTransaction = type === 1 ? USDT + feeTransaction : USDT - feeTransaction;

      setUsdt(numberWithCommas(USDT, 3));
      setFee(numberWithCommas(JSON.stringify(feeTransaction), 8));
      setTotal(numberWithCommas(JSON.stringify(totalTransaction), 8));
    }
  }, [form.values.quantity, totalCoin]);

  return (
    <Stack className={classes.stack}>
      <Flex className={classes.flex}>
        <Text className={classes.text}>{t('P2P.Into money')}:</Text>
        <Text className={classes.textCoin}>{usdt} USDT</Text>
      </Flex>
      <Flex className={classes.flex}>
        <Text className={classes.text}>{t('P2P.Transaction fee')}:</Text>
        <Text className={classes.textCoin}>{fee} USDT</Text>
      </Flex>
      <Flex className={classes.flex}>
        <Text className={classes.text}>{t('P2P.Total')}:</Text>
        <Text className={classes.textCoin}>{total} USDT</Text>
      </Flex>
    </Stack>
  );
};

const makeStyles = createStyles(() => ({
  stack: {
    gap: 0,
  },
  flex: {
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '4px 0',
  },
  text: {
    fontSize: 16,
    fontWeight: 700,
  },

  textCoin: {
    fontSize: 16,
    fontWeight: 700,
  },
}));

export default ContentTransaction;
