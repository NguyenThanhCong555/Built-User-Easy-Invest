import React from 'react';
import { Stack, createStyles, Text, Flex, Box } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { Accumulation } from './Accumulation';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { variable } from 'styles/variable';
import { MyButton } from 'app/components/Button/MyButton';

import { ReactComponent as IconCoin } from 'assets/icons/coin/coin.svg';
import { ReactComponent as IconUSDT } from 'assets/icons/coin/usdt.svg';
import IconUsd from 'assets/icons/coin/IconUsd';

type PopupPaymentConfirmationCoinProps = {
  nameProjects: string;
  author: string;
  RatePerYears: string;
  timeAPR: string;
  APR: string;
  coinName: string;

  intoMoney: string;
  reinvestment: string;
  tradingTime: string;
  loading?: boolean;
  onConfirmTrading?: () => void;
  onClose: () => void;
};

interface PopupPaymentConfirmationProps extends PopupPaymentConfirmationCoinProps {
  staking: number;
}

type PopupWithdrawConfirmationPropsCoin = {
  nameProjects: string;
  maturity: string;
  interestRate: string;
  coin: string | number;
  profit: number | string;
  coinName: string;
  tradingTime: string;
  loading?: boolean;
  onConfirmTrading?: () => void;
  onClose: () => void;
};

type PopupWithdrawConfirmationProps = {
  nameProjects: string;
  maturity: string;
  interestRate: string;
  staking: number;
  profit: number | string;
  coinName: string;
  tradingTime: string;
  loading?: boolean;
  onConfirmTrading?: () => void;
  onClose: () => void;
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
      </Stack>

      <Stack spacing={11} p={'20px 24px 24px'}>
        <Accumulation
          label={
            <Text fz={16} fw={700}>
              {t('Stake.nameProject')}
            </Text>
          }
          value={props.nameProjects}
        />
        <Accumulation
          label={
            <Text fz={16} fw={700}>
              {t('Stake.term')}
            </Text>
          }
          value={props.timeAPR}
          colorValue={variable.primary.primary2}
        />
        <Accumulation
          label={
            <Text fz={16} fw={700}>
              {'APR:'}
            </Text>
          }
          value={props.APR}
          colorValue={variable.primary.primary2}
        />

        <Accumulation
          label={
            <Text fz={16} fw={700}>
              {`${t('Stake.amounts')} USDT Staking:`}
            </Text>
          }
          value={numberWithCommas(Number(props.intoMoney).toFixed(3))}
          unitValue={'USDT'}
          colorValue={variable.primary.primary2}
          maw_label={126}
        />

        <Accumulation
          label={
            <Text fz={16} fw={700}>
              {`${t('Stake.amounts')} ${props.coinName} ${t('Stake.exchange')}:`}
            </Text>
          }
          value={numberWithCommas(Number(props.staking).toFixed(3))}
          unitValue={props.coinName}
          colorValue={variable.primary.primary2}
          maw_label={126}
        />

        <Accumulation
          label={
            <Text fz={16} fw={700}>
              {t('Stake.reinvestment')}
            </Text>
          }
          value={props.reinvestment}
          colorValue={variable.primary.primary2}
        />

        <Flex gap={8}>
          <MyButton onClick={props.onClose} c="var(--primary-1)" variant="outline" h={'44px'} bg_hover="white" bg_active="white">
            <Text fz={16} fw={700}>
              {t('Stake.cancel')}
            </Text>
          </MyButton>
          <MyButton loading={props.loading} onClick={props.onConfirmTrading} h={'44px'}>
            <Text fz={16} fw={700}>
              {t('Stake.paymentConfirmation')}
            </Text>
          </MyButton>
        </Flex>
      </Stack>
    </>
  );
};

export const PopupPaymentConfirmationCoin = (props: PopupPaymentConfirmationCoinProps) => {
  const { t } = useTranslation();
  const { classes } = useStylePopupPaymentConfirmation();

  return (
    <>
      <Stack className={classes.header}>
        <Text className="title_1-bold" display={'inline'} ta={'center'} c={variable.neutral.white}>
          Staking
        </Text>
      </Stack>

      <Stack spacing={11} p={'20px 24px 24px'}>
        <Accumulation
          label={
            <Text fz={16} fw={700}>
              {t('Stake.nameProject')}
            </Text>
          }
          value={props.nameProjects}
        />
        <Accumulation
          label={
            <Text fz={16} fw={700}>
              {t('Stake.term')}
            </Text>
          }
          value={props.timeAPR}
          colorValue={variable.primary.primary2}
        />
        <Accumulation
          label={
            <Text fz={16} fw={700}>
              {'APR:'}
            </Text>
          }
          value={props.APR}
          colorValue={variable.primary.primary2}
        />

        <Accumulation
          label={
            <Text fz={16} fw={700}>
              {`${t('Stake.amounts')} USDT Staking:`}
            </Text>
          }
          value={numberWithCommas(Number(props.intoMoney).toFixed(3))}
          unitValue={props.coinName}
          colorValue={variable.primary.primary2}
          maw_label={126}
        />

        <Accumulation
          label={
            <Text fz={16} fw={700}>
              {t('Stake.reinvestment')}
            </Text>
          }
          value={props.reinvestment}
          colorValue={variable.primary.primary2}
        />

        <Flex gap={8}>
          <MyButton onClick={props.onClose} c="var(--primary-1)" variant="outline" h={'44px'} bg_hover="white" bg_active="white">
            <Text fz={16} fw={700}>
              {t('Stake.cancel')}
            </Text>
          </MyButton>
          <MyButton loading={props.loading} onClick={props.onConfirmTrading} h={'44px'}>
            <Text fz={16} fw={700}>
              {t('Stake.paymentConfirmation')}
            </Text>
          </MyButton>
        </Flex>
      </Stack>
    </>
  );
};

