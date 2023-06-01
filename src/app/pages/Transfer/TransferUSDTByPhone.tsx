import React, { useEffect, useLayoutEffect, useState } from 'react';
import { createStyles } from '@mantine/core';
import { useForm } from '@mantine/form';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { store } from 'store/configureStore';
import { selectProfile, selectResponseProfile } from 'store/slice/profile/selector';
import { transactionActions } from 'store/slice/transaction';
import { selectResponse, selectResponseOTP, selectTransferPhoneData } from 'store/slice/transaction/selectors';
import { walletActions } from 'store/slice/wallet';
import { selectUserSeeAllCoinsInWallet, selectWalletTotalCoin } from 'store/slice/wallet/selectors';
import { Helmet } from 'react-helmet-async';
import { images } from 'assets/images';
import Loading from 'app/components/Loading/Loading';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import { MyButton } from 'app/components/Button/MyButton';
import { Frame } from 'app/layouts/Frame';
import TransactionInputOTP from './components/TransferByPhone/TransactionInputOTP';
import FormTransferByPhone from './components/TransferByPhone/FormTransferByPhone';
import { useDisclosure } from '@mantine/hooks';
import CompleteTransfer from './components/TransferByPhone/CompleteTransfer';
import { FilledButton } from 'app/components/Button/FilledButton';
import { ReactComponent as IconAlert } from 'assets/icons/alert-circle.svg';

export function TransferUSDTByPhone() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { classes } = makeStyles();
  const { coinId } = useParams();

  const dispatch = useDispatch();
  const response = useSelector(selectResponse);
  const responseOTP = useSelector(selectResponseOTP);

  const data = useSelector(selectUserSeeAllCoinsInWallet);

  //   const totalCoin = useSelector(selectWalletTotalCoin);

  const transferUser = useSelector(selectTransferPhoneData);
  const profile = useSelector(selectProfile);
  const responseProfile = useSelector(selectResponseProfile);

  const [otp, setOtp] = useState('');
  const [totalCoin, setTotalCoin] = useState<any>(null);
  const [complete, setComplete] = useState<boolean>(false);

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

  useLayoutEffect(() => {
    dispatch(walletActions.request_SeeAllCoinsInWallet(true));
  }, []);

  useEffect(() => {
    return () => {
      store.dispatch(transactionActions.resetResponseOTP());
      dispatch(transactionActions.resetDataUser());
    };
  }, []);

  function handleTransferCoin() {
    const payload = {
      otp: otp,
      coin_id: totalCoin?.coin_id,
      coin_name: totalCoin?.coin_name,
      coin_avatar: '',
      exchange: form.values?.exchange,
      fee: 0,
      content: form.values?.content,
      receiver_id: transferUser?.user?.userid,
      receiver_phone: transferUser?.user?.profile?.phone_number,
      receiver_nick_name: transferUser?.user?.profile?.name,
    };

    dispatch(transactionActions.requestTransferCoinByPhone(payload));
  }

  useLayoutEffect(() => {
    if (data) {
      const item = data?.find((item, _) => item?.coin_name === 'USDT');
      setTotalCoin(item);
    }
  }, [data]);

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
            navigate(`/wallet`);
          }}
          pb={40}
          rightSection={<IconAlert onClick={handleInstruction} />}
        >
          <CompleteTransfer form={form} isTransferUSDT={true} />
        </Frame>
      ) : (
        <Frame
          titlePage={t('transfer.Coin transfer')}
          onMovePage={() => {
            navigate(`/wallet`);
          }}
          pb={40}
          rightSection={<IconAlert onClick={handleInstruction} />}
        >
          {responseOTP?.error === 0 ? (
            <TransactionInputOTP
              form={form}
              isTransferUSDT={true}
              otp={otp}
              setOtp={setOtp}
              handleTransferCoin={handleTransferCoin}
              handleGetOtpTransaction={handleGetOtpTransaction}
            />
          ) : (
            <FormTransferByPhone
              form={form}
              isTransferUSDT={true}
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
