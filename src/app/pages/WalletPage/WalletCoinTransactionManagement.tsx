import React, { useEffect, useState } from 'react';
import { Flex, Loader, Stack, Text, createStyles } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { TFilterDate } from './type';
import { useMediaQuery } from '@mantine/hooks';
import { variable } from 'styles/variable';
import { getDateAfter } from 'utils/helpers/getDateAfter';

import { ReactComponent as FilterIcon } from 'assets/icons/wallet/filter-funnel.svg';
import WebFilterWallet from './components/WebFilterWallet';
import MobileFilterWallet from './components/MobileFilterWallet';
import { useDispatch, useSelector } from 'react-redux';
// import { useWalletSlice, walletActions } from 'store/app/wallet';
// import { selectResponseWallet, selectWalletTotalPage, selectWalletTransactions } from 'store/app/wallet/selector';
// import { formatCurrency } from 'utils/formatCurrency';
// import { convertDateTime } from 'utils/convertDateTime';

// import InfiniteScroll from 'react-infinite-scroll-component';
import { RESPONSE_SUCCESS_ERROR } from 'constants/common';
import { Frame } from 'app/layouts/Frame';
import { renderTitleTransaction } from 'utils/helpers/renderTitleTransaction';
import { convertDateTime } from 'utils/helpers/convertDateTime';
import { formatCoinUS } from 'utils/helpers/formatCoinUs';
import { walletActions } from 'store/slice/wallet';
import { selectWalletTotalCoin, selectWalletTransactions } from 'store/slice/wallet/selectors';
import FilterProvider, { useFilterWallet } from './components/FilterContext/FilterProvider';
export function WalletCoinTransactionManagement() {
  const { classes } = makeStyles();
  const navigate = useNavigate();
  const [opened, setOpened] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { isFilter, openFilter } = useFilterWallet();

  const [page, setPage] = useState<number>(1);
  const { coinId } = useParams();

  const mobile = useMediaQuery('(max-width: 768px)');
  const [filter, setFilter] = useState<TFilterDate>({ start: getDateAfter(new Date(), 0, -1), end: new Date() });
  const [active, setActive] = useState(1);

  const dataTransaction = useSelector(selectWalletTransactions);
  const dataCoin = useSelector(selectWalletTotalCoin);
  //   const totalPage = useSelector(selectWalletTotalPage);
  //   const responseWallet = useSelector(selectResponseWallet);
  const dispatch = useDispatch();

  useEffect(() => {
    if (coinId) {
      dispatch(walletActions.requestGetWalletTransactions({ coinId, page, count: 20 }));
      // Fetching data coin again if coin_id not include
      if (dataCoin?.coin_id !== Number(coinId)) {
        dispatch(walletActions.requestGetTotalCoin({ coinId }));
      }
    }

    return () => {
      // dispatch(walletActions.resetDataTransactions());
      dispatch(walletActions.resetResponse());
      // dispatch(walletActions.resetTotalPage());
    };
  }, [coinId]);

  //   useEffect(() => {
  //     if (dataTransaction.length === 0 && responseWallet.error === RESPONSE_SUCCESS_ERROR) {
  //       setHasMore(false);
  //     }
  //   }, [responseWallet]);

  //   function fetchMoreData() {
  //     if (totalPage === page) {
  //       setHasMore(false);
  //     }

  //     if (coinName) {
  //       dispatch(walletActions.requestGetWalletTransactions({ coinName, page: page + 1, count: 20 }));
  //       setPage(page + 1);
  //     }
  //   }

  return (
    <Frame
      titlePage={dataCoin?.coin_name}
      onMovePage={() => {
        navigate('/wallet/coin/1');
      }}
      pb={40}
      rightSection={<FilterIcon className={classes.icon} onClick={openFilter} />}
    >
      <Stack className={classes.stack}>
        {dataTransaction?.map((item, _) => (
          <Stack className={classes.stackTransaction} key={item?.id} onClick={() => navigate('/')}>
            <Flex className={classes.flexTransaction}>
              <Text className={classes.titleTransaction}>{renderTitleTransaction(item?.service)}</Text>
              <Text
                className={classes.numberTransaction}
                color={item?.exchange > 0 ? variable.secondary.secondary1 : variable.neutral.black}
              >
                {item?.exchange}
              </Text>
            </Flex>
            <Flex className={classes.flexTransaction}>
              <Text className={classes.timeTransaction}>{convertDateTime(item?.create_time / 1000)} </Text>
              <Text className={classes.surplusTransaction}>
                Số dư: <span>{formatCoinUS(item?.balance)}</span>
              </Text>
            </Flex>
          </Stack>
        ))}
        {/* <InfiniteScroll
            dataLength={dataTransaction.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <Center mt={10}>
                <Loader size="sm" color={variable.primary.primary2} />
              </Center>
            }
          >
            {responseWallet.error === RESPONSE_SUCCESS_ERROR &&
              (dataTransaction.length === 0 ? (
                <Text>Chưa có giao dịch nào !</Text>
              ) : (
                dataTransaction?.map((item, _) => (
                  <Stack className={classes.stackTransaction} key={item?.id} onClick={() => navigate('/')}>
                    <Flex className={classes.flexTransaction}>
                      <Text className={classes.titleTransaction}>{renderTitleTransaction(item?.service)}</Text>
                      <Text
                        className={classes.numberTransaction}
                        color={item?.exchange > 0 ? variable.secondary.secondary1 : variable.neutral.black}
                      >
                        {item?.exchange}
                      </Text>
                    </Flex>
                    <Flex className={classes.flexTransaction}>
                      <Text className={classes.timeTransaction}>{convertDateTime(item?.create_time / 1000)} </Text>
                      <Text className={classes.surplusTransaction}>
                        Số dư: <span>{formatCurrency(item?.balance)}</span>
                      </Text>
                    </Flex>
                  </Stack>
                ))
              ))}
          </InfiniteScroll> */}
        {/* Transactions */}
      </Stack>

      {mobile ? <MobileFilterWallet /> : <WebFilterWallet />}
    </Frame>
  );
}

const makeStyles = createStyles(() => ({
  stack: {
    padding: '20px 30px',
    '@media (max-width: 768px)': {
      padding: 16,
    },
  },

  stackTransaction: {
    gap: 0,
    borderBottom: ' 1px solid #EAEAEA',
    paddingBottom: 9,
    cursor: 'pointer',
  },

  titleTransaction: {
    fontSize: 16,
    fontWeight: 700,
  },
  numberTransaction: {
    fontSize: 16,
    fontWeight: 700,
  },
  timeTransaction: {
    fontSize: 12,
    fontWeight: 500,
  },
  surplusTransaction: {
    fontSize: 12,
    fontWeight: 500,
    color: variable.neutral.grey,
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
}));
