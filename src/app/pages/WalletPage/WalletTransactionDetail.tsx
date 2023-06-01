import React, { useEffect, useState } from 'react';
import { Flex, Stack, Text, createStyles } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import CopyToolTip from 'app/components/CopyToolTip/CopyToolTip';
import TransactionDetailItem from './components/TransactionDetailItem';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { walletActions } from 'store/slice/wallet';
import { selectResponseWallet, selectTransactionDetail } from 'store/slice/wallet/selectors';

import { generateTransaction } from 'utils/helpers/generateTransaction';
import Loading from 'app/components/Loading/Loading';
import { Helmet } from 'react-helmet-async';
import { images } from 'assets/images';

export function WalletTransactionDetail() {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const { transactionId } = useParams();
  // const [hex, setHex] = useState('0');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const data = useSelector(selectTransactionDetail);
  const response = useSelector(selectResponseWallet);

  useEffect(() => {
    if (transactionId) dispatch(walletActions.requestGetTransactionDetail({ transactionId }));
  }, [transactionId]);

  // useEffect(() => {
  //   if (data) {
  //     generateTransaction(`${data?.id + '-' + data?.create_time}`).then(data => setHex(data));
  //   }
  // }, [data]);

  return (
    <>
      <Helmet>
        <title>{t('wallet.Transaction details')}</title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Loading visible={response.loading} />
      <Frame
        titlePage={t('wallet.Transaction details')}
        pb={20}
        onMovePage={() => {
          if (location?.state === null) {
            data?.coin_name !== 'USDT' ? navigate(`/wallet/coin/${data?.coin_id}/transaction`) : navigate('/wallet/history');
          } else {
            data?.coin_name !== 'USDT'
              ? navigate(`/wallet/coin/${data?.coin_id}/transaction${location?.state}`)
              : navigate(`/wallet/history${location?.state}`);
          }
        }}
      >
        <Stack className={classes.stack}>
          <Flex className={classes.flex}>
            <Text className={classes.title}>{t('wallet.Trading code')}</Text>
            <Flex className={classes.flexCopy}>
              <Text className={classes.title}>{data?.id}</Text>
              <CopyToolTip text={data?.id} />
            </Flex>
          </Flex>

          <TransactionDetailItem data={data} />
        </Stack>
      </Frame>
    </>
  );
}

const makeStyles = createStyles(theme => ({
  stack: {
    gap: 6,
    padding: '16px 30px 24px 30px',

    '@media (max-width: 768px)': {
      padding: 16,
    },
  },
  flex: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 14,
    fontWeight: 600,
  },
  text: {},

  flexCopy: {
    alignItems: 'center',
  },
}));
