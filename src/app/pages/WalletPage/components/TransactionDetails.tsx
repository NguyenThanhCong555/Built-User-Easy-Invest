import { Center, Flex, Image, Stack, Text, createStyles } from '@mantine/core';
import { NavContainer } from 'app/components/navigation/NavContainer';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { ReactComponent as IdIcon } from 'assets/icons/chi tiết giao dịch/Icon/Icon.svg';
import { ReactComponent as CoinUsdt } from 'assets/icons/coin/usdt.svg';
import { Helmet } from 'react-helmet-async';
import { images } from 'assets/images';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { walletActions } from 'store/slice/wallet';
import { useParams } from 'react-router-dom';
import Loading from 'app/components/Loading/Loading';
import { selectResponseWallet, selectTransactionsHistoryUSDTByCoin } from 'store/slice/wallet/selectors';
import { ReactComponent as IconUSDT } from 'assets/icons/coin/usdt.svg';
import { generateTransaction } from 'utils/helpers/generateTransaction';
import { convertDateTime } from 'utils/helpers/convertDateTime';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';

interface InPropsStyle {}

const MainTop = props => {
  const { classes: c } = createStyleProps({});
  const { t } = useTranslation();
  const [hex, setHex] = useState('0');

  useEffect(() => {
    if (props.data) {
      generateTransaction(`${props.data?.id + '-' + props.data?.create_time}`).then(data => setHex(data));
    }
  }, [props.data]);

  return (
    <Flex className={c.topMain}>
      <Text>{t('wallet.Trading code')}</Text>
      <Flex className={c.top}>
        <Text mr={5}>{hex}</Text>
        <IdIcon />
      </Flex>
    </Flex>
  );
};

