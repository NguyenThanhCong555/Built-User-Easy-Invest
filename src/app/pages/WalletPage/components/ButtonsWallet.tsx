import React from 'react';
import { createStyles, Flex } from '@mantine/core';

import { ReactComponent as MoneyReceive } from 'assets/icons/wallet/money-receive.svg';
import { ReactComponent as MoneySend } from 'assets/icons/wallet/money-send.svg';
import { ReactComponent as History } from 'assets/icons/history.svg';
import { ReactComponent as ConvertCard } from 'assets/icons/wallet/convert-card.svg';
import ButtonWallet from './ButtonWallet';
import { TButtonWallet } from '../type';

interface ButtonsWalletProps {
  data: TButtonWallet[];
}

const ButtonsWallet = ({ data }: ButtonsWalletProps) => {
  const { classes } = makeStyles();

  return (
    <Flex className={classes.flex}>
      {data.map((item, _) => (
        <ButtonWallet key={item.id} data={item} />
      ))}
    </Flex>
  );
};

const makeStyles = createStyles(() => ({
  flex: {
    position: 'absolute',
    padding: '0 20px',
    bottom: -36,
    left: 0,
    right: 0,
    margin: 'auto',
    justifyContent: 'space-between',
    gap: 10,

    '@media (max-width: 768px)': {
      padding: '0 10px',
    },
  },
}));

export default ButtonsWallet;
