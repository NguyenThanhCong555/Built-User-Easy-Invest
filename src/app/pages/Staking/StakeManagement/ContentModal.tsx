import React from 'react';
import { Center, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Accumulation } from '../components/Accumulation';

export const ContentModal = () => {
  const { t } = useTranslation();

  return (
    <>
      <Center>
        <Text className="body_1-bold" c={'var(--primary-2)'}>
          Stake
        </Text>
      </Center>
      <Stack mt={16} spacing={12}>
        <Text className="Small_2-medium">{t('StakeManagement.modal.text1')}</Text>
        <Text className="Small_2-medium">{t('StakeManagement.modal.text2')}</Text>
        <Text className="Small_2-medium">{t('StakeManagement.modal.text3')}</Text>

        <Text className="small_4-bold">{t('StakeManagement.modal.label')}</Text>
        <Accumulation label={t('StakeManagement.modal.text4')} value={''} mark />
        <Accumulation label={t('StakeManagement.modal.text5')} value={''} mark />
      </Stack>
    </>
  );
};