const MainBottom = props => {
  const { classes: c } = createStyleProps({});
  const { t } = useTranslation();
  const renderTitleTransaction = useCallback((service: number): string => {
    switch (service) {
      case 1:
        return `${t('wallet.Recharge')}`;
      case 2:
        return `${t('wallet.Withdraw money')}`;
      case 3:
        return `${t('wallet.Receive money')}`;
      case 4:
        return `${t('wallet.Transfer money')}`;
      case 5:
        return `${t('wallet.Staking')}`;
      case 6:
        return `${t('wallet.Coin machine')}`;
      default:
        return `${t('wallet.Exchange')}`;
    }
  }, []);

  return (
    <Flex className={c.mainBottom}>
      {/* Transaction information*/}
      <Flex className={c.label}>
        <Text fw={700} fz={16} color="white">
          {renderTitleTransaction(props.data.service)}
        </Text>
      </Flex>

      <Flex className={c.content}>
        {/* coin and icon */}
        <Flex className={c.CoinMain}>
          <Text mr={6} fw={700} fz={24} color={`${Number(props.data.exchange) > 0 ? 'var(--secondary-1)' : 'var(--black)'} `}>
            {Number(props.data.exchange) > 0 ? '+' : null}
            {props?.data?.exchange}
          </Text>
          {props.data?.coin_name === 'USDT' ? (
            <IconUSDT />
          ) : (
            <Image src={props.data?.detail?.coin_avatar} width={24} height={24} />
          )}
        </Flex>
        <Flex
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Stacking */}
          {props.data?.service === 5 && (
            <Stack className={c.stackItem}>
              <Flex className={c.flexItem}>
                <Text className={c.text}>{t('wallet.Project')}:</Text>
                <Text className={c.text}>{props.data?.detail?.project?.name}</Text>
              </Flex>
              <Flex className={c.flexItem}>
                <Text className={c.text}>{t('wallet.Staking package')}:</Text>
                <Text className={c.text}>
                  {props.data?.detail?.stake?.timeframe / 86400000} {t('StakeManagement.days')} -{' '}
                  {props.data?.detail?.stake?.interest_rate}
                  %/{t('Stake.year')}
                </Text>
              </Flex>
              <Flex className={c.flexItem}>
                <Text className={c.text}>{t('wallet.Balance after transaction')}:</Text>
                <Flex className={c.flexNumber}>
                  <Text className={c.text}>{numberWithCommas(props.data?.balance, 8)}</Text>
                  {props.data?.coin_name === 'USDT' ? (
                    <IconUSDT />
                  ) : (
                    <Image src={props.data?.detail?.coin_avatar} width={24} height={24} />
                  )}
                </Flex>
              </Flex>
              <Text className={c.textTime}>{convertDateTime(props.data?.create_time / 1000)}</Text>
            </Stack>
          )}

          {/* Nạp , Rút */}
          {(props.data?.service === 1 || props.data?.service === 2) && (
            <Stack className={c.stackItem}>
              <Flex className={c.flexItem}>
                <Text className={c.text}>{props.data?.service === 1 ? t('wallet.From') : t('wallet.Withdraw To')}</Text>
                <Text className={c.text}>{props.data?.detail?.banking + ' - ' + props.data?.detail?.account_number}</Text>
              </Flex>
              <Flex className={c.flexItem}>
                <Text className={c.text}>{t('wallet.Balance after transaction')}:</Text>
                <Flex className={c.flexNumber}>
                  <Text className={c.text}>{numberWithCommas(props.data?.balance)}</Text>
                  {props.data?.coin_name === 'USDT' ? (
                    <IconUSDT />
                  ) : (
                    <Image src={props.data?.detail?.coin_avatar} width={24} height={24} />
                  )}
                </Flex>
              </Flex>

              <Text className={c.textTime}>{convertDateTime(props.data?.create_time / 1000)}</Text>
            </Stack>
          )}

          {/* Chuyển */}
          {props.data?.service === 3 && (
            <Stack className={c.stackItem}>
              <Flex className={c.flexItem}>
                <Text className={c.text}>{t('wallet.To')}</Text>
                <Text className={c.text}>{props.data?.detail?.sender_nick_name + ' - ' + props.data?.detail?.sender_phone}</Text>
              </Flex>
              <Flex className={c.flexItem}>
                <Text className={c.text}>{t('wallet.Balance after transaction')}:</Text>
                <Flex className={c.flexNumber}>
                  <Text className={c.text}>{numberWithCommas(props.data?.balance)}</Text>
                  {props.data?.coin_name === 'USDT' ? (
                    <IconUSDT />
                  ) : (
                    <Image src={props.data?.detail?.coin_avatar} width={24} height={24} />
                  )}
                </Flex>
              </Flex>

              <Text className={c.textTime}>{convertDateTime(props.data?.create_time / 1000)}</Text>
            </Stack>
          )}

          {/* Nhận */}
          {props.data?.service === 4 && (
            <Stack className={c.stackItem}>
              <Flex className={c.flexItem}>
                <Text className={c.text}>{t('wallet.From')}</Text>
                <Text className={c.text}>
                  {props.data?.detail?.reciver_nick_name + ' - ' + props.data?.detail?.receiver_phone}
                </Text>
              </Flex>
              <Flex className={c.flexItem}>
                <Text className={c.text}>{t('wallet.Balance after transaction')}:</Text>
                <Flex className={c.flexNumber}>
                  <Text className={c.text}>{numberWithCommas(props.data?.balance)}</Text>
                  {props.data?.coin_name === 'USDT' ? (
                    <IconUSDT />
                  ) : (
                    <Image src={props.data?.detail?.coin_avatar} width={24} height={24} />
                  )}
                </Flex>
              </Flex>

              <Text className={c.textTime}>{convertDateTime(props.data?.create_time / 1000)}</Text>
            </Stack>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

// Main
export const TransactionDetails = () => {
  const { t } = useTranslation();
  const { classes: c } = createStyleProps({});
  const dispatch = useDispatch();
  const params = useParams();
  const loading = useSelector(selectResponseWallet);
  const data = useSelector(selectTransactionsHistoryUSDTByCoin);
  const [mainData, setMainData] = useState<any>([]);

  useLayoutEffect(() => {
    if (params) {
      setMainData(data);

      const payload = {
        transaction_id: params.transactionId,
      };
      dispatch(walletActions.requestUsersViewedATradingHistoryOfTheWallet(payload));
    }
  }, [params]);
  return (
    <>
      <Helmet>
        <title>Easy Invest</title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Center mt={14}>
        <NavContainer backRole={'/wallet/history/1'} laberHeader={t('wallet.Transaction details')}>
          <Loading visible={loading.loading} />
          <Flex className={c.boxTransaction}>
            <MainTop data={data}></MainTop>
            <MainBottom data={data}></MainBottom>
          </Flex>
        </NavContainer>
      </Center>
    </>
  );
};
const createStyleProps = createStyles((theme, params: InPropsStyle) => ({
  end: {
    width: '100%',
    justifyContent: 'flex-end',
    padding: '10px 8px 10px 8px',
    alignItems: 'center',
  },
  mainTop: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 8px 0 8px',
  },
  boxTransaction: {
    width: '100%',
    marginLeft: '15px',
    marginRight: '15px',
    marginTop: '10px',
    marginBottom: '10px',
    flexDirection: 'column',
    alignItems: 'center',
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topMain: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainBottom: {
    width: '100%',
    borderRadius: '8px',
    marginTop: '2px',
    overflow: 'hidden',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    width: '100%',
    height: '43px',
    background: 'var(--primary-2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  CoinMain: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid var(--light)',
    width: '100%',
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  MainContent: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stack: {
    borderRadius: 8,
    overflow: 'hidden',
    border: '1px solid var(--grey-light)',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    gap: 8,
  },
  centerTitle: {
    backgroundColor: 'var(--primary-2)',
    height: 43,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: '#fff',
  },
  centerNumber: {
    paddingBottom: 12,
    borderBottom: '1px solid var(--light)',
  },

  flexNumber: {
    alignItems: 'center',
    gap: 6,
  },
  number: {
    fontSize: 24,
    fontWeight: 700,
  },

  stackItem: {
    width: '100%',
    padding: 8,
    gap: 10,
  },

  text: {
    fontSize: 14,
    fontWeight: 500,
  },

  textTime: {
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--grey)',
    alignSelf: 'end',
  },
  flexItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
}));
