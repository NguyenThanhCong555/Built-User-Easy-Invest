import { ActionIcon, Avatar, Box, Center, Group, Stack, Text, createStyles } from '@mantine/core';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

import { MyButton } from 'app/components/Button/MyButton';
import { variable } from 'styles/variable';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddUsdt, selectChooseBankId, selectErrorRechargeResponse, selectListBank } from 'store/slice/recharge/selector';
import { TBank } from 'store/slice/recharge/types';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { EditRechargeRequest, RechargeRequest } from 'store/slice/recharge/request';
import { DEFAULT_USDT_ID, RECHARGE_MONEY_CODE } from 'constants/account';
import { rechargeActions } from 'store/slice/recharge';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';
import { ERROR_HAD_EXIST_REQUEST_RECHARGE } from 'store/slice/recharge/response';
import CopyToolTip from 'app/components/CopyToolTip/CopyToolTip';

type Props = {};

export const EditTransferInformation = (props: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { classes } = useStyle();
  const dispatch = useDispatch();
  const { detailRechargeId } = useParams();

  const listBank = useSelector(selectListBank);
  const ChooseBankingId = useSelector(selectChooseBankId);
  const usdt = useSelector(selectAddUsdt);
  const errorRecharge = useSelector(selectErrorRechargeResponse);

  const callbankGetBank = useCallback((listBank: TBank[], bankingId: number): TBank | undefined => {
    for (let [index, bank] of listBank.entries()) {
      if (bank.id === bankingId) return listBank[index];
    }

    return undefined;
  }, []);
  const GetListBank = useMemo(() => callbankGetBank(listBank, ChooseBankingId), []);

  useEffect(() => {
    notifications.show({
      withCloseButton: true,
      autoClose: 5000,
      title: t('RechargeWithBank.notificationTitle'),
      message: t('RechargeWithBank.notificationMessage'),
      color: 'green',
      className: 'small_1-bold',
      classNames: { title: classes.notificationTitle },
    });

    return () => {
      dispatch(rechargeActions.resetResponseErrorRecharge());
      dispatch(rechargeActions.resetLoadingRechargeUsdt());
    };
  }, [errorRecharge]);

  const moveToRecharge = () => {
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
          {/* <Avatar src={GetListBank?.QRCode} w={150} h={150} /> */}
        </Stack>
      </Center>

      <Text className="small_6-regular" c={'var(--grey-black'} mt={24} mb={2}>
        {t('RechargeWithBank.receiverAccount')}
      </Text>
      <Group w={'100%'} noWrap spacing={10}>
        <Avatar src={GetListBank?.banking_logo} w={54} h={54} className={classes.avatarBank} />
        <Stack w={'100%'} spacing={2}>
          <Text className="small_6-regular" c={'var(--grey-black'}>
            {GetListBank?.banking_name}
          </Text>
          <Text className="small_1-bold">{GetListBank?.account_name}</Text>
          <Group position="apart" w={'100%'}>
            <Text className="small_4-bold">{GetListBank?.account_number}</Text>
            <CopyToolTip text={GetListBank?.account_number ?? ''} />
          </Group>
        </Stack>
      </Group>
      {/* money */}
      <Text className="small_6-regular" c={'var(--grey-black'} mt={16} mb={2}>
        {t('RechargeWithBank.amountToTransfer')}
      </Text>
      <Group position="apart" w={'100%'}>
        <Text className="small_1-bold">{numberWithCommas(Number(usdt).toFixed(3))} VND</Text>
        <CopyToolTip text={usdt} />
      </Group>
      {/* content banking */}
      <Text className="small_6-regular" c={'var(--grey-black'} mt={16} mb={2}>
        {t('RechargeWithBank.contentBanking')}
      </Text>
      <Group position="apart" w={'100%'}>
        <Text className="small_1-bold">AB12NSK2</Text>
        <CopyToolTip text="AB12NSK2" />
      </Group>

      {/* instruct */}
      <Stack className={classes.instruct}>
        <Text className="small_6-regular" c={'var(--grey-black)'}>
          {t('RechargeWithBank.instruct')}
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
