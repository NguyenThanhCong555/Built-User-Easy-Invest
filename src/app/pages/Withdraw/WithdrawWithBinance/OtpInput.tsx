import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { Flex, Group, PinInput, Text, createStyles } from '@mantine/core';

import { media } from 'styles/media';
import { authActions } from 'store/slice/auth';
import { SubtleButton } from 'app/components/Button/SubtleButton';
import { selectAuth } from 'store/slice/auth/selectors';
import { withdrawActions } from 'store/slice/withdraw';
import { WithdrawRequest } from 'store/slice/withdraw/request';
import { dataBinanceAccount } from '../data';
import { DEFAULT_USDT_ID, WITHDRAW_MONEY_CODE } from 'constants/account';
import { selectAddBinanceId, selectAddUsdt, selectErrorWithdrawResponse, selectWithdrawFee } from 'store/slice/withdraw/selector';
import { useNavigate } from 'react-router-dom';
import { selectProfile } from 'store/slice/profile/selector';
import { RESPONSE_ERROR_EXPIRED_OTP_WITHDRAW, RESPONSE_ERROR_INVALID_OTP_WITHDRAW } from 'store/slice/withdraw/types';

interface Props {
  phone?: string;
  onSendBack?: () => void;
}
const OtpInput = memo(({ phone, onSendBack }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { cx, classes } = makeStyles();
  const navigation = useNavigate();

  const profile = useSelector(selectProfile);
  const usdt = useSelector(selectAddUsdt);
  const binanceId = useSelector(selectAddBinanceId);
  const withdrawFee = useSelector(selectWithdrawFee);
  const responseErrorWithdraw = useSelector(selectErrorWithdrawResponse);
  // State
  const [seconds, setSeconds] = useState<number>(60);
  const [otp, setOtp] = useState<string>('');
  const interval = useInterval(() => setSeconds(s => s - 1), 1000);

  useEffect(() => {
    if (seconds) {
      interval.start();
    } else {
      interval.stop();
    }
    return interval.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  // Func
  const handleCompleteOtpInput = () => {
    if (Number(usdt) === 0) {
      navigation('/withdraw/entry');
      return;
    }
    if (!dataBinanceAccount?.accountNumber || !dataBinanceAccount?.bankName) return;

    const payload: WithdrawRequest = {
      otp: otp,
      coin_id: DEFAULT_USDT_ID,
      content: 'AB12NSK2',
      exchange: Number(usdt) + withdrawFee,
      service: WITHDRAW_MONEY_CODE,
      other: {
        account_number: binanceId,
        account_name: profile.name,
        banking: dataBinanceAccount?.bankName,
        banking_logo: dataBinanceAccount?.avatarBank,
      },
    };

    dispatch(withdrawActions.requestWithdrawUsdt(payload));
  };

  const handleSendBack = () => {
    setOtp('');
    setSeconds(60);
    dispatch(withdrawActions.resetResponseErrorWithdraw());
    dispatch(authActions.requestGetOtp(profile.phone_number));
  };

  return (
    <div>
      <Text className={cx('body_5-medium', classes.tutorial)}>{t('Withdraw.pleaseOTP')}</Text>
      <Group position="center" className={classes.groupInput}>
        <PinInput
          type="number"
          length={6}
          placeholder=""
          classNames={{
            root: classes.rootInput,
            wrapper: classes.wrapperInput,
            input: cx('subtitle_4-bold', classes.input),
          }}
          value={otp}
          autoFocus={true}
          onChange={setOtp}
          onComplete={handleCompleteOtpInput}
        />
        {responseErrorWithdraw === RESPONSE_ERROR_EXPIRED_OTP_WITHDRAW || seconds === 0 ? (
          <Flex className={cx('small_3-regular', classes.validOtp)}>
            <Text>{t('Login.The OTP has expired.')}</Text>{' '}
            <SubtleButton className={classes.sendBtn} onClick={() => handleSendBack()}>
              {t('Login.Send back!')}
            </SubtleButton>
          </Flex>
        ) : responseErrorWithdraw === RESPONSE_ERROR_INVALID_OTP_WITHDRAW ? (
          <Text className={cx('small_3-regular', classes.red, classes.validOtp)}>{t('Login.OTP code is incorrect')}</Text>
        ) : seconds !== 0 ? (
          <Text className={cx('small_3-regular', classes.validOtp)}>
            {t('Login.OTP code is valid for')} {seconds}s
          </Text>
        ) : (
          <></>
        )}
      </Group>
    </div>
  );
});

export default OtpInput;

const makeStyles = createStyles(() => ({
  tutorial: {
    textAlign: 'center',
    padding: '24px 0px 18px',
  },
  groupInput: {
    gap: 0,
    width: '100%',
  },
  wrapperInput: {
    width: 52,
    height: 54,
    borderRadius: 8,
    [media.small()]: {
      width: 47,
      height: 48,
    },
  },
  input: {
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: 8,
    backgroundColor: 'var(--primary-5)',
  },
  rootInput: {
    gap: 12,
  },
  validOtp: {
    width: '100%',
    maxWidth: 372,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sendBtn: {
    height: '20px !important',
    fontWeight: 700,
    padding: '0px 0px 0px 5px !important',
    color: 'var(--primary-2)',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  red: {
    color: '#F20000',
  },
}));