export const PopupWithdrawConfirmation = (props: PopupWithdrawConfirmationProps) => {
  const { t } = useTranslation();
  const { classes } = useStylePopupWithdrawConfirmation();

  return (
    <>
      <Stack className={classes.header}>
        <Text className="title_1-bold" display={'inline'} ta={'center'} c={variable.neutral.white}>
          {t('StakedDetail.completed')}
        </Text>
      </Stack>

      <Stack spacing={11} p={'20px 24px 24px'}>
        <Accumulation label={t('StakingClosed.projectName')} value={props.nameProjects} colorValue={variable.primary.primary2} />
        <Accumulation label={t('StakingClosed.maturity')} value={props.maturity} colorValue={variable.primary.primary2} />
        <Accumulation label={'APR:'} value={props.interestRate} colorValue={variable.primary.primary2} />
        <Accumulation
          label={`${t('StakedDetail.amount')} USDT ${t('StakedDetail.received')}`}
          value={numberWithCommas(props.staking)}
          colorValue={variable.primary.primary2}
        />
        <Accumulation
          label={`${t('StakedDetail.amount')} ${props?.coinName} ${t('StakedDetail.received')}`}
          value={props.profit}
          unitValue={props.coinName}
          colorValue={props.profit === 0 ? variable.secondary.secondary2 : variable.primary.primary2}
        />
        <Accumulation label={t('StakingClosed.tradingTime')} value={props.tradingTime} colorValue={variable.primary.primary2} />

        <Flex gap={8}>
          <MyButton onClick={props.onClose} c="var(--primary-1)" variant="outline" h={'44px'} bg_hover="white" bg_active="white">
            {t('Stake.cancel')}
          </MyButton>
          <MyButton loading={props.loading} onClick={props.onConfirmTrading} h={'44px'}>
            {t('StakingClosed.confirm')}
          </MyButton>
        </Flex>
      </Stack>
    </>
  );
};

export const PopupWithdrawConfirmationCoin = (props: PopupWithdrawConfirmationPropsCoin) => {
  const { t } = useTranslation();
  const { classes } = useStylePopupWithdrawConfirmation();

  return (
    <>
      <Stack className={classes.header}>
        <Text className="title_1-bold" display={'inline'} ta={'center'} c={variable.neutral.white}>
          {t('StakedDetail.completed')}
        </Text>
      </Stack>

      <Stack spacing={11} p={'20px 24px 24px'}>
        <Accumulation label={t('StakingClosed.projectName')} value={props.nameProjects} colorValue={variable.primary.primary2} />
        <Accumulation label={t('StakingClosed.maturity')} value={props.maturity} colorValue={variable.primary.primary2} />
        <Accumulation label={'APR:'} value={props.interestRate} colorValue={variable.primary.primary2} />
        <Accumulation
          label={`${t('StakedDetail.amount')} ${props?.coinName}}`}
          value={numberWithCommas(props.coin)}
          unitValue={props.coinName}
          colorValue={variable.primary.primary2}
        />
        <Accumulation
          label={`${t('StakedDetail.amount')} ${props?.coinName} ${t('StakedDetail.received')}`}
          value={props.profit}
          unitValue={props.coinName}
          colorValue={props.profit === 0 ? variable.secondary.secondary2 : variable.primary.primary2}
        />
        <Accumulation label={t('StakingClosed.tradingTime')} value={props.tradingTime} colorValue={variable.primary.primary2} />

        <Flex gap={8}>
          <MyButton onClick={props.onClose} c="var(--primary-1)" variant="outline" h={'44px'} bg_hover="white" bg_active="white">
            {t('Stake.cancel')}
          </MyButton>
          <MyButton loading={props.loading} onClick={props.onConfirmTrading} h={'44px'}>
            {t('StakingClosed.confirm')}
          </MyButton>
        </Flex>
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

const useStylePopupWithdrawConfirmation = createStyles(theme => ({
  header: {
    borderRadius: '14px 14px 0 0',
    alignItem: 'center',
    justifyContent: 'center',
    gap: 0,
    background: variable.primary.primary2,
    height: '79px',
  },
}));
