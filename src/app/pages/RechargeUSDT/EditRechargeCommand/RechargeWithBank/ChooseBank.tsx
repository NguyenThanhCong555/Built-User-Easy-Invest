import React, { useEffect } from 'react';
import { Avatar, Box, Center, Group, Text, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAddUsdt,
  selectChooseBankId,
  selectErrorRechargeResponse,
  selectListBank,
  selectOperationStep,
} from 'store/slice/recharge/selector';
import { rechargeActions } from 'store/slice/recharge';
import { MyButton } from 'app/components/Button/MyButton';
import { INITIAL_VALUE, RESPONSE_SUCCESS_ERROR } from 'constants/common';
import { useNavigate, useParams } from 'react-router-dom';
import { variable } from 'styles/variable';
import { CHOOSE_A_BANK_STEP } from 'store/slice/recharge/types';
import { EditRechargeRequest, RechargeRequest } from 'store/slice/recharge/request';
import { DEFAULT_USDT_ID, RECHARGE_MONEY_CODE } from 'constants/account';

type Props = {};

export const EditChooseBank = (props: Props) => {
  const { t } = useTranslation();
  const { classes } = useStyle();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { detailRechargeId } = useParams();

  const bankingId = useSelector(selectChooseBankId);
  const operationStep = useSelector(selectOperationStep);
  const listBank = useSelector(selectListBank);
  const usdt = useSelector(selectAddUsdt);
  const errorRecharge = useSelector(selectErrorRechargeResponse);

  useEffect(() => {
    if (operationStep !== CHOOSE_A_BANK_STEP) dispatch(rechargeActions.setOperationStep({ step: CHOOSE_A_BANK_STEP }));
  }, [operationStep]);

  useEffect(() => {
    if (Number(usdt) === 0) {
      navigation(`/recharge/edit/bank/${detailRechargeId}`);
      return;
    }
  }, []);

  useEffect(() => {
    if (errorRecharge === RESPONSE_SUCCESS_ERROR) {
      dispatch(rechargeActions.increaseOperationStep());
      navigation(`/recharge/edit/bank/complete/${detailRechargeId}`);
    }
    return () => {
      dispatch(rechargeActions.resetResponseErrorRecharge());
      dispatch(rechargeActions.resetLoadingRechargeUsdt());
    };
  }, [errorRecharge]);

  const handleChooseBanking = (id: number) => {
    if (bankingId === id) return;

    dispatch(rechargeActions.setChooseBankId({ bankingId: id }));
  };

  const handleContinue = () => {
    if (bankingId === INITIAL_VALUE) return;

    if (Number(usdt) === 0 || !bankingId) {
      navigation('/recharge');
      return;
    }

    const payload: EditRechargeRequest = {
      id: Number(detailRechargeId),
      content: 'AB12NSK2',
      coin_id: DEFAULT_USDT_ID,
      exchange: Number(usdt),
      service: RECHARGE_MONEY_CODE,
      banking_account_id: bankingId,
    };

    dispatch(rechargeActions.requestEditRechargeUsdt(payload));
  };

  return (
    <>
      <Center>
        <Text mt={14} className="body_6-regular">
          {t('RechargeWithBank.chooseBankTItle')}
        </Text>
      </Center>

      <Box className={classes.boxGrip}>
        {!!listBank.length &&
          listBank.map(bank => (
            <Group position="center">
              <Group
                key={bank.id}
                onClick={() => handleChooseBanking(bank.id)}
                bg={bankingId === bank.id ? 'var(--primary-2)' : 'var(--white)'}
                c={bankingId === bank.id ? 'var(--white)' : 'var(--black)'}
                className={classes.groupCardBank}
                noWrap
              >
                <Avatar src={bank.banking_logo} w={46} h={46} radius={100} />
                <Text className="body_4-bold" lineClamp={1}>
                  {bank.banking_name}
                </Text>
              </Group>
            </Group>
          ))}
      </Box>

      <Group className={classes.groupButtonContinue}>
        <MyButton onClick={handleContinue} w="100%" width_mobile="100%" h={44}>
          {t('RechargeWithBank.buttonContinue')}
        </MyButton>
      </Group>
    </>
  );
};

const useStyle = createStyles(() => ({
  boxGrip: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridGap: '12px 15px',
    marginTop: '18px',

    '@media (min-width:576px)': {
      gridTemplateColumns: 'auto auto auto',
      gridGap: '12px 0px',
    },
  },

  groupCardBank: {
    width: '164px',
    height: '54px',
    background: 'var(--white)',
    border: `1px solid var(--grey-medium)`,
    borderRadius: '8px',
    gap: 3,
    padding: '4px 7.5px',
    cursor: 'pointer',
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
