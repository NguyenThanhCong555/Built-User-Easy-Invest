import React, { useEffect, useState } from 'react';
import { Center, Divider, Flex, Group, Stack, Text, TextInput, createStyles } from '@mantine/core';
import { UseFormReturnType, useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { buttonQuantity } from '../data/buttonQuantity';
import ContentTransaction from './ContentTransaction';
import { FilledButton } from 'app/components/Button/FilledButton';
import { variable } from 'styles/variable';
import ModalConfirm from './ModalConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { selectWalletTotalCoin } from 'store/slice/wallet/selectors';
import { selectResponseP2P } from 'store/slice/p2p/selector';
import { p2pActions } from 'store/slice/p2p';

interface SellFormProps {
  form: UseFormReturnType<any>;
}

const SellForm = ({ form }: SellFormProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const [active, setActive] = useState<number>(5);
  const [opened, setOpened] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const totalCoin = useSelector(selectWalletTotalCoin);

  const response = useSelector(selectResponseP2P);
  const dispatch = useDispatch();

  function handleActiveBtn(value) {
    setActive(value?.id);
    form.setFieldValue('quantity', value?.value);
  }

  function handleSubmit(values) {
    const payload = {
      coin_id: totalCoin?.coin_id,
      exchange: values.quantity,
    };
    setSubmit(true);
    dispatch(p2pActions.requestSellCoin(payload));
  }

  useEffect(() => {
    if (submit) {
      if (response.error === 50) {
        form.setFieldError('quantity', t('transfer.Your coin balance is not enough !'));
        dispatch(p2pActions.resetResponse());
      }

      if (response.error === 0) {
        setOpened(true);
        dispatch(p2pActions.resetResponse());
      }
    }
  }, [response.loading]);

  function handleContinueForm() {
    form.reset();
    setOpened(false);
    setActive(5);
  }

  return (
    <>
      <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
        <Stack>
          <TextInput
            label={t('P2P.Quantity want to sell')}
            placeholder={t('P2P.Enter quantity')}
            withAsterisk={true}
            classNames={{ input: classes.input, label: classes.label, rightSection: classes.right }}
            rightSection={<Text className={classes.text}>{totalCoin?.coin_name}</Text>}
            {...form.getInputProps('quantity')}
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
          />

          <Flex className={classes.flexBtn}>
            {buttonQuantity?.map((item, _) => (
              <Center
                className={classes.centerBtn}
                key={item?.id}
                onClick={() => handleActiveBtn(item)}
                sx={{
                  backgroundColor: active === item?.id ? 'var(--primary-5)' : 'var(--white-light)',
                }}
              >
                <Text className={classes.textBtn}>{item?.label}</Text>
              </Center>
            ))}
          </Flex>

          <Flex className={classes.flex}>
            <Text className={classes.textExchange}>{t('P2P.Exchange rate')}:</Text>
            <Text className={classes.textExchange}>
              1 USDT = {totalCoin?.rate_usdt_coin} {totalCoin?.coin_name}
            </Text>
          </Flex>

          <Divider color="var(--light)" />

          <ContentTransaction form={form} type={2} />

          <Group className={classes.groupButtonStake}>
            <FilledButton h={50} className={classes.button} type="submit">
              <Stack
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0,
                }}
              >
                <p>{t('P2P.Confirm')}</p>
                <p>
                  ({t('P2P.Sell')} {Number(form.values.quantity).toLocaleString('vi-VN')} {totalCoin?.coin_name})
                </p>
              </Stack>
            </FilledButton>
          </Group>

          <ModalConfirm onContinue={handleContinueForm} opened={opened} setOpened={setOpened} type={2} form={form} />
        </Stack>
      </form>
    </>
  );
};
const makeStyles = createStyles(() => ({
  input: {
    border: '1px solid #929292',
    height: 44,
    borderRadius: 8,

    ':focus, :focus-within': {
      borderColor: 'var(--primary-2)',
    },
  },
  text: {
    fontSize: 14,
    fontWeight: 500,
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
  },
  right: {
    backgroundColor: 'var(--primary-5)',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    margin: 1,
    paddingLeft: 40,
    paddingRight: 40,
  },

  flexBtn: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 40,

    '@media (max-width: 768px)': {
      gap: 20,
    },
  },
  centerBtn: {
    backgroundColor: 'var(--white-light)',
    height: 30,
    flex: 1,
  },
  textBtn: {
    fontSize: 14,
    fontWeight: 400,
    color: 'var(--grey-dark)',
  },

  flex: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textExchange: {
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--primary-2)',
  },
  button: {
    fontSize: '16px !important',
    textAlign: 'center',
    width: '100%',

    p: {
      lineHeight: 1.2,
      fontSize: 14,
      fontWeight: 500,

      ':first-of-type': {
        fontSize: 16,
        fontWeight: 700,
      },
    },
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
export default SellForm;
