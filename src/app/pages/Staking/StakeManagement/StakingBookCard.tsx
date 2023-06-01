import React from 'react';
import { Avatar, Box, Divider, Group, createStyles, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Accumulation } from '../components/Accumulation';
import { StateStaking } from '../components/StateStaking';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';

interface StakingBookCardProps {
  stakingId: number;
  avatar: string;
  coinName: string;
  stakeInfo: string;
  usdt: string | number;
  coin: string | number;
  stakeTime: string;
  stateStake: 0 | 1;
}

export const StakingBookCard = (props: StakingBookCardProps) => {
  const { t } = useTranslation();
  const { classes } = useStyleStakingBookCard();
  const navigation = useNavigate();

  const moveToBoughtStake = () => {
    navigation(`/stake/info/${props.stakingId}`);
  };

  return (
    <Box className={classes.box} onClick={moveToBoughtStake}>
      <Group position="apart" mb={6}>
        <Group>
          <Avatar src={props.avatar} className={classes.avatar} />
          <Text fw={700}>{props.coinName}</Text>
        </Group>
        <Text fw={700} className="body_4-bold" c={'var(--primary-2)'}>
          {props.stakeInfo}
        </Text>
      </Group>
      <Accumulation
        label={t('StakeManagement.Staking')}
        value={numberWithCommas(Number(props.usdt).toFixed(3))}
        unitValue={
          <Text
            className="body_4-bold"
            style={{
              display: 'inline-block',
            }}
            c={'var(--primary-2)'}
          >
            USDT
          </Text>
        }
        colorValue="var(--primary-2)"
        classValue="body_4-bold"
        mb={3.5}
      />
      <Accumulation
        label={t('StakeManagement.received')}
        value={numberWithCommas(Number(props.coin).toFixed(3))}
        unitValue={
          <Text
            fw={700}
            className="body_4-bold"
            style={{
              display: 'inline-block',
            }}
            c={'var(--primary-2)'}
          >
            {props.coinName}
          </Text>
        }
        colorValue="var(--primary-2)"
        classValue="body_4-bold"
        mb={3.5}
      />
      <Accumulation
        classValue="body_4-bold"
        label={t('StakeManagement.stakeTime')}
        value={props.stakeTime}
        colorValue="var(--black)"
      />

      <Divider my={6} />

      <Accumulation
        label={t('StakeManagement.state')}
        value={<StateStaking state={props.stateStake} />}
        colorValue="var(--black)"
      />
    </Box>
  );
};

const useStyleStakingBookCard = createStyles(theme => ({
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
    borderRadius: 32,
  },
}));
