import React, { useState } from 'react';
import { Stack, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { TStakingBook } from 'store/slice/stake/types';
import { StakingBookCard } from './StakingBookCard';
import ConvertDate from 'helpers/formatDate';
import { MILLISECONDS, SECONDS_PER_DAY } from 'constants/common';
import { neutral } from 'styles/variable';

interface StackingNumProps {
  dataTransactionStake: TStakingBook[];
}

export const StackingNum = (props: StackingNumProps) => {
  const { t } = useTranslation();
  const mobile: any = useMediaQuery('(max-width: 768px)');
  const [rotateauto, setRotateauto] = useState(true);
  const { classes } = useStyle();

  return (
    <Stack className={classes.stakingNum}>
      {props.dataTransactionStake.map(stakeBook => (
        <StakingBookCard
          key={stakeBook.id}
          stakingId={stakeBook.id}
          usdt={stakeBook.usdt}
          coin={stakeBook.coin}
          coinName={stakeBook?.coin_info?.coin_name}
          avatar={stakeBook?.coin_info?.coin_avatar}
          stakeTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(stakeBook.time_start))}
          stakeInfo={`${(stakeBook.time_end - stakeBook.time_start) / SECONDS_PER_DAY / MILLISECONDS} ${t(
            'StakeManagement.days',
          )} - ${stakeBook.interest_rate}%`}
          stateStake={stakeBook.status}
        />
      ))}
    </Stack>
  );
};

const useStyle = createStyles((theme, params) => ({
  stakingNum: {
    width: '100%',
    background: neutral.white,
    padding: '10px 16px',
    justifyContent: 'center',

    '.closedbook': {
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      marginBottom: '20px',
    },
  },
}));
