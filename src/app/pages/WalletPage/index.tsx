import { Flex, Stack, createStyles } from '@mantine/core';
import { NavContainer } from 'app/components/navigation/NavContainer';
import React from 'react';
import { media } from 'styles/media';
import TotalWallet from './components/TotalWallet';
import HistoryTransactionItem from './components/HistoryTransactionItem';
import HistoryTransaction from './components/HistoryTransaction';

interface InPropsStyle {}
export const WalletPage = () => {
  const { classes: c } = createStyleProps({});
  return (
    <Flex className={c.boxWallet}>
      <NavContainer backRole="/" laberHeader={'Quản lý ví'}>
        <Stack className={c.stack}>
          <TotalWallet />
          <HistoryTransaction />
        </Stack>
      </NavContainer>
    </Flex>
  );
};
const createStyleProps = createStyles((theme, params: InPropsStyle) => ({
  boxWallet: { marginTop: '14px', [`${media.small()}`]: { '&': { marginTop: '0px' } } },
  stack: {
    width: '100%',
    marginTop: '0px',
    '.mantine-h607hx': {
      marginTop: '50px',
    },
  },
}));
