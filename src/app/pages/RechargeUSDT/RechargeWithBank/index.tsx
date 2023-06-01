import { Box, Group, createStyles, Text, Stack } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { selectOperationStep } from 'store/slice/recharge/selector';
import { CHOOSE_A_BANK_STEP, COMPLETE_STEP, START_STEP } from 'store/slice/recharge/types';

type Props = {};

export const RechargeWithBank = (props: Props) => {
  const { classes } = useStyle();
  const navigation = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  const step = useSelector(selectOperationStep);

  const moveToRechargeUSDT = () => {
    if (location.pathname === '/recharge/bank/complete') {
      navigation('/recharge');
      return;
    }

    if (location.pathname === '/recharge/bank') {
      navigation('/recharge');
      return;
    }

    navigation(-1);
  };

  return (
    <Frame titlePage={t('RechargeWithBank.titlePage')} onMovePage={moveToRechargeUSDT}>
      <Group w={'100%'} spacing={0} noWrap position="center" mt={14} mb={28}>
        <Stack
          className={classes.slipPath}
          style={{ transform: 'translateX(15px)' }}
          bg={step === START_STEP ? '#5D3BA4' : 'var(--light)'}
          c={step === START_STEP ? 'var(--white)' : 'var(--black)'}
        >
          <Text className="small_4-bold">{t('RechargeWithBank.step1')}</Text>
        </Stack>
        <Stack
          className={classes.slipPath}
          bg={step === CHOOSE_A_BANK_STEP ? '#5D3BA4' : 'var(--light)'}
          c={step === CHOOSE_A_BANK_STEP ? 'var(--white)' : 'var(--black)'}
        >
          <Text className="small_4-bold">{t('RechargeWithBank.step2')}</Text>
        </Stack>
        <Stack
          className={classes.slipPath}
          style={{ transform: 'translateX(-15px)' }}
          bg={step === COMPLETE_STEP ? '#5D3BA4' : 'var(--light)'}
          c={step === COMPLETE_STEP ? 'var(--white)' : 'var(--black)'}
        >
          <Text className="small_4-bold">{t('RechargeWithBank.step3')}</Text>
        </Stack>
      </Group>

      <Box px={16}>
        <Outlet />
      </Box>
    </Frame>
  );
};

const useStyle = createStyles(theme => ({
  slipPath: {
    width: 175,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    clipPath: ' polygon(85% 0, 100% 50%, 85% 99%, 0% 100%, 15% 52%, 0% 0%)',
  },
}));
