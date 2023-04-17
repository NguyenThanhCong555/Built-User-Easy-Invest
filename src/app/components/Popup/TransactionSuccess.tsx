import { Stack, Text } from '@mantine/core';
import React from 'react';

import { ReactComponent as IconSuccess } from 'assets/icons/notification/success.svg';
import { useTranslation } from 'react-i18next';

type Props = {};

export const TransactionSuccess = (props: Props) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={24} align={'center'}>
      <IconSuccess />
      <Text className="body-3_regular">{t('Popup.transactionSuccess')}</Text>
    </Stack>
  );
};
