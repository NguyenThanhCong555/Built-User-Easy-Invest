import React from 'react';
import { createStyles, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { variable } from 'styles/variable';

import { ReactComponent as IconUSDT } from 'assets/icons/coin/usdt.svg';

type Props = {
  rateCoin: number;
  mt?: number;
};

export const CoinRate = (props: Props) => {
  const { classes } = useStyleProjectDetail();
  const { t } = useTranslation();

  return (
    <Group className={classes.showUSDT} mt={props.mt}>
      <Text className="body-4_bold">{t('Projects.projectDetail.coinRate')}</Text>
      <Group spacing={6}>
        <Text>{props.rateCoin}</Text>
        <IconUSDT />
      </Group>
    </Group>
  );
};

const useStyleProjectDetail = createStyles(theme => ({
  showUSDT: {
    justifyContent: 'space-between',
    padding: '8px 12px',
    border: `1px solid ${variable.neutral.greyLight}`,
    boxShadow: `0px 2px 4px rgba(12, 1, 1, 0.15)`,
    borderRadius: '8px',
    cursor: 'pointer',
  },
}));
