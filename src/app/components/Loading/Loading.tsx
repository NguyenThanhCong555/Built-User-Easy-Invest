import React from 'react';
import { Center, createStyles } from '@mantine/core';
import { createPortal } from 'react-dom';
import Loader from '../Loader/Loader';

interface Props {
  visible?: boolean;
}
const Loading = ({ visible }: Props) => {
  const { classes } = makeStyles();
  if (!visible) return null;
  return createPortal(
    <Center className={classes.overlay}>
      <Loader />
    </Center>,
    document.body,
  );
};
export default Loading;

const makeStyles = createStyles(() => ({
  overlay: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    inset: 0,
    zIndex: 99999,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
}));
