import { Box, Button, Center, createStyles, Drawer, Flex, Group, Modal } from '@mantine/core';
import React, { useState } from 'react';

import { ReactComponent as StepThree } from 'assets/images/login-instruct/instruct-3.svg';
import { InstructStepper } from './InstructStepper';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Instruct } from '../components/Instruct';
import { Webinstruct } from './components/webInstruct';
import { Mobileinstruct } from './components/mobileInstruct';

type Props = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};
interface interfaceloginProps {
  widthOverSize?: any;
  heightOverSize?: any;
  mobiles?: any;
}
export const InstructModal = (props: Props) => {
  const mobile: any = useMediaQuery('(max-width: 768px)');
  const { classes } = useStyle({ mobiles: mobile });
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group w={'100%'} position="center">
        <Box className={classes.buttonInstruct} onClick={open}>
          <Instruct></Instruct>
        </Box>
      </Group>
      {mobile ? (
        // lost transitionDuration={550}
        <Drawer
          transitionProps={{ duration: 300 }}
          position="bottom"
          className={classes.BoxDrawer}
          opened={opened}
          onClose={close}
          withCloseButton={false}
        >
          <Flex>
            <Mobileinstruct onclose={close}></Mobileinstruct>
          </Flex>
        </Drawer>
      ) : (
        <Flex justify={'center'} align={'center'}>
          {/* lost transitionDuration={550} */}
          <Modal transitionProps={{ duration: 300 }} centered className={classes.BoxInsTruct} opened={opened} onClose={close}>
            <Webinstruct onclose={close}></Webinstruct>
          </Modal>
        </Flex>
      )}
    </>
  );
};

const useStyle = createStyles((theme, params: interfaceloginProps) => ({
  buttonInstruct: {
    maxWidth: params.mobiles ? '343px !important' : '538px !important',
    width: '100% !important',
    margin: '0 auto !important',
  },
  // mobile
  BoxDrawer: {
    height: '100%',
    width: '100%',
    // X
    '.mantine-1ksvbp0': {
      scale: '1.3',
      outline: 'none',
      listStyle: 'none',
      color: 'black',
      margin: '10px',
    },
    // body
    '.mantine-ff23mu': {
      width: '100%',
      height: '100%',
    },
  },
  // mobile
  BoxInsTruct: {
    '.mantine-3cevnw': {
      background: 'transparent',
      boxShadow: 'none',
      border: 'none',
      minWidth: '600px !important',
    },
    '.mantine-1q36a81': {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      position: 'relative',
      background: 'transparent',
    },
    '.mantine-ytq79u': {
      width: '380px ',
    },
    // X
    '.mantine-19pz3dh': {
      display: 'none',
    },
  },
}));
