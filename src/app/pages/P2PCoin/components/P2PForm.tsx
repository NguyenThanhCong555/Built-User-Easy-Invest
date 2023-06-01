import React, { useState } from 'react';
import { Stack, createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { StyledSegment } from './StyledSegment';
import BuyForm from './BuyForm';
import SellForm from './SellForm';
import ModalConfirm from './ModalConfirm';
import { useForm } from '@mantine/form';
import { useSelector } from 'react-redux';
import { selectResponseP2P } from 'store/slice/p2p/selector';
import Loading from 'app/components/Loading/Loading';
import { selectWalletTotalCoin } from 'store/slice/wallet/selectors';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';

interface P2PFormProps {}

const P2PForm = ({}: P2PFormProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const [value, setValue] = useState<string>('0');
  const response = useSelector(selectResponseP2P);
  const totalCoin = useSelector(selectWalletTotalCoin);

  const formBuy = useForm({
    initialValues: {
      quantity: '',
    },

    validate: {
      quantity: value => {
        if (Number(value) <= 0) {
          return t('P2P.Enter quantity want to buy');
        }

        if (Number(value) < totalCoin?.min_transfer) {
          return `${t('P2P.Minimum value from')} ${numberWithCommas(totalCoin?.min_transfer)}`;
        }
      },
    },
  });

  const formSell = useForm({
    initialValues: {
      quantity: '',
    },

    validate: {
      quantity: value => {
        if (Number(value) <= 0) {
          return t('P2P.Enter quantity want to sell');
        }

        if (Number(value) < totalCoin?.min_transfer) {
          return `${t('P2P.Minimum value from')} ${numberWithCommas(totalCoin?.min_transfer)}`;
        }
      },
    },
  });
  return (
    <Stack>
      <StyledSegment
        value={value}
        onChange={setValue}
        data={[
          { label: t('P2P.Buy'), value: '0' },
          { label: t('P2P.Sell'), value: '1' },
        ]}
      />
      <Loading visible={response.loading} />

      {value === '0' ? <BuyForm form={formBuy} /> : <SellForm form={formSell} />}
    </Stack>
  );
};

const makeStyles = createStyles(() => ({}));

export default P2PForm;
