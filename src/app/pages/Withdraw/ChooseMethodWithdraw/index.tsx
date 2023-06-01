import { Avatar, Center, Group, Text, Box, Stack, createStyles, Modal } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Frame } from 'app/layouts/Frame';

import { ReactComponent as ImageBinance } from 'assets/images/ChooseMethodRecharge/binance.svg';
import { ReactComponent as ImageBanking } from 'assets/images/ChooseMethodRecharge/banking.svg';
import { ReactComponent as IconRight } from 'assets/icons/arrow/arrow-right-grey.svg';
import { useDispatch } from 'react-redux';
import { ReactComponent as IconAlert } from 'assets/icons/alert-circle.svg';
import { withdrawActions } from 'store/slice/withdraw';

type Props = {};

const dataFeatures = [
  {
    id: 1,
    label: 'ChooseMethodWithdraw.loadingHistory',
    moveTo: '/withdraw/history',
  },
];

export const ChooseMethodWithdraw = (props: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { classes } = useStyle();
  const dispatch = useDispatch();

  const moveToWalletManagement = () => {
    navigation('/wallet');
  };

  const moveToRechargeBinance = () => {
    dispatch(withdrawActions.resetAddUsdt());
    dispatch(withdrawActions.resetAddBinanceId());
    navigation('/withdraw/entry');
  };

  function handleInstruction() {
    navigation('/instruction/withdraw');
  }

  return (
    <Frame
      onMovePage={moveToWalletManagement}
      titlePage={t('ChooseMethodWithdraw.titlePage')}
      rightSection={<IconAlert onClick={handleInstruction} />}
    >
      <Center mt={14} mb={18}>
        <Text className="body_6-regular">{t('ChooseMethodWithdraw.label')}</Text>
      </Center>

      <Box px={16} mt={18}>
        <Group position="center" w={'100%'} spacing={23} mb={48} noWrap>
          <Stack onClick={moveToRechargeBinance} spacing={8} align="center" style={{ cursor: 'pointer' }}>
            <ImageBinance />
            <Text className="subtitle_4-bold">{t('ChooseMethodWithdraw.binance')}</Text>
          </Stack>
        </Group>

        {!!dataFeatures.length &&
          dataFeatures.map(feature => (
            <Group key={feature.id} position="apart" className={classes.GroupButton} onClick={() => navigation(feature.moveTo)}>
              <Text>{t(feature.label)}</Text>
              <IconRight />
            </Group>
          ))}
      </Box>
    </Frame>
  );
};

const useStyle = createStyles(theme => ({
  GroupButton: {
    background: 'var(--white)',
    border: '1px solid var(--grey-dark)',
    borderRadius: 8,
    padding: 10,
    cursor: 'pointer',
  },
}));
