import React, { Children } from 'react';
import { ActionIcon, Box, Center, Flex, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import IconInfo from 'assets/icons/stake/IconInfo';
import { useNavigate } from 'react-router-dom';
import { neutral, primary } from 'styles/variable';

interface Props {
  text?: string;
  isDetail?: boolean;
  setOpen?: any;
}

const HeaderDetails = ({ text, isDetail, setOpen }: Props, props) => {
  const navigate = useNavigate();
  const mobile = useMediaQuery('(max-width: 768px)');

  return (
    <Center
      pos={'relative'}
      sx={{
        width: '100%',
        height: '48px',
        background: primary.primary5,
        borderRadius: mobile ? 0 : '20px 20px 0 0',
        overflow: 'hidden',
      }}
    >
      <Box left={mobile ? 10 : 24} w={'100%'} pos={'absolute'}>
        <ActionIcon size="lg" variant="transparent" onClick={() => navigate(-1)}>
          <svg width={18} height={14} viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 7H1M1 7L7 13M1 7L7 1" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ActionIcon>
      </Box>
      <Flex align={'center'} justify="center" gap={6}>
        <Text fz={'24px !important'} fw={700} c={neutral.black}>
          {text}
        </Text>
        {props.children}
        {isDetail && (
          <Center
            sx={{
              zIndex: 10,
              cursor: 'pointer',
            }}
            onClick={() => setOpen(true)}
          >
            <IconInfo></IconInfo>
          </Center>
        )}
      </Flex>
    </Center>
  );
};

export default HeaderDetails;
