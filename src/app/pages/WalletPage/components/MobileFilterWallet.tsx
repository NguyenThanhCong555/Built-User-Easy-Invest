import React from 'react';
import { Drawer, Text, createStyles } from '@mantine/core';
import { TFilterDate } from '../type';
import ContentFilterWallet from './ContentFilterWallet';
import { useFilterWallet } from './FilterContext/FilterProvider';

interface MobileFilterWalletProps {}

const MobileFilterWallet = ({}: MobileFilterWalletProps) => {
  const { classes } = makeStyles();
  const { opened, closeFilter } = useFilterWallet();

  return (
    <Drawer
      classNames={{ content: classes.drawer, header: classes.headerDrawer, body: classes.drawerBody }}
      opened={opened}
      onClose={closeFilter}
      position="bottom"
      size={320}
    >
      <ContentFilterWallet />
    </Drawer>
  );
};

const makeStyles = createStyles(() => ({
  drawer: {
    borderRadius: '20px 20px 0px 0px',
    overflow: 'initial',
  },

  headerDrawer: {
    display: 'none',
  },

  drawerBody: {
    padding: 0,
    height: '100%',
  },
}));

export default MobileFilterWallet;
