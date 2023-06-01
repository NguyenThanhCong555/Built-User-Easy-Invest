import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Center, Flex, Loader, Stack, Text, createStyles } from '@mantine/core';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { TCoinData } from './type';
import { useMediaQuery } from '@mantine/hooks';
import { variable } from 'styles/variable';

import { ReactComponent as FilterIcon } from 'assets/icons/wallet/filter-funnel.svg';
import WebFilterWallet from './components/WebFilterWallet';
import MobileFilterWallet from './components/MobileFilterWallet';
import { useDispatch, useSelector } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroll-component';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';
import { Frame } from 'app/layouts/Frame';
import { renderTitleTransaction } from 'utils/helpers/renderTitleTransaction';
import { convertDateTime } from 'utils/helpers/convertDateTime';
import { walletActions } from 'store/slice/wallet';
import {
  selectCalledTransactions,
  selectResponseWallet,
  selectUserSeeAllCoinsInWallet,
  selectWalletTotalCoin,
  selectWalletTotalPage,
  selectWalletTransactions,
} from 'store/slice/wallet/selectors';
import { useFilterWallet } from './components/FilterContext/FilterProvider';
import Loading from 'app/components/Loading/Loading';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { images } from 'assets/images';

export function WalletCoinTransactionManagement() {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataCoin, setDataCoin] = useState<TCoinData | null>(null);

  const [fetchingAgain, setFetchingAgain] = useState<boolean>(false);

  const { isFilter, openFilter, filter, refresh, setRefresh, filterAgain } = useFilterWallet();
  const { coinId } = useParams();

  const mobile = useMediaQuery('(max-width: 768px)');

  const data = useSelector(selectUserSeeAllCoinsInWallet);
  const dataTransaction = useSelector(selectWalletTransactions);
  const totalCoin = useSelector(selectWalletTotalCoin);
  const totalPage = useSelector(selectWalletTotalPage);
  const responseWallet = useSelector(selectResponseWallet);
  const calledTransaction = useSelector(selectCalledTransactions);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useLayoutEffect(() => {
    const coinData = data?.find((item, _) => item?.coin_id === Number(coinId));
    if (coinId) {
      setLoading(true);

      if (!coinData) {
        setFetchingAgain(true);
        if (coinId) {
          dispatch(walletActions.requestGetTotalCoin({ coinId }));
        }
      } else {
        setDataCoin(coinData);
      }

      if (searchParams.get('start') === null || searchParams.get('end') === null) {
        dispatch(walletActions.requestGetWalletTransactions({ coinId, page }));
      }
    }
  }, [coinId, data]);

  useLayoutEffect(() => {
    if (isFilter) {
      dispatch(walletActions.resetDataTransactions());
      dispatch(walletActions.resetResponse());
      dispatch(walletActions.resetTotalPage());
      dispatch(walletActions.resetCalledTransaction());
      setPage(1);
      setLoading(true);
      setHasMore(true);
      dispatch(
        walletActions.requestFilterTransactions({
          coinId,
          page: 1,
          begin_time: filter.start.getTime(),
          end_time: filter.end.getTime(),
        }),
      );
    }
    if (refresh) {
      dispatch(walletActions.resetDataTransactions());
      dispatch(walletActions.resetResponse());
      dispatch(walletActions.resetTotalPage());
      dispatch(walletActions.resetCalledTransaction());
      setPage(1);
      setLoading(true);
      setHasMore(true);
      setRefresh(false);

      dispatch(walletActions.requestGetWalletTransactions({ coinId, page: 1 }));
    }
  }, [isFilter, filterAgain, refresh]);

  useLayoutEffect(() => {
    return () => {
      dispatch(walletActions.resetDataTransactions());
      dispatch(walletActions.resetResponse());
      dispatch(walletActions.resetTotalPage());
      dispatch(walletActions.resetCalledTransaction());
    };
  }, []);

  useLayoutEffect(() => {
    if (calledTransaction) {
      setLoading(false);
    }
  }, [calledTransaction]);

  function fetchMoreData() {
    if (totalPage === page) {
      setHasMore(false);
      return;
    }

    if (coinId) {
      if (isFilter) {
        dispatch(
          walletActions.requestFilterTransactions({
            coinId,
            page: page + 1,
            begin_time: filter.start.getTime(),
            end_time: filter.end.getTime(),
          }),
        );
      } else {
        dispatch(walletActions.requestGetWalletTransactions({ coinId, page: page + 1 }));
      }
      setPage(page + 1);
    }
  }

  return (
    <>
      <Helmet>
        <title>
          {t('wallet.Manage transactions history/coin')} - {`${fetchingAgain ? totalCoin?.coin_name : dataCoin?.coin_name}`}
        </title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Loading visible={loading} />
      <Frame
        titlePage={fetchingAgain ? totalCoin?.coin_name : dataCoin?.coin_name}
        onMovePage={() => {
          navigate(`/wallet/coin/${coinId}`);
        }}
        pb={10}
        rightSection={<FilterIcon className={classes.icon} onClick={openFilter} />}
      >
        <Stack className={classes.stack}>
          {responseWallet.error === RESPONSE_SUCCESS_ERROR &&
            (dataTransaction.length === 0 ? (
              <Center>
                <Text>
                  {isFilter
                    ? t('wallet.No matching transaction history results !')
                    : t('wallet.You have no transaction with this coin !')}
                </Text>
              </Center>
            ) : (
              <InfiniteScroll
                dataLength={dataTransaction.length}
                next={fetchMoreData}
                hasMore={hasMore}
                height="calc(100vh - 186.5px)"
                scrollThreshold="700px"
                loader={
                  <Center className={classes.centerLoading}>
                    <Loader size="sm" color={variable.primary.primary2} />
                  </Center>
                }
                endMessage={
                  <Center className={classes.centerOver}>
                    <Text>{t('wallet.The transaction is over !')}</Text>
                  </Center>
                }
              >
                {dataTransaction?.map((item, _) => (
                  <Stack
                    className={classes.stackTransaction}
                    key={item?.id}
                    onClick={() =>
                      navigate(`/wallet/transaction/detail/${item?.id}`, {
                        state: location?.search,
                      })
                    }
                  >
                    <Flex className={classes.flexTransaction}>
                      <Text className={classes.titleTransaction}>
                        {t(
                          'wallet.' +
                            renderTitleTransaction(item?.service, item?.exchange, item?.coin_name === 'USDT' ? true : false),
                        )}
                      </Text>
                      <Text
                        className={classes.numberTransaction}
                        color={item?.exchange > 0 ? variable.secondary.secondary1 : variable.neutral.black}
                      >
                        {item?.exchange > 0 && '+'} {numberWithCommas(item?.exchange, 8)}
                      </Text>
                    </Flex>
                    <Flex className={classes.flexTransaction}>
                      <Text className={classes.timeTransaction}>{convertDateTime(item?.create_time / 1000)} </Text>
                      <Text className={classes.surplusTransaction}>
                        {t('wallet.history.Surplus')} <span>{numberWithCommas(item?.balance, 8)}</span>
                      </Text>
                    </Flex>
                  </Stack>
                ))}
              </InfiniteScroll>
            ))}
          {/* Transactions */}
        </Stack>

        {mobile ? <MobileFilterWallet /> : <WebFilterWallet />}
      </Frame>
    </>
  );
}

