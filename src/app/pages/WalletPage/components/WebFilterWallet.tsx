import React from 'react';
import { Modal, Text, createStyles } from '@mantine/core';
import { TFilterDate } from '../type';
import ContentFilterWallet from './ContentFilterWallet';
import { useFilterWallet } from './FilterContext/FilterProvider';

interface WebFilterWalletProps {}

const WebFilterWallet = ({}: WebFilterWalletProps) => {
  const { classes } = makeStyles();
  const { opened, closeFilter } = useFilterWallet();

  return (
    <Modal
      classNames={{ header: classes.headerModal, content: classes.modal, body: classes.body }}
      opened={opened}
      onClose={closeFilter}
      centered
      size={630}
    >
      <ContentFilterWallet />
    </Modal>
  );
};

const makeStyles = createStyles(() => ({
  modal: {
    borderRadius: 20,
    overflow: 'initial',
  },

  body: {
    padding: '0 !important',
  },

  headerModal: {
    display: 'none',
  },
}));

export default WebFilterWallet;
