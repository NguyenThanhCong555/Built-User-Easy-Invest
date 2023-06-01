import React from 'react';
import { Avatar, Group, createStyles, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { variable } from 'styles/variable';
import { usePopupFalling } from '../components/PopupFalling/PopupContext';

type InformationProjectProps = {
  avatar: string;
  title: string;
  triggerPopup?: any;
  px?: string | number;
  mt?: string | number;
};
export const InformationProject = (props: InformationProjectProps) => {
  const { t } = useTranslation();
  const { classes } = useStyleInformationProject();
  const { triggerPopup } = usePopupFalling();

  return (
    <Group position="apart" px={props.px} mt={props.mt}>
      <Group spacing={6}>
        <Avatar src={props.avatar || ''} radius={100} w={54} h={54} alt="it's me"></Avatar>
        <Text className="subtitle_4-bold">{props.title}</Text>
      </Group>
      <Text onClick={triggerPopup} className={`body_3-regular ${classes.textOther}`}>
        {t('Stake.change')}
      </Text>
    </Group>
  );
};

const useStyleInformationProject = createStyles(theme => ({
  textOther: {
    color: variable.neutral.greyDark,
    cursor: 'pointer',
  },

  '@media (max-width : 576px)': {
    width: '47px !important',
    height: '48px',
    fontSize: '24px',
  },
}));
