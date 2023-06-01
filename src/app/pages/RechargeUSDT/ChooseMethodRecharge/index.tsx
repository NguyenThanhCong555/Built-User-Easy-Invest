import { Avatar, Center, Group, Text, Box, Stack, createStyles, Modal } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Frame } from 'app/layouts/Frame';

import { ReactComponent as ImageBinance } from 'assets/images/ChooseMethodRecharge/binance.svg';
import { ReactComponent as ImageBanking } from 'assets/images/ChooseMethodRecharge/banking.svg';

import { ReactComponent as IconAlert } from 'assets/icons/alert-circle.svg';
import { ReactComponent as IconRight } from 'assets/icons/arrow/arrow-right-grey.svg';
import { useDispatch, useSelector } from 'react-redux';
import { rechargeActions } from 'store/slice/recharge';
import { selectLimitRequestRecharge } from 'store/slice/recharge/selector';
import { ConfirmAskPopup } from 'app/components/Popup/ConfirmAskPoppup';

type Props = {};

const dataFeatures = [
  {
    id: 1,
    label: 'ChooseMethodRecharge.loadingHistory',
    moveTo: '/recharge/history',
  },
];

export const ChooseMethodRecharge = (props: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { classes } = useStyle();
  const dispatch = useDispatch();

  const limitRecharge = useSelector(selectLimitRequestRecharge);

  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const moveToWalletManagement = () => {
    navigation('/wallet');
  };

  const moveToRechargeBanking = () => {
    if (limitRecharge <= -1 || limitRecharge >= 3) {
      setOpenPopup(true);
      return;
    }

    navigation('/recharge/bank');
  };

  const moveToRechargeBinance = () => {
    if (limitRecharge <= -1 || limitRecharge >= 3) {
      setOpenPopup(true);
      return;
    }

    navigation('/recharge/binance');
  };

  useEffect((): any => {
    dispatch(rechargeActions.requestLimitRecharge());

    return () => dispatch(rechargeActions.resetAddUsdt());
  }, []);

  function handleInstruction() {
    navigation('/instruction/recharge');
  }

  return (
    <>
      <Frame
        onMovePage={moveToWalletManagement}
        titlePage={t('ChooseMethodRecharge.titlePage')}
        rightSection={<IconAlert onClick={handleInstruction} />}
      >
        <Center mt={14} mb={18}>
          <Text className="body_6-regular">{t('ChooseMethodRecharge.label')}</Text>
        </Center>
        <Box px={16} mt={18}>
          <Group position="center" w={'100%'} spacing={23} mb={48} noWrap>
            <Stack onClick={moveToRechargeBanking} spacing={8} align="center" style={{ cursor: 'pointer' }}>
              <ImageBanking />
              <Text className="subtitle_4-bold">{t('ChooseMethodRecharge.bank')}</Text>
            </Stack>
            <Stack onClick={moveToRechargeBinance} spacing={8} align="center" style={{ cursor: 'pointer' }}>
              <ImageBinance />
              <Text className="subtitle_4-bold">{t('ChooseMethodRecharge.binance')}</Text>
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

      <Modal
        opened={openPopup}
        onClose={() => {
          setOpenPopup(false);
        }}
        centered
        withCloseButton={false}
        padding={0}
        radius={20}
      >
        <ConfirmAskPopup
          title={t('RechargeWithBank.titlePopup')}
          cancelText={t('Popup.cancel')}
          successText={t('RechargeWithBank.rechargeHistory')}
          onClose={() => {
            setOpenPopup(false);
          }}
          onCancel={() => setOpenPopup(false)}
          onSuccess={() => navigation('/recharge/history')}
        />
      </Modal>
    </>
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
