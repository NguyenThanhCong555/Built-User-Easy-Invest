import { Center, Text } from '@mantine/core';
import { CLOSE } from 'constants/common';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const StateStaking = (props: { state: number }) => {
  const { t } = useTranslation();

  if (props.state === CLOSE)
    return (
      <Center bg={'#CDFFE1'} w={84} h={22} p={'6px 10px'} style={{ borderRadius: '12px' }}>
        <Text display={'inline'} fz={12} c={'#26C95D'}>
          {t('StakeManagement.stateCompleted')}
        </Text>
      </Center>
    );
  else
    return (
      <Center bg={'var(--primary-5)'} w={84} h={22} p={'6px 10px'} style={{ borderRadius: '12px' }}>
        <Text display={'inline'} fz={12} c={'var(--primary-2)'}>
          {t('StakeManagement.stateStaking')}
        </Text>
      </Center>
    );
};
