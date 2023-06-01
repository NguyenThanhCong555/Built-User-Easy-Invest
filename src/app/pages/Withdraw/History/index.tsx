import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Box, Center, Loader, Stack, Text } from '@mantine/core';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Frame } from 'app/layouts/Frame';
import { InformationCard } from './components/InformationCard';
import PopupFalling from 'app/pages/Staking/components/PopupFalling/PopupFalling';
import { FilterHistoryWithdraw } from './components/Filter';
import { DAY_IN_ONE_MONTH, MILLISECONDS, SECONDS_PER_DAY } from 'constants/common';
import { listTime } from './components/Filter/data';
import { getRequestHistory } from 'store/slice/withdraw/request';
import {
  selectCalledTransferHistory,
  selectTotalPageOfHistory,
  selectTransferHistory,
  selectTotalPageLocalOfHistory,
} from 'store/slice/withdraw/selector';
import ConvertDate from 'helpers/formatDate';
import { withdrawActions } from 'store/slice/withdraw';

import { WITHDRAW_MONEY_CODE } from 'constants/account';
import { ReactComponent as IconFilter } from 'assets/icons/filter.svg';
import { variable } from 'styles/variable';

type Props = {};

export type filterTransferHistory = {
  fromDate: Date;
  toDate: Date;
  chooseTime: number;
  page: number;
  setFromDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setToDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setChooseTime: React.Dispatch<React.SetStateAction<number>>;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HistoryWithdraw = (props: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const transferHistory = useSelector(selectTransferHistory);
  const calledTransferHistory = useSelector(selectCalledTransferHistory);
  const totalPage = useSelector(selectTotalPageOfHistory);
  const totalPageLocal = useSelector(selectTotalPageLocalOfHistory);

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date | null>(
    () => new Date(Math.floor(new Date().getTime()) - SECONDS_PER_DAY * DAY_IN_ONE_MONTH * MILLISECONDS),
  );
  const [toDate, setToDate] = useState<Date | null>(() => new Date());
  const [chooseTime, setChooseTime] = useState<number>(() => listTime[0].number);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const stateFilterPage: filterTransferHistory = {
    // page: totalPageLocal,
    page: 1,
    chooseTime: chooseTime,
    fromDate: fromDate ?? new Date(),
    toDate: toDate ?? new Date(),
    setChooseTime: setChooseTime,
    setFromDate: setFromDate,
    setToDate: setToDate,
    setHasMore: setHasMore,
    setOpenFilter: setOpenFilter,
  };

  useEffect(() => {
    if (!fromDate || !toDate) return;
    const dataFilter: getRequestHistory = {
      beginTime: fromDate.setHours(0, 0, 0, 1),
      endTime: toDate.setHours(23, 59, 59, 999),
      page: 1,
      service: WITHDRAW_MONEY_CODE,
    };
    setHasMore(true);
    if (!calledTransferHistory) {
      dispatch(withdrawActions.requestRefreshHistoryWithdraw(dataFilter));
    }
  }, []);

  useEffect(() => {
    if (totalPage < totalPageLocal) {
      setHasMore(false);
      return;
    } else setHasMore(true);
  }, [transferHistory]);

  const backpage = () => {
    navigation('/withdraw');
  };

  const fetchMoreData = () => {
    if (!fromDate || !toDate) return;

    if (totalPage < totalPageLocal) {
      setHasMore(false);
      return;
    }

    const dataFilter: getRequestHistory = {
      beginTime: fromDate.setHours(0, 0, 0, 1),
      endTime: toDate.setHours(23, 59, 59, 999),
      page: totalPageLocal,
      service: WITHDRAW_MONEY_CODE,
    };
    dispatch(withdrawActions.requestGetRequestHistoryWithdraw(dataFilter));
  };

  return (
    <>
      <Frame
        onMovePage={backpage}
        titlePage={t('Withdraw.historyWithdraw')}
        rightSection={<IconFilter onClick={() => setOpenFilter(true)} />}
      >
        <InfiniteScroll
          dataLength={transferHistory.length}
          next={fetchMoreData}
          hasMore={hasMore}
          height="calc(100vh - 136.5px)"
          loader={<Center>{<Loader size="sm" color={variable.primary.primary2} />}</Center>}
          endMessage={
            <Center mb={10}>
              <Text>{t('wallet.The transaction is over !')}</Text>
            </Center>
          }
        >
          <Stack p={16} spacing={12}>
            {!!transferHistory.length &&
              transferHistory.map(history => (
                <InformationCard
                  key={history.id}
                  usdt={history.exchange}
                  actualNumber={history?.real_exchange ? history?.real_exchange : '0'}
                  stakingId={history.id}
                  creationTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(history.create_time))}
                  approvalTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(history.update_time))}
                  status={history.status}
                />
              ))}
          </Stack>
        </InfiniteScroll>
      </Frame>

      <PopupFalling open={openFilter} onClose={() => setOpenFilter(false)}>
        <FilterHistoryWithdraw {...stateFilterPage} />
      </PopupFalling>
    </>
  );
};
