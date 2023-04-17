import React from 'react';

import { Box, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { MyButton } from '../Button/MyButton';
import { variable } from 'styles/variable';

import { ReactComponent as IconXCircle } from 'assets/icons/x-circle.svg';

type Props = {
  title: string;
  cancelText: string;
  successText: string;
  onClose?: () => void;
  onCancel?: () => void;
  onSuccess?: () => void;
};

export const ConfirmAskPopup = (props: Props) => {
  const { t } = useTranslation();

  return (
    <Box p={'20px 23px 40px'}>
      <Group position="right" mb={12}>
        <IconXCircle onClick={props.onClose} style={{ cursor: 'pointer' }} />
      </Group>

      <Text align="center">{props.title}</Text>

      <Group noWrap mt={24}>
        <MyButton
          onClick={props.onCancel}
          w={'calc(50% - 4.5px)'}
          h={'44px'}
          variant={'outline'}
          c={variable.primary.primary1}
          bg_hover={variable.neutral.white}
          bg_active={variable.neutral.white}
        >
          {props.cancelText}
        </MyButton>
        <MyButton onClick={props.onSuccess} w={'calc(50% - 4.5px)'} h={'44px'}>
          {props.successText}
        </MyButton>
      </Group>
    </Box>
  );
};
