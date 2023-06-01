import { Box, Divider, Group, createStyles } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Accumulation } from 'app/pages/Staking/components/Accumulation';

import { ReactComponent as IconUsdt } from 'assets/icons/coin/usdt.svg';
import { StatusProcess } from './StatusProcess';
import { STATUS_ACCEPT, STATUS_WAITING } from 'constants/recharge';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';

interface Props {
  stakingId: number;
  usdt: string | number;
  creationTime: string;
  status: number;
  approvalTime?: string;
  actualNumber?: number | string;
}

export const InformationCard = (props: Props) => {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const { classes } = useStyle();

  const moveToRechargeDetail = () => {
    navigation(`/recharge/history/detail/${props.stakingId}`);
  };
  return (
    <Box className={classes.box} onClick={moveToRechargeDetail}>
      <Accumulation
        label={t('HistoryRecharge.status')}
        value={<StatusProcess state={props.status} />}
        colorValue="var(--black)"
      />

      {props.status !== STATUS_WAITING && props.approvalTime && (
        <Accumulation
          label={t('HistoryRecharge.approvalTime')}
          value={props.approvalTime}
          colorValue="var(--black)"
          classValue="small_2-medium"
        />
      )}

      <Divider my={6} />

      <Accumulation
        label={t('HistoryRecharge.amount')}
        value={`+ ${numberWithCommas(props.usdt)}`}
        unitValue={<IconUsdt />}
        colorValue="var(--primary-2)"
        classValue="body_4-bold"
      />
      {props.status === STATUS_ACCEPT && props.actualNumber && (
        <Accumulation
          label={t('HistoryRecharge.theActualNumber')}
          value={`+ ${numberWithCommas(props.actualNumber)}`}
          unitValue={<IconUsdt />}
          colorValue="var(--primary-2)"
          classValue="body_4-bold"
        />
      )}
      <Accumulation
        label={t('HistoryRecharge.creationTime')}
        value={props.creationTime}
        colorValue="var(--black)"
        classValue="small_2-medium"
      />
    </Box>
  );
};

const useStyle = createStyles(theme => ({
  box: {
    width: '100%',
    padding: '8px 12px',
    background: 'var(--white)',
    border: `1px solid var(--white)`,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  avatar: {
    width: '46px',
    height: '46px',
  },
}));
