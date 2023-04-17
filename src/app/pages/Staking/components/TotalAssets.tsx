import { Flex, createStyles, Image, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';

import walletIcon from 'assets/icons/wallet.svg';

import { primary } from 'styles/variable';
import { formatCurrency } from '../utils';

interface Styleprops {
  moblies?: any;
}

interface propsTotalAssets {
  totalLabel?: string;
  totalMoneyLabel?: any;
  subTotalMoneyLabel?: any;
}

export const TotalAssets = (props: propsTotalAssets) => {
  const mobile: any = useMediaQuery('(max-width: 768px)');
  const { classes } = createNewStyle({ moblies: mobile });
  return (
    <Flex className={classes.boxTotal}>
      <Flex justify={'center'} align={'center'}>
        <Image className={classes.boxTotalIcon} src={walletIcon}></Image>
        <Text c={primary.primary4} fz={'14px !important'} fw={400}>
          {props.totalLabel}
        </Text>
      </Flex>
      <Text fz={'32px !important'} c={'white'} fw={500}>
        {formatCurrency(props.totalMoneyLabel)} USDT
      </Text>
      <Text fz={'18px !important'} fw={500} c={primary.primary4}>
        ~ {formatCurrency(props.subTotalMoneyLabel)} USD
      </Text>
    </Flex>
  );
};

const createNewStyle = createStyles((theme, params: Styleprops) => ({
  boxTotal: {
    maxWidth: params.moblies ? '343px' : '630px',
    width: '100%',
    margin: '0px auto 20px auto',
    height: '121px',
    background: 'rgba(93, 59, 164, 1)',
    borderRadius: '14px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxTotalIcon: {
    maxWidth: '18px',
    height: '18px',
    objectFit: 'cover',
    marginRight: '5px',
  },
}));
