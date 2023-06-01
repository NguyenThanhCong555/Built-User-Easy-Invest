import { Center, Flex, Loader, Stack, Text, createStyles } from '@mantine/core';
import { NavContainer } from 'app/components/navigation/NavContainer';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ReactComponent as LgUsdt } from 'assets/icons/coin/usdt.svg';
import { ReactComponent as IcFilter } from 'assets/icons/filter.svg';
import { media } from 'styles/media';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCalledTransactions,
  selectResponseWallet,
  selectTransactionsHistoryUSDT,
  selectUserSeeAllCoinsInWallet,
  selectWalletTotalPage,
  selectWalletTransactions,
} from 'store/slice/wallet/selectors';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { walletActions } from 'store/slice/wallet';
import MobileFilterWallet from './components/MobileFilterWallet';
import WebFilterWallet from './components/WebFilterWallet';
import { useMediaQuery } from '@mantine/hooks';
import Loading from 'app/components/Loading/Loading';
import { useFilterWallet } from './components/FilterContext/FilterProvider';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';
import { variable } from 'styles/variable';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { convertDateTime } from 'utils/helpers/convertDateTime';
interface InPropsStyle {}

export const WalletMainHistory = () => {
  const { isFilter, openFilter, filter, filterAgain, refresh, setRefresh } = useFilterWallet();
  const { t } = useTranslation();
  const { classes: c } = createStyleProps({});
  // get data coin wallet usdt
  const data = useSelector(selectTransactionsHistoryUSDT);
  const dispatch = useDispatch();
  const mobile = useMediaQuery('(max-width: 768px)');
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const nav = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Fixed
  const [loading, setLoading] = useState<boolean>(false);
  const [coinUSDT, setCoinUSDT] = useState<any>(null);
  const allCoinData = useSelector(selectUserSeeAllCoinsInWallet);
  const dataTransaction = useSelector(selectWalletTransactions);
  const totalPage = useSelector(selectWalletTotalPage);
  const responseWallet = useSelector(selectResponseWallet);
  const calledTransaction = useSelector(selectCalledTransactions);

  const [scrollTo, setScrollTo] = useState<number>(0);

  useLayoutEffect(() => {
    const usdt = allCoinData.find((item, _) => item.coin_name === 'USDT');
    if (usdt) {
      setCoinUSDT(usdt);
    } else {
      dispatch(walletActions.request_SeeAllCoinsInWallet(true));
    }
  }, [allCoinData]);

  useLayoutEffect(() => {
    if (coinUSDT) {
      setLoading(true);
      // Không nên dùng params - (đã sửa)
      if (searchParams.get('start') === null || searchParams.get('end') === null) {
        dispatch(walletActions.requestGetWalletTransactions({ coinId: coinUSDT.coin_id, page }));
      }
    }
  }, [coinUSDT]);

  useLayoutEffect(() => {
    if (coinUSDT) {
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
            coinId: coinUSDT.coin_id,
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

        dispatch(walletActions.requestGetWalletTransactions({ coinId: coinUSDT.coin_id, page: 1 }));
      }
    }
  }, [isFilter, filterAgain, refresh, coinUSDT]);

  useLayoutEffect(() => {
    dispatch(walletActions.resetDataTransactions());
  }, []);

  useEffect(() => {
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

  const renderTitleTransaction = useCallback(
    (service: number, exchange: number): string => {
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
          if (exchange > 0) return `${t('wallet.Sell')}`;
          return `${t('wallet.Buy')}`;
        default:
          return `${t('wallet.Exchange')}`;
      }
    },
    [data?.transactions],
  );

  function fetchMoreData() {
    if (totalPage === page) {
      setHasMore(false);
      return;
    }

    if (coinUSDT) {
      if (isFilter) {
        dispatch(
          walletActions.requestFilterTransactions({
            coinId: coinUSDT.coin_id,
            page: page + 1,
            begin_time: filter.start.getTime(),
            end_time: filter.end.getTime(),
          }),
        );
      } else {
        dispatch(walletActions.requestGetWalletTransactions({ coinId: coinUSDT.coin_id, page: page + 1 }));
      }
      setPage(page + 1);
    }
  }

  function handleScroll(e) {
    setScrollTo(e.target?.scrollTop);
  }

  /*
    Luồng
  */

  return (
    <>
      <Loading visible={loading} />
      <Flex className={c.fixMar}>
        <NavContainer
          laberHeader={
            <Flex align={'center'}>
              <LgUsdt />
              <Text fz={24} fw={700} color="black" ml={5}>
                USDT
              </Text>
            </Flex>
          }
          backRole={'/wallet'}
          headerRight={
            <Flex onClick={openFilter} align={'center'} style={{ cursor: 'pointer' }}>
              <IcFilter></IcFilter>
            </Flex>
          }
        >
          <Stack className={c.stack}>
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
                    <Center className={c.centerLoading}>
                      <Loader size="sm" color={variable.primary.primary2} />
                    </Center>
                  }
                  endMessage={
                    <Center className={c.centerOver}>
                      <Text>{t('wallet.The transaction is over !')}</Text>
                    </Center>
                  }
                  onScroll={e => handleScroll(e)}
                  initialScrollY={10000}
                >
                  {dataTransaction?.map((item, _) => (
                    <Stack
                      className={c.stackTransaction}
                      key={item?.id}
                      onClick={() =>
                        nav(`/wallet/transaction/detail/${item?.id}`, {
                          state: location?.search,
                        })
                      }
                    >
                      <Flex className={c.flexTransaction}>
                        <Text className={c.titleTransaction}>{renderTitleTransaction(item?.service, item?.exchange)}</Text>
                        <Text
                          className={c.numberTransaction}
                          color={item?.exchange > 0 ? variable.secondary.secondary1 : variable.neutral.black}
                        >
                          {item?.exchange > 0 && '+'} {numberWithCommas(item?.exchange, 8)}
                        </Text>
                      </Flex>
                      <Flex className={c.flexTransaction}>
                        <Text className={c.timeTransaction}>{convertDateTime(item?.create_time / 1000)} </Text>
                        <Text className={c.surplusTransaction}>
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
        </NavContainer>
      </Flex>
    </>
  );
};

const createStyleProps = createStyles((theme, params: InPropsStyle) => ({
  stack: {
    width: '100%',
    height: 'calc(100vh - 186.5px)',
    padding: '0 16px 0 16px',
    '@media (max-width: 768px)': {
      padding: 0,
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
    wordBreak: 'break-all',
    marginLeft: 60,
    textAlign: 'end',
    color: variable.neutral.grey,
    span: {
      color: variable.neutral.black,
    },
  },
  flexTransaction: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxHistory: {
    width: '100%',
    maxWidth: '570px',
    margin: '0px auto',
    marginTop: '-14px',
    flexDirection: 'column',
    overflow: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixMar: {
    maxWidth: '100%',
    width: '100%',
    boxShadow: '0px 4px 8px #00000026',
    [`${media.small()}`]: { '&': { marginTop: '0px' } },
    '.infinite-scroll-component__outerdiv': {
      width: '100% !important',
    },
    '.mantine-8uznr6': {
      marginTop: '14px',
      boxShadow: '0px 4px 8px #00000026',
      [`${media.small()}`]: {
        '&': {
          maxHeight: '100% !important',
          height: '100% !important',
          boxShadow: 'none',
          marginTop: '0px',
          border: 'none',
        },
      },
    },
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
