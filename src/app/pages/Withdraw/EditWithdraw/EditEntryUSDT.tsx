import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Center, Group, TextInput, Text, createStyles, Button, Divider, Box } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { rechargeActions } from 'store/slice/recharge';
import { selectAddBinanceId, selectAddUsdt, selectWithdrawFee } from 'store/slice/withdraw/selector';
import { START_STEP } from 'store/slice/recharge/types';
import { variable } from 'styles/variable';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { MyButton } from 'app/components/Button/MyButton';
import { Frame } from 'app/layouts/Frame';
import { withdrawActions } from 'store/slice/withdraw';
import { authActions } from 'store/slice/auth';
import { selectUserSeeAllCoinsInWallet } from 'store/slice/wallet/selectors';
import { IWalletTotal } from 'store/slice/wallet/response';
import { selectProfile } from 'store/slice/profile/selector';

type Props = {};

export const EditEntryUSDT = (props: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { detailWithdrawId } = useParams();

  const usdt = useSelector(selectAddUsdt);
  const binanceId = useSelector(selectAddBinanceId);
  const withdrawFee = useSelector(selectWithdrawFee);
  const profile = useSelector(selectProfile);
  const allCoinsInWallet = useSelector(selectUserSeeAllCoinsInWallet);

  const InputUSDTRef = useRef<HTMLInputElement>(null);
  const InputBinanceIdRef = useRef<HTMLInputElement>(null);

  const callbackGetValueCoinIsUSDT = useCallback((data: IWalletTotal[]): number => {
    const getIndexUsdt: number = data.map(coin => coin?.coin_id).indexOf(1);

    if (getIndexUsdt === -1) return 0;

    return data[getIndexUsdt].balance;
  }, []);

  const minimumUsdt = callbackGetValueCoinIsUSDT(allCoinsInWallet);

  const [errorEmpty, setErrorEmpty] = useState<boolean>(false);
  const [errorEmptyBinanceId, setErrorEmptyBinanceId] = useState<boolean>(false);

  const { classes } = useStyle({ errorBinanceId: errorEmptyBinanceId });

  const onChangeUsdt = event => {
    const value = event.target.value;
    dispatch(withdrawActions.setAddUsdt({ usdt: value }));
  };
  const handleChangeBinanceId = event => {
    const value = event.target.value;
    dispatch(withdrawActions.setAddBinanceId({ binanceId: value }));
  };

  const moveToChooseMethodWithdraw = () => {
    navigation('/withdraw');
  };

  function handleCheckInput(e) {
    const newValue = e.target.value.replace(/[^0-9.]/g, '');
    e.target.value = newValue;
  }

  const handleConfirm = () => {
    if (isNaN(Number(usdt)) || Number(usdt) <= 0) {
      setErrorEmpty(true);
      if (InputUSDTRef.current) InputUSDTRef.current.focus();
      return;
    }
    if (isNaN(Number(binanceId))) {
      setErrorEmptyBinanceId(true);
      if (InputBinanceIdRef.current) InputBinanceIdRef.current.focus();
      return;
    }

    if (Number(usdt) > minimumUsdt || usdt === '') {
      setErrorEmpty(true);
      if (InputUSDTRef.current) InputUSDTRef.current.focus();
      return;
    } else {
      setErrorEmpty(false);
    }

    if (binanceId === '' || Number(binanceId) === 0) {
      setErrorEmptyBinanceId(true);
      if (InputBinanceIdRef.current) InputBinanceIdRef.current.focus();
      return;
    } else setErrorEmptyBinanceId(false);

    dispatch(authActions.requestGetOtp(profile.phone_number));
    navigation(`/withdraw/edit/confirm/${detailWithdrawId}`);
  };

  const handleBlueInputUSDT = () => {
    if (Number(usdt) < minimumUsdt && usdt !== '') {
      setErrorEmpty(false);
      return;
    } else setErrorEmpty(true);
  };

  const handleBlueInputBinanceId = () => {
    if (binanceId !== '') {
      setErrorEmptyBinanceId(false);
      return;
    } else setErrorEmptyBinanceId(true);
  };

  return (
    <Frame onMovePage={moveToChooseMethodWithdraw} titlePage={t('Withdraw.titlePage')}>
      <Box px={16}>
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
            placeholder={`${t('Withdraw.entry_value')} ${numberWithCommas(minimumUsdt.toFixed(3))}`}
            value={usdt}
            onChange={event => onChangeUsdt(event)}
            onBlur={handleBlueInputUSDT}
            onInput={e => handleCheckInput(e)}
            ref={InputUSDTRef}
            classNames={{ root: classes.groupInputNumber, input: classes.textInput }}
            disabled
          />
          <Center className={classes.buttonExchange}>
            <Text>USDT</Text>
          </Center>
        </Group>

        {/* limit error*/}
        {errorEmpty && (
          <Text className="small_3-regular" c={errorEmpty ? variable.secondary.secondary2 : variable.neutral.grey}>
            {t('Withdraw.errorUSDT')} {numberWithCommas(minimumUsdt.toFixed(3))} USDT
          </Text>
        )}

        <Text c={'var(--primary-2)'} className="small_2-medium" mt={10}>
          {t('Withdraw.withdrawal_fee')} = {numberWithCommas(withdrawFee.toFixed(3))} USDT
        </Text>
        <Group position="apart" noWrap mt={8}>
          <Text className="body_4-bold">{t('RechargeWithBank.intoMoney')}</Text>
          <Text className="body_4-bold">{usdt ? numberWithCommas((Number(usdt) + withdrawFee).toFixed(3)) : 0} USDT</Text>
        </Group>

        <Divider mb={24} mt={24} />

        <Text mb={10} className="body_6-regular">
          {t('Withdraw.information_to_receive_money')}
        </Text>
        <Text mt={10} mb={4} className="body_4-bold">
          {t('Withdraw.entry_payid')}
        </Text>
        <TextInput
          placeholder={t('Withdraw.entry_payid')}
          value={binanceId}
          onChange={event => handleChangeBinanceId(event)}
          onBlur={handleBlueInputBinanceId}
          onInput={e => handleCheckInput(e)}
          classNames={{ root: classes.groupInputNumber, input: classes.textInputPayId }}
          ref={InputBinanceIdRef}
        />
        {/* limit error*/}
        {errorEmptyBinanceId && (
          <Text className="small_3-regular" c={variable.secondary.secondary2}>
            {t('Withdraw.errorEntryBinanceId')}
          </Text>
        )}

        <Group className={classes.groupButtonContinue}>
          <MyButton onClick={handleConfirm} w="100%" width_mobile="100%" h={44}>
            {t('Withdraw.confirm')}
          </MyButton>
        </Group>
      </Box>
    </Frame>
  );
};

const useStyle = createStyles((theme, params: { errorBinanceId: boolean }) => ({
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
    fontSize: '16px',
    fontWeight: 400,
  },
  groupInputNumber: {
    width: '100%',
  },
  textInputPayId: {
    height: '44px',
    width: '100%',
    padding: '0 16px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 400,
    border: `1px solid ${params.errorBinanceId ? variable.secondary.secondary2 : '#929292'}`,
    '&:focus': {
      border: `1px solid #929292`,
    },
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
