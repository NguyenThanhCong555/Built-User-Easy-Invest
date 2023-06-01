import React, { useEffect, useState } from 'react';
import { Badge, Center, Flex, Modal, Stack, Text, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { variable } from 'styles/variable';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import { FilledButton } from 'app/components/Button/FilledButton';
import { selectWalletTotalCoin } from 'store/slice/wallet/selectors';
import { useSelector } from 'react-redux';
import { UseFormReturnType } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { convertDateTime } from 'utils/helpers/convertDateTime';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';

interface ModalConfirmProps {
  type: number;
  form: UseFormReturnType<any>;
  opened: boolean;
  setOpened: any;

  onContinue?: () => void;
}

const ModalConfirm = ({ opened, type, setOpened, form, onContinue }: ModalConfirmProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const navigate = useNavigate();

  const [usdt, setUsdt] = useState<number | string>(0);
  const [fee, setFee] = useState<number | string>(0);
  const [total, setTotal] = useState<number | string>(0);

  const totalCoin = useSelector(selectWalletTotalCoin);

  useEffect(() => {
    if (totalCoin?.coin_id !== -1) {
      const USDT = form.values.quantity / totalCoin?.rate_usdt_coin;
      const fee = type === 1 ? totalCoin?.purchase_fee : totalCoin?.selling_fee;
      const feeTransaction = (USDT * fee) / 100;
      const totalTransaction = type === 1 ? USDT + feeTransaction : USDT - feeTransaction;

      setUsdt(numberWithCommas(USDT, 3));
      setFee(numberWithCommas(JSON.stringify(feeTransaction), 8));
      setTotal(numberWithCommas(JSON.stringify(totalTransaction), 8));
    }
  }, [form.values.quantity, totalCoin]);

  // type 1 -> mua
  // type 2 -> bán
  return (
    <Modal
      centered
      opened={opened}
      onClose={() => {
        setOpened(false);
        onContinue?.();
      }}
      closeButtonProps={{
        display: 'none',
      }}
      classNames={{ header: classes.header, body: classes.body }}
      radius={14}
    >
      <Stack className={classes.stack}>
        <Center className={classes.center}>
          <Text className={classes.title}>
            {type === 1 ? t('P2P.Buy') : t('P2P.Sell')} {totalCoin?.coin_name}
          </Text>
        </Center>

        <Stack className={classes.stackItem}>
          <ModalItem
            left={t('P2P.Transaction') + ':'}
            right={<Text className={classes.textRightItem}>{type === 1 ? t('P2P.Buy') : t('P2P.Sell')}</Text>}
          />
          <ModalItem
            left={t('P2P.Quantity') + ':'}
            right={
              <Text className={classes.textRightItem}>
                {form.values.quantity} {totalCoin?.coin_name}
              </Text>
            }
          />
          <ModalItem
            left={t('P2P.Exchange rate') + ':'}
            right={
              <Text className={classes.textRightItem}>
                1 USDT = {totalCoin?.rate_usdt_coin} {totalCoin?.coin_name}
              </Text>
            }
          />
          <ModalItem left={t('P2P.Into money') + ':'} right={<Text className={classes.textRightItem}>{usdt} USDT</Text>} />
          <ModalItem left={t('P2P.Transaction fee') + ':'} right={<Text className={classes.textRightItem}>{fee} USDT</Text>} />
          <ModalItem left={t('P2P.Total') + ':'} right={<Text className={classes.textRightItem}>{total} USDT</Text>} />
          <ModalItem left={t('P2P.Status') + ':'} right={<Badge color="green">{t('P2P.Success')}</Badge>} />
          <ModalItem
            left={t('P2P.Time') + ':'}
            right={<Text className={classes.textRightItem}>{convertDateTime(new Date().getTime() / 1000)}</Text>}
          />
          <Flex mt={20}>
            <OutlineButton
              className={classes.button}
              h={45}
              onClick={() => navigate(`/wallet/coin/${totalCoin?.coin_id}/transaction`)}
            >
              {t('P2P.Transaction history')}
            </OutlineButton>
            <FilledButton className={classes.button} h={45} ml={20} onClick={() => onContinue?.()}>
              {t('P2P.Continue')}
            </FilledButton>
          </Flex>
        </Stack>
      </Stack>
    </Modal>
  );
};

const ModalItem = ({ left, right }) => {
  const { classes } = makeStyles();

  return (
    <Flex className={classes.flexItem}>
      <Text className={classes.textLeftItem}>{left}</Text>
      {right}
    </Flex>
  );
};

const makeStyles = createStyles(() => ({
  stack: {
    gap: 0,
  },
  center: {
    backgroundColor: variable.primary.primary2,
    height: 68,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#fff',
  },
  header: {
    display: 'none',
  },
  body: {
    padding: 0,
  },

  stackItem: {
    padding: '20px 12px',
    gap: 0,
  },
  flexItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '6px 0',
  },
  textLeftItem: {
    fontSize: 16,
    fontWeight: 700,
  },
  textRightItem: {
    fontSize: 16,
    fontWeight: 700,
    color: variable.primary.primary2,
  },

  button: {
    flex: 1,
    fontSize: '16px !important',
  },
}));

export default ModalConfirm;
