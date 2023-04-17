import React from 'react';
import { Box, createStyles, Stack, Text } from '@mantine/core';
import { TButtonWallet } from '../type';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';

interface ButtonWalletProps {
  data: TButtonWallet;
}
interface propsStyle {
  mobiles?: any;
}
const ButtonWallet = ({ data }: ButtonWalletProps) => {
  const mobile = useMediaQuery('(max-width:768px)');
  const { classes } = makeStyles({ mobiles: mobile });
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(data.path);
  };

  return (
    <Stack className={classes.stack} onClick={handleNavigate}>
      <Box>{data.icon}</Box>
      <Text className={classes.title}>{data.title}</Text>
    </Stack>
  );
};

const makeStyles = createStyles((theme, params: propsStyle) => ({
  stack: {
    display: 'flex',
    // maxWidth: params.mobiles ? '76px' : '118px',
    height: '64px',
    width: '100% !important',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    border: '1px solid #E9DEFF',
    borderRadius: 8,
    boxShadow: '0px 4px 12px rgba(39, 34, 70, 0.1)',
    cursor: 'pointer',
  },

  title: {
    fontSize: params.mobiles ? 12 : 14,
    fontWeight: 700,
    lineHeight: '0',
    marginBottom: '10px',
  },
}));
export default ButtonWallet;
