import { ActionIcon, Box, Button, Group, Stack, Text, createStyles } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconArrowRight } from 'assets/icons/arrow/arrow-right-grey.svg';

type Props = {};

export const Choose = (props: Props) => {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const { classes } = useStyle();

  const moveToPageHome = () => {
    navigation('/');
  };

  const moveToDetailPolicyOrTerms = (path: string) => {
    navigation(path);
  };

  return (
    <Frame onMovePage={moveToPageHome} titlePage={t('Terms & Policy')}>
      <Stack p={16} w={'100%'} spacing={10}>
        <Group
          onClick={() => moveToDetailPolicyOrTerms('/policy')}
          position="apart"
          p={'10px 16px'}
          className={classes.groupButton}
        >
          <Text className="body_6-regular">{t('PolicyAndTerms.titlePagePolicy')}</Text>
          <IconArrowRight />
        </Group>

        <Group
          onClick={() => moveToDetailPolicyOrTerms('/terms')}
          position="apart"
          p={'10px 16px'}
          className={classes.groupButton}
        >
          <Text className="body_6-regular">{t('TermsOfUse.titlePage')}</Text>
          <IconArrowRight />
        </Group>
      </Stack>
    </Frame>
  );
};

const useStyle = createStyles(() => ({
  groupButton: {
    border: ` 1px solid var(--grey-dark)`,
    borderRadius: '8px',
  },
}));
