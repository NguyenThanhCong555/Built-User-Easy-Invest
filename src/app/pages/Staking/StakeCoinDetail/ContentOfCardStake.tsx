import React from 'react';
import { Box, createStyles, Divider, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { Accumulation } from '../components/Accumulation';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { TCoinInfo } from 'store/slice/stake/types';
import { useMediaQuery } from '@mantine/hooks';
import ConvertDate from 'helpers/formatDate';
import { CLOSE, OPEN } from 'constants/common';
import { StateStaking } from '../components/StateStaking';

export type TStakeBought = {
  id?: number;
  user_id?: number;
  project_id?: number;
  stake_id?: number;
  coin_id?: number;
  usdt?: number;
  coin?: number;
  profit?: number;
  time_start?: number;
  time_end?: number;
  interest_rate?: number;
  interest_rate_before?: number;
  renewal?: number;
  auto?: number;
  status?: number;
  received_coin?: number;
  received_coin_before?: number;
  project_name?: string;
  coin_info?: TCoinInfo;
};

interface ContentOfCardStakingProps extends TStakeBought {
  onClickButton?: () => void;
}

export const ContentOfCardStaking = (props: ContentOfCardStakingProps) => {
  const { t } = useTranslation();
  const { classes } = useStyleContentOfCardStaking();
  const largeThan576 = useMediaQuery('(min-width:576px)');

  return (
    <Box px={12}>
      <Accumulation
        label={t('StakeManagement.state')}
        value={<StateStaking state={props.status ?? -1} />}
        colorValue="var(--black)"
        mt={13}
      />

      <Divider my={13} />

      <Accumulation
        mark
        label={t('StakedDetail.total-coin-stake')}
        value={numberWithCommas(Number(props?.usdt).toFixed(3))}
        unitValue={'USDT'}
        my={10}
        classValue="small_2-medium"
      />
      <Accumulation
        mark
        label={`${t('StakedDetail.total-coin')} ${props?.coin_info?.coin_name} ${t('StakedDetail.accumulating-interest')}`}
        value={numberWithCommas(Number(props.coin).toFixed(3))}
        unitValue={props?.coin_info?.coin_name}
        maw_label={!largeThan576 ? 100 : 'auto'}
        my={10}
      />
      <Accumulation
        mark
        label={t('StakedDetail.stake-time')}
        value={ConvertDate.getDDMMYY(new Date(props?.time_start ?? 0))}
        my={10}
      />
      <Accumulation
        mark
        label={t('StakedDetail.deadline-time')}
        value={ConvertDate.getDDMMYY(new Date(props?.time_end ?? 0))}
        my={10}
      />
      <Accumulation mark label={t('StakedDetail.renewals')} value={props.renewal} my={10} />
      <Accumulation
        mark
        label={t('StakedDetail.auto-renew')}
        value={props.auto === OPEN ? t('StakedDetail.yes') : t('StakedDetail.no')}
        my={10}
      />

      <Divider my={12} />
      {/* pay on time */}
      <Text className="small_1-bold">{t('StakedDetail.pay-on-time')}</Text>
      <Accumulation
        mark
        label={`${t('StakedDetail.amount')} ${props?.coin_info?.coin_name} ${t('StakedDetail.received')}`}
        value={numberWithCommas(Number(props.received_coin).toFixed(3))}
        unitValue={props?.coin_info?.coin_name}
        maw_label={!largeThan576 ? 120 : 'auto'}
        my={10}
      />

      <Divider my={12} />

      {/* prepayment */}
      <Text className="small_1-bold">{t('StakedDetail.prepayment')}</Text>
      <Accumulation
        mark
        label={`${t('StakedDetail.amount')} ${props?.coin_info?.coin_name} ${t('StakedDetail.received')}`}
        value={numberWithCommas(Number(props?.received_coin_before).toFixed(3))}
        unitValue={props?.coin_info?.coin_name}
        maw_label={!largeThan576 ? 120 : 'auto'}
        my={10}
      />
    </Box>
  );
};

const useStyleContentOfCardStaking = createStyles(theme => ({
  button: {
    borderRadius: '8px',
    color: 'var(--primary-1)',
    width: '143px',
    height: '36px',
    border: '1px solid var(--primary-1)',
  },
}));
