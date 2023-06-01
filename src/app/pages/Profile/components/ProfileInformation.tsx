import React, { useState } from 'react';
import { Center, Divider, Flex, Group, Image, Stack, Text, createStyles } from '@mantine/core';

import { ReactComponent as People1 } from 'assets/images/profilePage/people-3.svg';
import { ReactComponent as Camera } from 'assets/images/profilePage/camera-plus.svg';
import { variable } from 'styles/variable';
import { UseFormReturnType } from '@mantine/form';
import ModalImageProfile from './ModalImageProfile';
import ConvertDate from 'helpers/formatDate';
import { useTranslation } from 'react-i18next';

interface ProfileInformationProps {
  form: UseFormReturnType<any>;
  avatar: any;
  setAvatar: any;
  appear: any;
  setAppear: any;
}

const ProfileInformation = ({ form, avatar, setAvatar, setAppear }: ProfileInformationProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <Stack className={classes.stack}>
      <Center>
        <Group className={classes.group} onClick={() => setOpened(true)}>
          <Center className={classes.centerImage}>
            {avatar ? (
              avatar
            ) : form.values.url === '' ? (
              <People1 width="100%" height="100%" />
            ) : (
              <Image src={form.values.url} classNames={{ image: classes.image }} />
            )}
          </Center>

          <Center className={classes.centerIcon}>
            <Camera />
          </Center>
        </Group>
      </Center>

      <Stack className={classes.stackInfo}>
        <Flex className={classes.flexInfo}>
          <Text className={classes.title}>{t('profile.Phone Number')}:</Text>
          <Text className={classes.text}>{form.values.phone}</Text>
        </Flex>

        <Flex className={classes.flexInfo}>
          <Text className={classes.title}>{t('profile.Date created')}:</Text>
          <Text className={classes.text}>{ConvertDate.getDDMMYY(new Date(form.values.create_time))}</Text>
        </Flex>
      </Stack>

      <Divider className={classes.divider} color={variable.primary.primary5} />

      <ModalImageProfile opened={opened} setOpened={setOpened} form={form} setAvatar={setAvatar} setAppear={setAppear} />
    </Stack>
  );
};

const makeStyles = createStyles({
  stack: {
    marginTop: 42,
  },

  group: {
    position: 'relative',
  },
  centerImage: {
    width: 158,
    height: 158,
    backgroundColor: variable.primary.primary5,
    borderRadius: 158,
    overflow: 'hidden',
    cursor: 'pointer',
  },
  centerIcon: {
    position: 'absolute',
    border: '1px solid #E9DEFF',
    width: 40,
    height: 40,
    overflow: 'hidden',
    borderRadius: 41,
    backgroundColor: '#fff',
    top: 'calc(50% - 40px/2 + 62.17px)',
    left: 'calc(50% - 40px/2 + 44.33px)',
    cursor: 'pointer',
  },

  title: {
    fontWeight: 400,
    fontSize: 14,
    color: variable.neutral.greyDark,
  },
  text: {
    fontWeight: 700,
    fontSize: 16,
  },

  stackInfo: {
    backgroundColor: variable.neutral.whiteLight,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    padding: '14px 12px',
    gap: 5,
  },
  flexInfo: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  divider: {
    marginTop: 15,
  },

  image: {},
});

export default ProfileInformation;
