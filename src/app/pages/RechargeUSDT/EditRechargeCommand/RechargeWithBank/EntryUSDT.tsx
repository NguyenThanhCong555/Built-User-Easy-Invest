import React, { useCallback, useEffect, useState } from 'react';
import { Center, Group, TextInput, Text, createStyles, Button, Divider } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { rechargeActions } from 'store/slice/recharge';
import { selectAddUsdt, selectOperationStep, selectTransferHistory } from 'store/slice/recharge/selector';
import { START_STEP, TransferHistory } from 'store/slice/recharge/types';
import { variable } from 'styles/variable';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { MyButton } from 'app/components/Button/MyButton';

type Props = {};

const dataChooseUsdt: { id: number; usdt: string }[] = [
  {
    id: 1,
    usdt: '100',
  },
  {
    id: 2,
    usdt: '1000',
  },
  {
    id: 3,
    usdt: '10000',
  },
  {
    id: 4,
    usdt: '100000',
  },
];

export const EditEntryUSDT = (props: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { classes } = useStyle();
  const { detailRechargeId } = useParams();

  const transferHistory = useSelector(selectTransferHistory);
  const operationStep = useSelector(selectOperationStep);
  const usdt = useSelector(selectAddUsdt);
  const VNDPerUSDT = 23239;

  const [errorEmpty, setErrorEmpty] = useState<boolean>(false);
  const [chooseUsdt, setChooseUsdt] = useState<string>('0');

  const callbackGetDetailOfRechargeHistory = useCallback(
    (listHistory: TransferHistory[], detailRechargeId: number): TransferHistory | undefined => {
      for (let history of listHistory) {
        if (history.id === detailRechargeId) return history;
      }
      return undefined;
    },
    [],
  );
  const detailHistoryRecharge = callbackGetDetailOfRechargeHistory(transferHistory, Number(detailRechargeId));
  console.log(detailHistoryRecharge);

  // useEffect(() => {
  //   dispatch(rechargeActions.setAddUsdt({ usdt: String(detailHistoryRecharge?.exchange) }));
  // }, []);

  useEffect(() => {
    if (operationStep !== START_STEP) dispatch(rechargeActions.setOperationStep({ step: START_STEP }));
  }, [operationStep]);

  const onChangeUsdt = event => {
    const value = event.target.value;
    dispatch(rechargeActions.setAddUsdt({ usdt: value }));
  };

  function handleCheckInput(e) {
    const newValue = e.target.value.replace(/[^0-9.]/g, '');
    e.target.value = newValue;
  }

  const handleChooseUSDT = (usdt: string) => {
    dispatch(rechargeActions.setAddUsdt({ usdt }));
    setChooseUsdt(usdt);
  };

  const handleContinue = () => {
    if (Number(usdt) < 10) {
      setErrorEmpty(true);
      return;
    }

    dispatch(rechargeActions.increaseOperationStep());
    navigation(`/recharge/edit/bank/choose/${detailRechargeId}`, { state: { usdt } });
  };

  return (
    <>
      <Text mt={14} className="body_4-bold">
        {t('RechargeWithBank.amount')}
      </Text>
      <Group
        spacing={0}
        radioGroup="8px"
        noWrap
        className={classes.researchGroupInput}
        style={{ border: `1px solid ${errorEmpty ? variable.secondary.secondary2 : variable.neutral.grey}` }}
      >
        <TextInput
          placeholder={t('RechargeWithBank.amount')}
          value={usdt}
          onChange={event => onChangeUsdt(event)}
          onInput={e => handleCheckInput(e)}
          classNames={{ root: classes.groupInputNumber, input: classes.textInput }}
        />
        <Center className={classes.buttonExchange}>
          <Text>USDT</Text>
        </Center>
      </Group>

      {/* limit error*/}
      {errorEmpty && (
        <Text className="small_3-regular" c={errorEmpty ? variable.secondary.secondary2 : variable.neutral.grey}>
          {t('RechargeWithBank.errorEmpty')}
        </Text>
      )}

      <Group position="apart" spacing={13} noWrap mt={16} mb={24}>
        {!!dataChooseUsdt.length &&
          dataChooseUsdt.map(USDT => (
            <Button
              key={USDT.id}
              bg={chooseUsdt === USDT.usdt ? 'var(--primary-5)' : '#F3F3F3'}
              c={chooseUsdt === USDT.usdt ? 'var(--black)' : 'var(--grey-dark)'}
              onClick={() => handleChooseUSDT(USDT.usdt)}
              className={classes.buttonChooseUSDT}
            >
              {USDT.usdt}
            </Button>
          ))}
      </Group>

      <Divider mb={24} />

      <Text c={'var(--primary-2)'} className="small_2-medium">
        {t('RechargeWithBank.rateCurrent')} = {numberWithCommas(VNDPerUSDT.toFixed(3))} VND/USDT
      </Text>
      <Group position="apart" noWrap mt={8}>
        <Text className="body_4-bold">{t('RechargeWithBank.intoMoney')}</Text>
        <Text className="body_4-bold">{usdt ? numberWithCommas((Number(usdt) * VNDPerUSDT).toFixed(3)) : 0} VND</Text>
      </Group>

      <Group className={classes.groupButtonContinue}>
        <MyButton onClick={handleContinue} w="100%" width_mobile="100%" h={44}>
          {t('RechargeWithBank.buttonContinue')}
        </MyButton>
      </Group>
    </>
  );
};

const useStyle = createStyles(() => ({
  researchGroupInput: {
    borderRadius: '8px',
    border: `1px solid ${variable.neutral.grey}`,
    marginTop: 2,
  },

  textInput: {
    height: '44px',
    width: '100%',
    border: 'none',
    padding: '0 16px',
    borderRadius: '10px',
  },
  groupInputNumber: {
    width: '100%',
  },

  buttonExchange: {
    height: '44px',
    width: '78px',
    background: variable.primary.primary5,
    borderRadius: '0 8px 8px 0',
  },

  buttonChooseUSDT: {
    flex: '1 1 76px',
    border: 'transparent',
    minWidth: '76px',
    paddingRight: '5px',
    paddingLeft: '5px',

    '&:hover': {
      background: variable.primary.primary5,
      filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    },
  },

  groupButtonContinue: {
    width: '100%',
    padding: '10px 16px',
    marginTop: '40px',

    '@media (max-width : 576px)': {
      position: 'fixed',
      bottom: 0,
      left: 0,
      background: variable.neutral.whiteLight,
    },
  },
}));
