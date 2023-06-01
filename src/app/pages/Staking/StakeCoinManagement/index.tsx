import React, { useEffect, useRef } from 'react';
import { Box, Center, Flex, Group, Loader, Modal, Stack, Text, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { primary, variable } from 'styles/variable';

import { MyButton } from 'app/components/Button/MyButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectCalledStakingBookCoin,
  selectCalledTotal,
  selectLoadingStakingBookCoin,
  selectStakingBookCoin,
  selectTotalPageCoin,
  selectTotalPageLocalCoin,
  selectTotalUsdt,
} from 'store/slice/stake/selector';
import { stakeActions } from 'store/slice/stake';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { ReactComponent as IconFilter } from 'assets/icons/filter.svg';
import { DAY_IN_ONE_MONTH, MILLISECONDS, SECONDS_PER_DAY } from 'constants/common';

import { ReactComponent as XCircle } from 'assets/icons/modal/x-circle.svg';
import { filterStakingBookRequest } from 'store/slice/stake/request';
import { listState, listTime } from '../components/Filter/data';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProfitInformation } from './ProfitInformation';
import { StackingNum } from './StakingNum';
import { FilterStake, FilterStakeProps } from '../components/FilterCoin';
import HeaderDetails from '../components/HeaderDetails';
import PopupFalling from '../components/PopupFalling/PopupFalling';
import { ContentModal } from './ContentModal';

interface Styleprops {
  moblies?: any;
  clickrotate?: any;
  canFixed?: boolean;
}

export const StakeCoinManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mobile: any = useMediaQuery('(max-width: 768px)');
  const dispatch = useDispatch();
  const [canFixed, setCanFixed] = useState<boolean>();
  const { classes } = createNewStyle({ moblies: mobile, canFixed: canFixed });

  const [opened, setOpen] = useState(false);
  const calledStakingBook = useSelector(selectCalledStakingBookCoin);
  const stakingBook = useSelector(selectStakingBookCoin);
  const totalUsdt = useSelector(selectTotalUsdt);
  const calledTotalUsdt = useSelector(selectCalledTotal);
  const loadingStakingBook = useSelector(selectLoadingStakingBookCoin);
  const totalPage = useSelector(selectTotalPageCoin);
  const totalPageLocal = useSelector(selectTotalPageLocalCoin);

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [coinId, setCoinId] = useState<number>(-1);
  const [coinName, setCoinName] = useState<string>('');
  const [fromDate, setFromDate] = useState<Date | null>(
    () => new Date(Math.floor(new Date().getTime()) - SECONDS_PER_DAY * DAY_IN_ONE_MONTH * MILLISECONDS),
  );
  const [toDate, setToDate] = useState<Date | null>(() => new Date());
  const [chooseTime, setChooseTime] = useState<number>(() => listTime[0].number);
  const [chooseState, setChooseState] = useState<number>(() => listState[0].value);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const listInnerRef = useRef<any>(null);
  const filterControllerRef = useRef<HTMLDivElement>(null);

  const stateFilterPage: FilterStakeProps = {
    coinId: coinId,
    coinName: coinName,
    page: totalPageLocal,
    chooseTime: chooseTime,
    chooseState: chooseState,
    fromDate: fromDate ?? new Date(),
    toDate: toDate ?? new Date(),
    setChooseTime: setChooseTime,
    setChooseState: setChooseState,
    setCoinId: setCoinId,
    setCoinName: setCoinName,
    setFromDate: setFromDate,
    setToDate: setToDate,
    setHasMore: setHasMore,
    setOpenFilter: setOpenFilter,
  };

  useEffect(() => {
    // fetch total usdt
    if (!calledTotalUsdt) dispatch(stakeActions.requestTotalUSDTStake());

    if (!fromDate || !toDate) return;

    const dataFilter: filterStakingBookRequest = {
      coinId: coinId,
      beginTime: 0,
      endTime: 0,
      status: chooseState,
      page: totalPageLocal,
    };

    setHasMore(true);
    if (!calledStakingBook) {
      dispatch(stakeActions.requestFilterStakingBookCoin(dataFilter));
    }
  }, []);

  useEffect(() => {
    if (totalPage < totalPageLocal) {
      setHasMore(false);
      return;
    } else setHasMore(true);
  }, [stakingBook]);

  const handleCLickScrollTOp = () => {};

  const moveToHomePage = () => {
    navigate('/home');
  };

  const fetchMoreData = () => {
    if (!fromDate || !toDate) return;

    if (totalPage < totalPageLocal) {
      setHasMore(false);
      return;
    }

    const dataFilter: filterStakingBookRequest = {
      coinId: coinId,
      beginTime: fromDate.setHours(0, 0, 0, 1),
      endTime: toDate.setHours(23, 59, 59, 999),
      status: chooseState,
      page: totalPageLocal,
    };
    dispatch(stakeActions.requestFilterStakingBookCoin(dataFilter));
  };

  return (
    <Flex direction={'column'} w={'100%'} h={'fit-content'}>
      <Flex className={classes.boxProject2}>
        <HeaderDetails setOpen={setOpen} isDetail text={t('Header.Stake Management')} onMove={moveToHomePage}></HeaderDetails>
        <InfiniteScroll
          dataLength={stakingBook.length}
          next={fetchMoreData}
          hasMore={hasMore}
          height="calc(100vh - 136.5px)"
          loader={<Center className={classes.centerLoading}>{<Loader size="sm" color={variable.primary.primary2} />}</Center>}
          endMessage={
            <Center className={classes.centerOver} mb={10}>
              <Text>{t('wallet.The transaction is over !')}</Text>
            </Center>
          }
          ref={listInnerRef}
        >
          <Box px={16}>
            <ProfitInformation TotalUSDT={numberWithCommas(totalUsdt)} mt={14}></ProfitInformation>
          </Box>
          <Center px={16}>
            <MyButton onClick={() => navigate('/')} className="butStake">
              Stake
            </MyButton>
          </Center>
          {/* filter */}
          <Group onClick={handleCLickScrollTOp} position="apart" px={16} ref={filterControllerRef} className={classes.boxFilter}>
            <Text className="body_2-medium">{t('StakeManagement.ListStake')}</Text>
            <IconFilter style={{ cursor: 'pointer' }} onClick={() => setOpenFilter(true)}></IconFilter>
          </Group>

          <StackingNum dataTransactionStake={stakingBook ?? []}></StackingNum>
          {loadingStakingBook && <Text>Loading</Text>}
        </InfiniteScroll>
      </Flex>

      <Modal
        closeButtonProps={{
          children: <XCircle />,
        }}
        centered
        opened={opened}
        onClose={() => setOpen(false)}
        classNames={{ header: classes.headerModal }}
      >
        <ContentModal />
      </Modal>

      <PopupFalling open={openFilter} onClose={() => setOpenFilter(false)}>
        <FilterStake {...stateFilterPage} />
      </PopupFalling>
    </Flex>
  );
};

