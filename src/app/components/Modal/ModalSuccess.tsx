import React from 'react';
import { Modal, Stack, Text, createStyles } from '@mantine/core';
import { ReactComponent as IconSuccess } from 'assets/icons/modal/icon-success.svg';

interface ModalSuccessProps {
  title: string;
  opened: boolean;
  setOpened: any;
}

const ModalSuccess = ({ title, opened, setOpened }: ModalSuccessProps) => {
  const { classes } = makeStyles();
  return (
    <Modal
      centered
      opened={opened}
      onClose={() => {}}
      closeButtonProps={{
        display: 'none',
      }}
    >
      <Stack className={classes.stack}>
        <IconSuccess />
        <Text className={classes.title}>{title}</Text>
      </Stack>
    </Modal>
  );
};

const makeStyles = createStyles(theme => ({
  stack: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
}));

export default ModalSuccess;
