import React, { useEffect, useState } from 'react';
import { Divider, Flex, Stack, Text, TextInput, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { variable } from 'styles/variable';
import { UseFormReturnType } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { transactionActions } from 'store/slice/transaction';
import { selectResponseUser, selectTransferPhoneData } from 'store/slice/transaction/selectors';
import Loading from 'app/components/Loading/Loading';
import { selectWalletTotalCoin } from 'store/slice/wallet/selectors';
import { selectProfile } from 'store/slice/profile/selector';

interface UserInformationProps {
  form: UseFormReturnType<any>;
}

const UserInformation = ({ form }: UserInformationProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const profileUser = useSelector(selectProfile);

  const transferData = useSelector(selectTransferPhoneData);
  const responseUser = useSelector(selectResponseUser);
  const totalCoin = useSelector(selectWalletTotalCoin);

  const { classes } = makeStyles();

  function handleSearchUser() {
    // Remove 0 in first if exist
    let phone = form.values.receiver_phone;
    // Xem xét check 10 số
    if (phone.length <= 0) return;

    if (form.values.receiver_phone[0] === '0') {
      phone = phone.substring(1);
    }
    // Kiểm tra nếu nhập số 84 ở đầu - chưa tối ưu (lỗi nếu nhập sđt nước khác ngoài VN)
    if (form.values.receiver_phone[0] === '8' && form.values.receiver_phone[1] === '4') {
      phone = phone;
    } else {
      phone = '84' + phone;
    }

    // Chưa tối ưu 1 lượt fetching lại ở đây
    dispatch(transactionActions.resetDataUser());
    dispatch(transactionActions.resetResponseUser());
    dispatch(transactionActions.requestGetUserInformation({ phone }));
  }

  useEffect(() => {
    if (responseUser.error === 0) {
      form.setFieldValue('receiver_phone', transferData?.user?.profile?.phone_number);
      form.setFieldValue('receiver_nick_name', transferData?.user?.profile?.name);
    } else if (responseUser.error === 10) {
      form.setFieldError('receiver_phone', t('transfer.Incorrect phone number'));
    } else if (responseUser.error === 11) {
      form.setFieldError('receiver_phone', 'Tài khoản đang tạm khóa');
    }
  }, [responseUser]);

  useEffect(() => {
    return () => {
      dispatch(transactionActions.resetResponseUser());
    };
  }, []);

  return (
    <>
      <Loading visible={responseUser.loading} />
      <Stack>
        <TextInput
          label={t('transfer.Phone number')}
          placeholder={t('transfer.Enter phone number')}
          withAsterisk={true}
          classNames={{ input: classes.input, label: classes.label }}
          {...form.getInputProps('receiver_phone')}
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          onBlur={handleSearchUser}
          onFocus={() => {
            dispatch(transactionActions.resetDataUser());
          }}
        />
        <Flex className={classes.flex}>
          <Text className={classes.nickname}>{t('transfer.Nickname')}</Text>
          <Text className={classes.nickname} color={variable.primary.primary2}>
            {transferData?.user?.profile?.name}
          </Text>
        </Flex>
        <Divider color={variable.neutral.light} />
      </Stack>
    </>
  );
};

const makeStyles = createStyles(theme => ({
  input: {
    border: '1px solid #929292',
    height: 44,
    borderRadius: 8,

    ':focus, :focus-within': {
      borderColor: 'var(--primary-2)',
    },
  },

  label: {
    fontSize: 14,
    fontWeight: 600,
  },

  flex: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  nickname: {
    fontWeight: 600,
    fontSize: 14,
  },
}));

export default UserInformation;
