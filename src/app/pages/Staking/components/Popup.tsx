import React from 'react';
import { Stack, createStyles, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { Accumulation } from './Accumulation';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { variable } from 'styles/variable';
import { MyButton } from 'app/components/Button/MyButton';

import { ReactComponent as IconCoin } from 'assets/icons/coin/coin.svg';
import { ReactComponent as IconUSDT } from 'assets/icons/coin/usdt.svg';

type PopupPaymentConfirmationProps = {
  nameProjects: string;
  author: string;
  RatePerYears: string;
  staking: number;
  intoMoney: string;
  reinvestment: string;
  tradingTime: string;
  loading?: boolean;
  onConfirmTrading?: () => void;
};

export const PopupPaymentConfirmation = (props: PopupPaymentConfirmationProps) => {
  const { t } = useTranslation();
  const { classes } = useStylePopupPaymentConfirmation();

  return (
    <>
      <Stack className={classes.header}>
        <Text className="title_1-bold" display={'inline'} ta={'center'} c={variable.neutral.white}>
          Staking
        </Text>
        <Text className="body_5-medium" display={'inline'} ta={'center'} c={variable.neutral.white}>
          {props.RatePerYears}
        </Text>
      </Stack>

      <Stack spacing={11} p={'20px 24px 24px'}>
        <Accumulation label={t('Stake.nameProject')} value={props.nameProjects} />
        <Accumulation label={'Staking'} value={numberWithCommas(props.staking)} colorValue={variable.primary.primary2} />
        <Accumulation
          label={t('Stake.intoMoney')}
          value={numberWithCommas(props.intoMoney)}
          unitValue={<IconUSDT />}
          colorValue={variable.primary.primary2}
        />
        <Accumulation label={t('Stake.reinvestment')} value={props.reinvestment} colorValue={variable.secondary.secondary2} />
        <Accumulation label={t('Stake.TradingTime')} value={props.tradingTime} colorValue={variable.primary.primary2} />

        <MyButton loading={props.loading} onClick={props.onConfirmTrading} w={'100%'} h={'44px'}>
          {t('Stake.paymentConfirmation')}
        </MyButton>
      </Stack>
    </>
  );
};

const useStylePopupPaymentConfirmation = createStyles(theme => ({
  header: {
    borderRadius: '14px 14px 0 0',
    alignItem: 'center',
    justifyContent: 'center',
    gap: 0,
    background: variable.primary.primary2,
    height: '79px',
  },
}));
