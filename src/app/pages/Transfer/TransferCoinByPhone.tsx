import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Frame } from 'app/layouts/Frame';
import { images } from 'assets/images';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { createStyles } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectResponse, selectResponseOTP, selectTransferPhoneData } from 'store/slice/transaction/selectors';
import { transactionActions } from 'store/slice/transaction';
import { store } from 'store/configureStore';
import { useForm } from '@mantine/form';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { walletActions } from 'store/slice/wallet';
import { selectWalletTotalCoin } from 'store/slice/wallet/selectors';
import Loading from 'app/components/Loading/Loading';
import TransactionInputOTP from './components/TransferByPhone/TransactionInputOTP';
import FormTransferByPhone from './components/TransferByPhone/FormTransferByPhone';
import { selectProfile, selectResponseProfile } from 'store/slice/profile/selector';
import CompleteTransfer from './components/TransferByPhone/CompleteTransfer';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import { FilledButton } from 'app/components/Button/FilledButton';
import { ReactComponent as IconAlert } from 'assets/icons/alert-circle.svg';

export function TransferCoinByPhone() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { classes } = makeStyles();
  const { coinId } = useParams();

  const dispatch = useDispatch();
  const response = useSelector(selectResponse);
  const responseOTP = useSelector(selectResponseOTP);
  const totalCoin = useSelector(selectWalletTotalCoin);

  const transferUser = useSelector(selectTransferPhoneData);
  const profile = useSelector(selectProfile);
  const responseProfile = useSelector(selectResponseProfile);
  const [complete, setComplete] = useState<boolean>(false);

  const [otp, setOtp] = useState('');
  const [opened, setOpened] = useState<boolean>(false);
  /*
    Check by message success or not to render
  */

  const form = useForm({
    initialValues: {
      coin_id: -1,
      coin_name: '',
      coin_avatar: '',
      exchange: '',
      content: '',
      fee: 0,
      receiver_id: -1,
      receiver_phone: '',
      receiver_nick_name: '',
    },

    validate: {
      exchange: value => {
        if (!value) {
          return t('transfer.Please enter quantity');
        }
        // Nhập nhỏ hơn min, balance lớn hơn min hoặc nhập lớn hơn balance
        if (
          (Number(value) < totalCoin?.min_transfer || Number(value) > totalCoin?.balance) &&
          totalCoin?.balance > totalCoin?.min_transfer
        )
          return `${t('transfer.Limit value from')} ${numberWithCommas(totalCoin?.min_transfer)} - ${numberWithCommas(
            totalCoin?.balance,
            2,
          )}`;

        // Nhập nhỏ hơn min, balance nhỏ hơn min
        if (Number(value) < totalCoin?.min_transfer && totalCoin?.balance < totalCoin?.min_transfer)
          return `${t('transfer.Limit value from')} ${numberWithCommas(totalCoin?.min_transfer)}`;

        // Nhập lớn hơn min, balance nhỏ hơn min
        if (Number(value) > totalCoin?.min_transfer && totalCoin?.balance < totalCoin?.min_transfer) {
          return t('transfer.Your coin balance is not enough !');
        }

        return null;
      },

      content: value => {
        if (value.length > 50) {
          return t('transfer.Do not enter more than 50 characters');
        }
      },
    },
  });

  function handleGetOtpTransaction() {
    // Kiểm tra nếu người dùng nhập sdt bản thân
    if (profile?.phone_number === transferUser.user?.profile?.phone_number) {
      setOpened(true);
      return;
    }
    dispatch(transactionActions.requestGetOTP({ phone: profile?.phone_number }));
  }

  // Chưa tối ưu 1 lần fetching lại ở đây
  useEffect(() => {
    if (coinId) dispatch(walletActions.requestGetTotalCoin({ coinId }));
  }, [coinId]);

  useEffect(() => {
    return () => {
      store.dispatch(transactionActions.resetResponseOTP());
      dispatch(transactionActions.resetDataUser());
    };
  }, []);

  function handleTransferCoin() {
    const payload = {
      otp: otp,
      coin_id: coinId,
      coin_name: totalCoin?.coin_name,
      coin_avatar: totalCoin?.coin_avatar,
      exchange: form.values?.exchange,
      fee: 0,
      content: form.values?.content,
      receiver_id: transferUser?.user?.userid,
      receiver_phone: transferUser?.user?.profile?.phone_number,
      receiver_nick_name: transferUser?.user?.profile?.name,
    };

    dispatch(transactionActions.requestTransferCoinByPhone(payload));
  }

  useEffect(() => {
    if (response.error === 0 && response.message === 'success') {
      setComplete(true);
    }
  }, [response]);

  useLayoutEffect(() => {
    if (profile) {
      form.setFieldValue('content', `${profile?.name} chuyển`);
    }
  }, [profile]);

  function handleCloseModal() {
    setOpened(false);
  }

  function handleInstruction() {
    navigate('/instruction/transfer-coin');
  }

  return (
    <>
      <Helmet>
        <title>{t('transfer.Transfer by phone number')}</title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Loading visible={responseProfile.loading} />
      <ModalConfirm
        title={t('transfer.You cannot make the transfer yourself! Please enter another phone number.')}
        opened={opened}
        onCloseModal={handleCloseModal}
        btnLeft={
          <FilledButton className={classes.buttonModal} h={45} onClick={handleCloseModal}>
            {t('transfer.Understood')}
          </FilledButton>
        }
      />
      {complete ? (
        <Frame
          titlePage={t('wallet.Transaction details')}
          onMovePage={() => {
            navigate(`/wallet/coin/${coinId}`);
          }}
          pb={40}
          rightSection={<IconAlert onClick={handleInstruction} />}
        >
          <CompleteTransfer form={form} isTransferUSDT={false} />
        </Frame>
      ) : (
        <Frame
          titlePage={t('transfer.Coin transfer')}
          onMovePage={() => {
            navigate(`/wallet/coin/${coinId}`);
          }}
          pb={40}
          rightSection={<IconAlert onClick={handleInstruction} />}
        >
          {responseOTP?.error === 0 ? (
            <TransactionInputOTP
              form={form}
              otp={otp}
              isTransferUSDT={false}
              setOtp={setOtp}
              handleTransferCoin={handleTransferCoin}
              handleGetOtpTransaction={handleGetOtpTransaction}
            />
          ) : (
            <FormTransferByPhone
              form={form}
              isTransferUSDT={false}
              handleGetOtpTransaction={handleGetOtpTransaction}
              loading={responseProfile.loading}
            />
          )}
        </Frame>
      )}
    </>
  );
}

const makeStyles = createStyles(() => ({
  buttonModal: {
    flex: 1,
    fontSize: '16px !important',
  },
}));
