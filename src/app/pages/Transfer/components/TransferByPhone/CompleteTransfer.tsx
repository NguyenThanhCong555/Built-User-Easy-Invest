import React, { useLayoutEffect, useState } from 'react';
import { Center, Flex, Group, Stack, Text, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { MyButton } from 'app/components/Button/MyButton';
import { ReactComponent as IconSuccess } from 'assets/icons/modal/icon-success.svg';
import { UseFormReturnType } from '@mantine/form';
import { useSelector } from 'react-redux';
import { selectUserSeeAllCoinsInWallet, selectWalletTotalCoin } from 'store/slice/wallet/selectors';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import ConvertDate from 'helpers/formatDate';
import { variable } from 'styles/variable';
import { useNavigate, useParams } from 'react-router-dom';

interface CompleteTransferProps {
  form: UseFormReturnType<any>;
  isTransferUSDT: boolean;
}

const CompleteTransfer = ({ form, isTransferUSDT }: CompleteTransferProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const { coinId } = useParams();
  const navigate = useNavigate();

  const data = useSelector(selectUserSeeAllCoinsInWallet);
  const totalCoin = useSelector(selectWalletTotalCoin);

  const [dataCoin, setDataCoin] = useState<any>(null);

  useLayoutEffect(() => {
    if (isTransferUSDT) {
      if (data) {
        const item = data?.find((item, _) => item?.coin_name === 'USDT');
        setDataCoin(item);
      }
    } else {
      if (totalCoin) {
        setDataCoin(totalCoin);
      }
    }
  }, [data, totalCoin]);

  return (
    <Stack className={classes.stack}>
      <Center className={classes.center}>
        <IconSuccess />
        <Text className={classes.textInfo}>
          {t('transfer.Successfully moved to')} <b>{form.values?.receiver_nick_name}</b>
        </Text>
        <Text className={classes.textInfo}>
          <b>({form.values?.receiver_phone})</b>
        </Text>
      </Center>

      <Stack className={classes.stackItem}>
        <Flex className={classes.flexItem}>
          <Text className={classes.text}>{t('transfer.Quantity')}:</Text>
          <Text className={classes.text}>
            {numberWithCommas(form.values?.exchange)} {dataCoin?.coin_name}
          </Text>
        </Flex>

        <Flex className={classes.flexItem}>
          <Text className={classes.text}>{t('transfer.Transfer fees')}:</Text>
          <Text className={classes.text}>0 {dataCoin?.coin_name}</Text>
        </Flex>

        <Flex className={classes.flexItem}>
          <Text className={classes.text}>{t('transfer.Total')}:</Text>
          <Text className={classes.text}>
            {numberWithCommas(form.values?.exchange)} {dataCoin?.coin_name}
          </Text>
        </Flex>

        <Flex className={classes.flexItem}>
          <Text className={classes.text}> {t('transfer.Content')}:</Text>
          <Text className={classes.text}>{form.values?.content}</Text>
        </Flex>

        <Flex className={classes.flexItem}>
          <Text className={classes.text}>{t('transfer.Transaction time')}:</Text>
          <Text className={classes.text}>{ConvertDate.getDDMMYY(new Date())}</Text>
        </Flex>
      </Stack>

      <Group className={classes.groupButtonStake}>
        <MyButton
          w="100%"
          width_mobile="100%"
          h={44}
          onClick={() => {
            if (isTransferUSDT) navigate('/wallet');
            else navigate(`/wallet/coin/${coinId}`);
          }}
        >
          {t('transfer.Complete')}
        </MyButton>
      </Group>
    </Stack>
  );
};

const makeStyles = createStyles(() => ({
  stack: {
    padding: '14px 30px 0 30px',

    '@media (max-width: 768px)': {
      padding: '14px 14px 0 14px',
    },
  },
  stackItem: {
    padding: 8,
    gap: 5,
  },
  center: {
    flexDirection: 'column',
    marginTop: 30,
  },
  flexItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  textInfo: {
    fontSize: 14,
    '&:first-of-type': {
      marginTop: 10,
    },
  },
  text: {
    fontSize: 14,
    fontWeight: 500,
  },

  groupButtonStake: {
    width: '100%',
    marginTop: 20,

    '@media (max-width : 576px)': {
      padding: '10px 16px',
      position: 'fixed',
      bottom: 0,
      left: 0,
      background: variable.neutral.whiteLight,
    },
  },
}));

export default CompleteTransfer;
