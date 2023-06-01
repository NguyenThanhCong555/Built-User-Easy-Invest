import React from 'react';
import { Center, Flex, Modal, createStyles } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { ReactComponent as People1 } from 'assets/images/profilePage/people-1.svg';
import { ReactComponent as People2 } from 'assets/images/profilePage/people-2.svg';
import { ReactComponent as People3 } from 'assets/images/profilePage/people-3.svg';
import { ReactComponent as People4 } from 'assets/images/profilePage/people-4.svg';
import { ReactComponent as People5 } from 'assets/images/profilePage/people-5.svg';
import { ReactComponent as People6 } from 'assets/images/profilePage/people-6.svg';
import { ReactComponent as People7 } from 'assets/images/profilePage/people-7.svg';
import { ReactComponent as People8 } from 'assets/images/profilePage/people-8.svg';
import { ReactComponent as People9 } from 'assets/images/profilePage/people-9.svg';
import { ReactComponent as People10 } from 'assets/images/profilePage/people-10.svg';
import { ReactComponent as People11 } from 'assets/images/profilePage/people-11.svg';
import { ReactComponent as People12 } from 'assets/images/profilePage/people-12.svg';
import { ReactComponent as People13 } from 'assets/images/profilePage/people-13.svg';
import { ReactComponent as People14 } from 'assets/images/profilePage/people-14.svg';
import { ReactComponent as People15 } from 'assets/images/profilePage/people-15.svg';
import { ReactComponent as People16 } from 'assets/images/profilePage/people-16.svg';
import { ReactComponent as People17 } from 'assets/images/profilePage/people-17.svg';
import { ReactComponent as People18 } from 'assets/images/profilePage/people-18.svg';
import { ReactComponent as People19 } from 'assets/images/profilePage/people-19.svg';
import { ReactComponent as People20 } from 'assets/images/profilePage/people-20.svg';
import { ReactComponent as People21 } from 'assets/images/profilePage/people-21.svg';
import { ReactComponent as People22 } from 'assets/images/profilePage/people-22.svg';
import { ReactComponent as People23 } from 'assets/images/profilePage/people-23.svg';
import { ReactComponent as People24 } from 'assets/images/profilePage/people-24.svg';
import { ReactComponent as People25 } from 'assets/images/profilePage/people-25.svg';
import { variable } from 'styles/variable';

interface ModalImageProfileProps {
  opened: boolean;
  setOpened: any;
  form: UseFormReturnType<any>;
  setAvatar: any;
  setAppear: any;
}

const ModalImageProfile = ({ opened, setOpened, form, setAvatar, setAppear }: ModalImageProfileProps) => {
  const { classes } = makeStyles();
  const listImage = [
    { label: <People1 width="100%" height="100%" />, value: 'https://i.ibb.co/2Mx2Vj3/1.png' },
    { label: <People2 width="100%" height="100%" />, value: 'https://i.ibb.co/6v32JNt/2.png' },
    { label: <People3 width="100%" height="100%" />, value: 'https://i.ibb.co/cQ7QMJw/3.png' },
    { label: <People4 width="100%" height="100%" />, value: 'https://i.ibb.co/3T4mnYH/4.png' },
    { label: <People5 width="100%" height="100%" />, value: 'https://i.ibb.co/syHSD8b/5.png' },
    { label: <People6 width="100%" height="100%" />, value: 'https://i.ibb.co/FgS98Cj/6.png' },
    { label: <People7 width="100%" height="100%" />, value: 'https://i.ibb.co/DCq8wD5/7.png' },
    { label: <People8 width="100%" height="100%" />, value: 'https://i.ibb.co/bXycMkw/8.png' },
    { label: <People9 width="100%" height="100%" />, value: 'https://i.ibb.co/p0VX3BK/9.png' },
    { label: <People10 width="100%" height="100%" />, value: 'https://i.ibb.co/F4CN0vC/10.png' },
    { label: <People11 width="100%" height="100%" />, value: 'https://i.ibb.co/DbMWG1T/11.png' },
    { label: <People12 width="100%" height="100%" />, value: 'https://i.ibb.co/87VPj8V/12.png' },
    { label: <People13 width="100%" height="100%" />, value: 'https://i.ibb.co/48NYnng/13.png' },
    { label: <People14 width="100%" height="100%" />, value: 'https://i.ibb.co/WkS70tS/14.png' },
    { label: <People15 width="100%" height="100%" />, value: 'https://i.ibb.co/fMHcJQw/15.png' },
    { label: <People16 width="100%" height="100%" />, value: 'https://i.ibb.co/r2RNfvt/16.png' },
    { label: <People17 width="100%" height="100%" />, value: 'https://i.ibb.co/5RK8Tmv/17.png' },
    { label: <People18 width="100%" height="100%" />, value: 'https://i.ibb.co/3mZbVMC/18.png' },
    { label: <People19 width="100%" height="100%" />, value: 'https://i.ibb.co/HBXS7rP/19.png' },
    { label: <People20 width="100%" height="100%" />, value: 'https://i.ibb.co/vvSnDtz/20.png' },
    { label: <People21 width="100%" height="100%" />, value: 'https://i.ibb.co/Yhgm0dm/21.png' },
    { label: <People22 width="100%" height="100%" />, value: 'https://i.ibb.co/ccPCxtQ/22.png' },
    { label: <People23 width="100%" height="100%" />, value: 'https://i.ibb.co/SJNR4FD/23.png' },
    { label: <People24 width="100%" height="100%" />, value: 'https://i.ibb.co/w4wbX6g/24.png' },
    { label: <People25 width="100%" height="100%" />, value: 'https://i.ibb.co/SQ6hqPh/25.png' },
  ];

  function handleSelectImage(item) {
    form.setFieldValue('url', item.value);
    setAppear(true);
    setAvatar(item.label);
    setOpened(false);
  }

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => setOpened(false)}
      closeButtonProps={{
        display: 'none',
      }}
      radius={14}
      size={550}
    >
      <Flex className={classes.flex}>
        {listImage?.map((item, index) => (
          <Center key={index} className={classes.center} onClick={() => handleSelectImage(item)}>
            {item.label}
          </Center>
        ))}
      </Flex>
    </Modal>
  );
};

const makeStyles = createStyles(() => ({
  flex: {
    flexWrap: 'wrap',
    gap: 18,
    rowGap: 18,
  },
  center: {
    cursor: 'pointer',
    width: 58,
    height: 58,
    backgroundColor: variable.primary.primary5,
    overflow: 'hidden',
    borderRadius: 62,
  },
}));

export default ModalImageProfile;
