import React, { useEffect, useState } from 'react';
import { Center, Stack, Text, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import UserInformation from './UserInformation';
import ContentTransaction from './ContentTransaction';
import { UseFormReturnType } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { transactionActions } from 'store/slice/transaction';
import { selectResponseOTP } from 'store/slice/transaction/selectors';
import Loading from 'app/components/Loading/Loading';

interface FormTransferByPhoneProps {
  form: UseFormReturnType<any>;
  handleGetOtpTransaction: () => void;
  loading: boolean;
  isTransferUSDT: boolean;
}

const FormTransferByPhone = ({ form, loading, handleGetOtpTransaction, isTransferUSDT }: FormTransferByPhoneProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const { coinId } = useParams();

  const dispatch = useDispatch();
  const responseOTP = useSelector(selectResponseOTP);

  return (
    <>
      <Loading visible={responseOTP.loading || loading} />
      <Stack className={classes.stack}>
        <Center>
          <Text className={classes.title}>{t("transfer.Receiver's information")}</Text>
        </Center>

        <form onSubmit={form.onSubmit(values => handleGetOtpTransaction())}>
          <UserInformation form={form} />
          <ContentTransaction isTransferUSDT={isTransferUSDT} form={form} />
        </form>
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

  title: {
    fontWeight: 500,
    fontSize: 18,
  },
}));

export default FormTransferByPhone;