const createNewStyle = createStyles((theme, params: Styleprops) => ({
  boxProject2: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    width: '100%',
    height: '100%',
    maxWidth: '636px',
    margin: params.moblies ? '0 auto' : '10px auto',
    borderRadius: params.moblies ? '0' : '20px',
    border: '1px solid rgba(214, 214, 214, 1)',
    boxShadow: params.moblies ? 'none' : '0px 4px 8px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',

    '.ProfitInformation': {
      maxWidth: params.moblies ? '343px' : '570px',
      borderRadius: '14px',
      border: '1px solid #D6D6D6',
      boxShadow: '0px 2px 4px #00000026',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      flexDirection: 'column',
      height: '113px',
      margin: '0 auto',
      overflow: 'hidden',

      '.infoHeader': {
        width: '100%',
        height: '43px',
        background: primary.primary2,
        justifyContent: 'center',
        alignItems: 'center',
      },
    },

    '.butStake': {
      // maxWidth: params.moblies ? '343px' : '570px',
      width: '100%',
      height: '44px',
      borderRadius: '8px',
      background: primary.primary1,
      margin: '24px auto 24px auto',
    },
  },

  headerModal: {
    padding: '16px 16px 0',
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

  boxFilter: {
    position: params.canFixed ? 'fixed' : 'initial',
    top: params.canFixed ? '120px' : '',
    background: 'var(--white)',
    padding: params.canFixed ? '6px 0' : '',
    width: '100%',
    maxWidth: '634.4px',
    zIndex: 9999999,
    transition: 'all 0.5s',
  },
}));
