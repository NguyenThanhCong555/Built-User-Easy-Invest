import { Box, Divider, Group, Modal, Stack, Text, createStyles } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import ConvertDate from 'helpers/formatDate';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAddBinanceId, selectAddUsdt, selectErrorWithdrawResponse, selectWithdrawFee } from 'store/slice/withdraw/selector';
import OtpInput from './EditOtpInput';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';
import { ConfirmAskPopup } from 'app/components/Popup/ConfirmAskPoppup';
import { withdrawActions } from 'store/slice/withdraw';
import { TransactionSuccess } from 'app/components/Popup/TransactionSuccess';

import { ReactComponent as IconSuccess } from 'assets/icons/notification/success.svg';

type Props = {};

export const EditConfirmOTP = (props: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { classes } = useStyle();
  const { detailWithdrawId } = useParams();

  const usdt = useSelector(selectAddUsdt);
  const binanceId = useSelector(selectAddBinanceId);
  const withdrawFee = useSelector(selectWithdrawFee);
  const responseErrorWithdraw = useSelector(selectErrorWithdrawResponse);

  const moveToChooseMethodWithdraw = () => {
    navigation(`/withdraw/edit/entry/${detailWithdrawId}`);
  };

  const handleCancelPopup = () => {
    dispatch(withdrawActions.resetResponseErrorWithdraw());
    dispatch(withdrawActions.resetAddUsdt());
    dispatch(withdrawActions.resetAddBinanceId());

    navigation('/withdraw');
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
            <Group position="apart">
              <Text className="small_2-medium">Pay ID:</Text>
              <Text className="small_2-medium">{binanceId}</Text>
            </Group>

            <Divider py={6} />

            <Group position="apart">
              <Text className="small_2-medium">{t('Withdraw.amount')}</Text>
              <Text className="small_2-medium">{numberWithCommas(usdt)}</Text>
            </Group>
            <Group position="apart">
              <Text className="small_2-medium">{t('Withdraw.transactionFee')}</Text>
              <Text className="small_2-medium">{numberWithCommas(withdrawFee)}</Text>
            </Group>
            <Group position="apart">
              <Text className="small_2-medium">{t('Withdraw.total')}</Text>
              <Text className="small_2-medium">{numberWithCommas(Number(usdt) + withdrawFee)}</Text>
            </Group>
            <Group position="apart">
              <Text className="small_2-medium">{t('Withdraw.tradingTime')}</Text>
              <Text className="small_2-medium">{ConvertDate.getDDMMYY(new Date())}</Text>
            </Group>
          </Stack>

          <OtpInput />
        </Box>
      </Frame>

      <Modal
        opened={responseErrorWithdraw === RESPONSE_SUCCESS_ERROR}
        onClose={() => dispatch(withdrawActions.resetResponseErrorWithdraw())}
        centered
        withCloseButton={false}
        padding={0}
        radius={20}
      >
        <ConfirmAskPopup
          content={
            <Stack spacing={24} align={'center'}>
              <IconSuccess />
              <Text ta={'center'} className="body-3_regular">
                {t('Withdraw.titlePopupSuccess')}
              </Text>
            </Stack>
          }
          onClose={handleCancelPopup}
          onCancel={handleCancelPopup}
          onSuccess={() => navigation('/withdraw/history')}
          cancelText={t('Withdraw.buttonContinueWithdraw')}
          successText={t('Withdraw.buttonHistoryWithdraw')}
        />
      </Modal>
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
