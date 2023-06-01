import { Avatar, Box, Divider, Group, Modal, Stack, Text, createStyles } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import ConvertDate from 'helpers/formatDate';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  selectAddBinanceId,
  selectAddCoinToGame,
  selectAddGameId,
  selectAddUsdt,
  selectErrorWithdrawResponse,
  selectWithdrawFee,
} from 'store/slice/withdraw/selector';
import OtpInput from './OtpInput';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';
import { ConfirmAskPopup } from 'app/components/Popup/ConfirmAskPoppup';
import { withdrawActions } from 'store/slice/withdraw';
import { TransactionSuccess } from 'app/components/Popup/TransactionSuccess';

import { ReactComponent as IconSuccess } from 'assets/icons/notification/success.svg';
import { selectWalletTotalCoin } from 'store/slice/wallet/selectors';
import { selectListProjectDetail } from 'store/slice/project/selector';
import { handleGetProjectDetail } from 'app/pages/Staking/utils';
import ModalSuccess from 'app/components/Modal/ModalSuccess';
import { selectProfile } from 'store/slice/profile/selector';

type Props = {};

export const ConfirmOTP = (props: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { classes } = useStyle();
  const { coinId } = useParams();

  const amount = useSelector(selectAddCoinToGame);
  const gameId = useSelector(selectAddGameId);
  const responseErrorWithdraw = useSelector(selectErrorWithdrawResponse);
  const walletTotalCoin = useSelector(selectWalletTotalCoin);
  const listProjectDetail = useSelector(selectListProjectDetail);
  const profile = useSelector(selectProfile);

  const getProjectDetail = useCallback(handleGetProjectDetail, []);
  const projectDetail = getProjectDetail(listProjectDetail, Number(walletTotalCoin.project_id));

  useEffect(() => {
    if (amount === '' || gameId === '') {
      navigation('/wallet/coin/${coinId}');
      return;
    }
  }, []);

  const moveToChooseMethodWithdraw = () => {
    navigation(`/wallet/coin/${coinId}/withdraw`);
  };

  const handleCancelPopup = () => {
    dispatch(withdrawActions.resetResponseErrorWithdraw());
    dispatch(withdrawActions.resetAddCoinToGame());
    dispatch(withdrawActions.resetAddGameId());

    navigation(`/wallet/coin/${coinId}`);
  };

  return (
    <>
      <Frame onMovePage={moveToChooseMethodWithdraw} titlePage={t('Withdraw.titlePage')}>
        <Box px={16} mt={14}>
          <Group position="center" className={classes.titleInformation}>
            <Text className="body_4-bold" color="var(--white)">
              {t('Withdraw.informationTransaction')}
            </Text>
          </Group>
          <Stack p={'14px 8px 8px'} spacing={6} className={classes.informationContent}>
            <Group spacing={6}>
              <Avatar src={profile.avatar} miw={46} mih={46} radius={100} />
              <Stack spacing={0}>
                <Text className="body_4-bold" c={'var(--black)'}>
                  {profile.name}
                </Text>
                <Text className="small_3-regular" c={'var(--grey-black'}>
                  {profile.phone_number}
                </Text>
              </Stack>
            </Group>

            <Divider py={6} />

            <Group position="apart">
              <Text className="small_2-medium">{t('Withdraw.amount')}</Text>
              <Text className="small_2-medium">{numberWithCommas(amount)}</Text>
            </Group>
            <Group position="apart">
              <Text className="small_2-medium">ID game:</Text>
              <Text className="small_2-medium">{gameId}</Text>
            </Group>
            <Group position="apart">
              <Text className="small_2-medium">Game:</Text>
              <Text className="small_2-medium">{projectDetail?.name}</Text>
            </Group>
            <Group position="apart">
              <Text className="small_2-medium">{t('Withdraw.tradingTime')}</Text>
              <Text className="small_2-medium">{ConvertDate.getDDMMYY(new Date())}</Text>
            </Group>
          </Stack>

          <OtpInput />
        </Box>
      </Frame>

      <ModalSuccess
        opened={responseErrorWithdraw === RESPONSE_SUCCESS_ERROR}
        setOpened={handleCancelPopup}
        onClose={handleCancelPopup}
        title={t('CoinToGameId.popupSuccessWithdraw')}
      ></ModalSuccess>
    </>
  );
};

const useStyle = createStyles(() => ({
  titleInformation: {
    borderRadius: '8px 8px 0 0',
    background: 'var(--primary-2)',
    padding: '11px 10px',
  },

  informationContent: {
    border: `1px solid var(--grey-light)`,
    boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.15)`,
    borderRadius: '0 0 8px 8px',
  },
}));