const makeStyles = createStyles(() => ({
  stack: {
    height: 'calc(100vh - 166.5px)',
    padding: '20px 30px 0 30px',
    '@media (max-width: 768px)': {
      padding: '16px 16px 0 16px',
    },
  },

  stackTransaction: {
    gap: 0,
    borderBottom: ' 1px solid #EAEAEA',
    paddingBottom: 9,
    cursor: 'pointer',

    ':not(:first-of-type)': {
      marginTop: 12,
    },
  },

  titleTransaction: {
    fontSize: 16,
    fontWeight: 700,
  },
  numberTransaction: {
    fontSize: 16,
    fontWeight: 700,
    wordBreak: 'break-all',
    marginLeft: 60,
    textAlign: 'end',
  },
  timeTransaction: {
    fontSize: 12,
    fontWeight: 500,
  },
  surplusTransaction: {
    fontSize: 12,
    fontWeight: 500,
    color: variable.neutral.grey,
    wordBreak: 'break-all',
    marginLeft: 60,
    textAlign: 'end',
    span: {
      color: variable.neutral.black,
    },
  },
  flexTransaction: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  icon: {
    cursor: 'pointer',
  },

  centerLoading: {
    marginTop: 10,

    '@media (max-width : 768px)': {
      marginBottom: 10,
    },
  },
  centerOver: {
    marginTop: 20,

    '@media (max-width : 768px)': {
      marginBottom: 20,
    },
  },
}));
