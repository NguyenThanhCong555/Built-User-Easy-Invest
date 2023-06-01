import React, { useLayoutEffect, useState } from 'react';
import { Box, FocusTrap, Group, Stack, Text, TextInput, createStyles } from '@mantine/core';
import { MyButton } from 'app/components/Button/MyButton';
import { variable } from 'styles/variable';
import { UseFormReturnType } from '@mantine/form';
import { useSelector } from 'react-redux';
import { selectTransferPhoneData } from 'store/slice/transaction/selectors';
import { selectUserSeeAllCoinsInWallet, selectWalletTotalCoin } from 'store/slice/wallet/selectors';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@mantine/hooks';

interface ContentTransactionProps {
  form: UseFormReturnType<any>;
  isTransferUSDT: boolean;
}
const ContentTransaction = ({ form, isTransferUSDT }: ContentTransactionProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const transferData = useSelector(selectTransferPhoneData);
  const totalCoin = useSelector(selectWalletTotalCoin);
  const data = useSelector(selectUserSeeAllCoinsInWallet);
  const [active, { toggle }] = useDisclosure(false);
  const [dataCoin, setDataCoin] = useState<any>(null);

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

  return (
    <Stack className={classes.stack}>
      <FocusTrap active={active}>
        <TextInput
          label={t('transfer.Quantity')}
          // placeholder={`Giá trị từ ${numberWithCommas(totalCoin?.min_transfer)} - ${numberWithCommas(totalCoin?.balance, 2)}`}
          placeholder={
            dataCoin?.balance < dataCoin?.min_transfer
              ? `${t('transfer.Limit value from')} ${numberWithCommas(dataCoin?.min_transfer)}`
              : `${t('transfer.Limit value from')} ${numberWithCommas(dataCoin?.min_transfer)} - ${numberWithCommas(
                  dataCoin?.balance,
                  2,
                )}`
          }
          classNames={{ input: classes.input, label: classes.label, rightSection: classes.right }}
          rightSection={<Text className={classes.text}>{dataCoin?.coin_name}</Text>}
          {...form.getInputProps('exchange')}
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </FocusTrap>
      <Text className={classes.text} color={variable.primary.primary2}>
        {t('transfer.Transfer fees')} = 0 {dataCoin?.coin_name}
      </Text>

      <TextInput
        label={t('transfer.Content')}
        placeholder={t('transfer.Enter content')}
        classNames={{ input: classes.input, label: classes.label }}
        {...form.getInputProps('content')}
      />
      <Group className={classes.groupButtonStake}>
        <MyButton onClick={() => toggle()} w="100%" width_mobile="100%" h={44} type="submit" disabled={transferData?.locked}>
          {t('StakingClosed.confirm')}
        </MyButton>
      </Group>
    </Stack>
  );
};

const makeStyles = createStyles(theme => ({
  stack: {
    gap: 10,
  },
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

  text: {
    fontSize: 14,
    fontWeight: 500,
  },

  right: {
    backgroundColor: variable.primary.primary5,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    margin: 1,
    paddingLeft: 40,
    paddingRight: 40,
  },

  button: {
    width: '100%',
  },

  groupButtonStake: {
    width: '100%',
    marginTop: 20,

    '@media (max-width : 576px)': {
      padding: '10px 16px',
      position: 'fixed',
      bottom: 0,
      left: 0,
      background: variable.neutral.whiteLight,
    },
  },
}));

export default ContentTransaction;
