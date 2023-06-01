import { Avatar, Box, Center, Group, Stack, Text, createStyles } from '@mantine/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

import { MyButton } from 'app/components/Button/MyButton';
import { variable } from 'styles/variable';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddUsdt, selectErrorRechargeResponse } from 'store/slice/recharge/selector';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { RechargeRequest } from 'store/slice/recharge/request';
import { DEFAULT_USDT_ID, RECHARGE_MONEY_CODE } from 'constants/account';
import { rechargeActions } from 'store/slice/recharge';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';
import { dataBinanceAccount } from '../data';
import CopyToolTip from 'app/components/CopyToolTip/CopyToolTip';

type Props = {};

export const TransferInformationBinance = (props: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { classes } = useStyle();
  const dispatch = useDispatch();

  const usdt = useSelector(selectAddUsdt);
  const errorRecharge = useSelector(selectErrorRechargeResponse);

  notifications.show({
    withCloseButton: true,
    autoClose: 5000,
    title: t('RechargeWithBank.notificationTitle'),
    message: t('RechargeWithBank.notificationMessage'),
    color: 'green',
    className: 'small_1-bold',
    classNames: { title: classes.notificationTitle },
  });
  const handleCopyValue = (value: string) => {
    if (typeof value === 'number') value = String(value);

    navigator.clipboard.writeText(value);
  };

  const moveToRecharge = () => {
    dispatch(rechargeActions.resetAddUsdt());
    navigation('/recharge');
  };

  const moveToRechargeHistory = () => {
    navigation('/recharge/history');
  };

  return (
    <>
      <Center>
        <Stack align="center" spacing={14}>
          <Text className="body_2-medium">QR code</Text>
          <Avatar src={dataBinanceAccount?.QRCode} w={150} h={150} />
        </Stack>
      </Center>

      <Text className="small_6-regular" c={'var(--grey-black'} mt={24} mb={2}>
        {t('RechargeWithBank.receiverAccount')}
      </Text>
      <Group w={'100%'} noWrap spacing={10}>
        <Avatar src={dataBinanceAccount?.avatarBank} w={54} h={54} className={classes.avatarBank} />
        <Stack w={'100%'} spacing={2}>
          <Text className="small_6-regular" c={'var(--grey-black'}>
            {dataBinanceAccount?.bankName}
          </Text>
          <Text className="small_1-bold">{dataBinanceAccount?.nameReceiver}</Text>
          <Group position="apart" w={'100%'}>
            <Text className="small_4-bold">{dataBinanceAccount?.accountNumber}</Text>
            <CopyToolTip text={dataBinanceAccount?.accountNumber ?? ''} />
          </Group>
        </Stack>
      </Group>
      {/* money */}
      <Text className="small_6-regular" c={'var(--grey-black'} mt={16} mb={2}>
        {t('RechargeWithBank.amountToTransfer')}
      </Text>
      <Group position="apart" w={'100%'}>
        <Text className="small_1-bold">{numberWithCommas(Number(usdt).toFixed(3))} USDT</Text>
        <CopyToolTip text={usdt} />
      </Group>
      {/* content banking */}
      <Text className="small_6-regular" c={'var(--grey-black'} mt={16} mb={2}>
        {t('RechargeWithBank.contentBanking')}
      </Text>
      <Group position="apart" w={'100%'}>
        <Text className="small_1-bold">AB12NSK2</Text>
        <CopyToolTip text={'AB12NSK2'} />
      </Group>

      {/* instruct */}
      <Stack className={classes.instruct}>
        <Text className="small_6-regular" c={'var(--grey-black)'}>
          {t('RechargeWithBank.instructBinance')}
        </Text>
        <Text className="small_6-regular" c={'var(--grey-black)'}>
          {t('RechargeWithBank.note1')}
          <Text span className="small_4-bold" c={'var(--grey-black)'}>
            {t('RechargeWithBank.note2')}
          </Text>
          {t('RechargeWithBank.note3')}{' '}
          <Text span className="small_4-bold" c={'var(--grey-black)'}>
            {t('RechargeWithBank.note4')}
          </Text>
          {t('RechargeWithBank.note5')}
        </Text>
      </Stack>

      <Box className={classes.whiteSpace}></Box>

      <Group className={classes.groupButtonContinue} noWrap>
        <OutlineButton onClick={moveToRecharge} w="calc(100% - 4px)" h={44}>
          {t('RechargeWithBank.rechargeContinue')}
        </OutlineButton>

        <MyButton onClick={moveToRechargeHistory} w="calc(100% - 4px)" width_mobile="calc(100% - 4px)" h={44}>
          {t('RechargeWithBank.rechargeHistory')}
        </MyButton>
      </Group>
    </>
  );
};

const useStyle = createStyles(() => ({
  avatarBank: {
    border: `0.5px solid var(--grey-light)`,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    minWidth: '54px',
    minHeight: '54px',
  },

  instruct: {
    // spacing={14} w={'100%'} p={'10px 12px'}
    width: '100%',
    gap: 14,
    padding: '10px 12px',
    background: 'var(--primary-4)',
    border: `1px solid var(--primary-4)`,
    borderRadius: '8px',
    marginTop: '32px',
  },

  groupButtonContinue: {
    width: '100%',
    padding: '10px 16px',
    marginTop: '40px',

    '@media (max-width : 576px)': {
      position: 'fixed',
      bottom: 0,
      left: 0,
      background: variable.neutral.whiteLight,
    },
  },

  whiteSpace: {
    '@media (max-width : 576px)': {
      paddingBottom: '40px',
      paddingTop: '40px',
    },
  },

  notificationTitle: {
    fontWeight: 700,
    fontSize: '16px',
  },
}));
