import React, { useEffect, useLayoutEffect, useState } from 'react';
import PromptForm from 'app/components/PromptForm/PromptForm';
import { UseFormReturnType } from '@mantine/form';
import { Center, Divider, Flex, PinInput, Stack, Text, createStyles } from '@mantine/core';
import { variable } from 'styles/variable';
import { useInterval } from '@mantine/hooks';
import { SubtleButton } from 'app/components/Button/SubtleButton';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserSeeAllCoinsInWallet, selectWalletTotalCoin } from 'store/slice/wallet/selectors';
import ConvertDate from 'helpers/formatDate';
import { selectResponse } from 'store/slice/transaction/selectors';
import { useTranslation } from 'react-i18next';
import { transactionActions } from 'store/slice/transaction';
import ModalSuccess from 'app/components/Modal/ModalSuccess';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from 'app/components/Loading/Loading';

interface TransactionInputOTPProps {
  form: UseFormReturnType<any>;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  handleTransferCoin: () => void;
  handleGetOtpTransaction: () => void;
  isTransferUSDT: boolean;
}

const TransactionInputOTP = ({
  form,
  otp,
  setOtp,
  handleTransferCoin,
  isTransferUSDT,
  handleGetOtpTransaction,
}: TransactionInputOTPProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const { coinId } = useParams();
  const [seconds, setSeconds] = useState<number>(60);
  const [dataCoin, setDataCoin] = useState<any>(null);

  const data = useSelector(selectUserSeeAllCoinsInWallet);
  const totalCoin = useSelector(selectWalletTotalCoin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [isPrompt, setIsPrompt] = useState(true);

  const response = useSelector(selectResponse);
  const interval = useInterval(() => setSeconds(s => s - 1), 1000);

  useLayoutEffect(() => {
    if (isTransferUSDT) {
      if (data) {
        const item = data?.find((item, _) => item?.coin_name === 'USDT');
        setDataCoin(item);
      }
    } else {
      if (totalCoin) {
        setDataCoin(totalCoin);
      }
    }
  }, [data, totalCoin]);

  useEffect(() => {
    if (seconds) {
      interval.start();
    } else {
      interval.stop();
    }
    return interval.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  useEffect(() => {
    if (response.error === 0 && response.message === 'success') {
      setIsPrompt(false);

      interval.stop();

      // setTimeout(() => {
      //   setOpened(false);
      //   navigate(`/wallet/coin/${coinId}`);
      // }, 1000);
    }
  }, [response]);

  useEffect(() => {
    return () => {
      setOtp('');
      dispatch(transactionActions.resetResponse());
    };
  }, []);

  return (
    <>
      <PromptForm visible={isPrompt} title={t('transfer.The transaction will be cancelled, are you sure you want to leave?')} />
      <ModalSuccess
        title={t('transfer.Successful transaction!')}
        opened={opened}
        setOpened={setOpened}
        onClose={() => navigate(`/wallet`)}
      />
      <Loading visible={response.loading} />
      <Stack className={classes.stack}>
        <Stack className={classes.stackInfo}>
          <Center className={classes.centerInfo}>
            <Text className={classes.textCenterInfo}>{t('transfer.Transaction information')}</Text>
          </Center>

          <Stack className={classes.stackItem}>
            <Flex className={classes.flexItem}>
              <Text className={classes.text}>{t('transfer.Phone number')}:</Text>
              <Text className={classes.text}>{form.values?.receiver_phone}</Text>
            </Flex>

            <Flex className={classes.flexItem}>
              <Text className={classes.text}>{t('transfer.Nickname')}:</Text>
              <Text className={classes.text}>{form.values?.receiver_nick_name}</Text>
            </Flex>

            <Divider className={classes.divider} color={variable.neutral.light} />

            <Flex className={classes.flexItem}>
              <Text className={classes.text}>{t('transfer.Quantity')}:</Text>
              <Text className={classes.text}>
                {numberWithCommas(form.values?.exchange)} {dataCoin?.coin_name}
              </Text>
            </Flex>

            <Flex className={classes.flexItem}>
              <Text className={classes.text}>{t('transfer.Transfer fees')}:</Text>
              <Text className={classes.text}>0 {dataCoin?.coin_name}</Text>
            </Flex>

            <Flex className={classes.flexItem}>
              <Text className={classes.text}>{t('transfer.Total')}:</Text>
              <Text className={classes.text}>
                {numberWithCommas(form.values?.exchange)} {dataCoin?.coin_name}
              </Text>
            </Flex>

            <Flex className={classes.flexItem}>
              <Text className={classes.text}>{t('transfer.Transaction time')}:</Text>
              <Text className={classes.text}>{ConvertDate.getDDMMYY(new Date())}</Text>
            </Flex>
          </Stack>
        </Stack>

        <Stack className={classes.stackOTP}>
          <Text className={classes.titleOTP}>{t('Login.Please enter the OTP that was sent via your Telegram.')}</Text>

          <Stack spacing={10}>
            <PinInput
              type="number"
              length={6}
              placeholder=""
              classNames={{
                root: classes.rootInput,
                wrapper: classes.wrapperInput,
                input: classes.input,
              }}
              value={otp}
              autoFocus={true}
              onChange={value => {
                setOtp(value);
              }}
              onComplete={handleTransferCoin}
            />

            {response.error === 15 || seconds === 0 ? (
              <Flex className={classes.validOtp}>
                <Text>{t('Login.The OTP has expired.')}</Text>{' '}
                <SubtleButton
                  className={classes.sendBtn}
                  onClick={() => {
                    handleGetOtpTransaction();
                    setSeconds(60);
                  }}
                >
                  {t('Login.Send back!')}
                </SubtleButton>
              </Flex>
            ) : response.error === 16 ? (
              <Text className={classes.validOtp} color={variable.secondary.secondary2}>
                {t('Login.OTP code is incorrect')}
              </Text>
            ) : seconds !== 0 ? (
              <Text className={classes.validOtp}>
                {t('Login.OTP code is valid for')} {seconds}s
              </Text>
            ) : (
              <></>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

const makeStyles = createStyles(() => ({
  stack: {
    padding: '14px 30px 0 30px',

    '@media (max-width: 768px)': {
      padding: '14px 14px 0 14px',
    },
  },

  stackInfo: {
    gap: 12,
    border: '1px solid #D6D6D6',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: 8,
    overflow: 'hidden',
  },

  stackItem: {
    padding: 8,
    gap: 5,
  },

  stackOTP: {
    marginTop: 40,
    alignItems: 'center',
  },

  centerInfo: {
    backgroundColor: variable.primary.primary2,
    height: 43,
  },

  textCenterInfo: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 16,
  },

  title: {
    fontWeight: 500,
    fontSize: 18,
  },

  flexItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  text: {
    fontWeight: 500,
    fontSize: 14,
  },

  divider: {
    margin: '12px 0',
  },

  rootInput: {
    gap: 12,
  },

  wrapperInput: {
    width: 52,
    height: 54,
    borderRadius: 8,
    '@media (max-width: 768px)': {
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
    fontWeight: 700,
    fontSize: 20,
  },

  titleOTP: {
    fontWeight: 500,
    fontSize: 16,
    textAlign: 'center',
  },

  textOTP: {
    fontWeight: 500,
    fontSize: 14,
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
}));

export default TransactionInputOTP;
