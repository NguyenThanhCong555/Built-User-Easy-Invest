import { Stack, Text, createStyles } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProfitInformationProps {
  TotalUSDT: number | string;
  mt?: string | number;
}

export const ProfitInformation = (props: ProfitInformationProps) => {
  const { t } = useTranslation();
  const { classes } = useStyleProfitInformation();

  return (
    <Stack align="center" justify="center" className={classes.stake} mt={props.mt}>
      <Text lh={'18px'} c="var(--primary-4)" className="small_3-regular">
        {t('StakeManagement.totalAssets')}
      </Text>
      <Text lh={'42px'} c="var(--white)" mt={4} className="title_2-medium">
        {props.TotalUSDT} USDT
      </Text>
    </Stack>
  );
};

const useStyleProfitInformation = createStyles(theme => ({
  stake: {
    height: '115px',
    background: 'var(--primary-2)',
    borderRadius: '14px',
    padding: '12px 10px',
    gap: 2,
  },
}));
