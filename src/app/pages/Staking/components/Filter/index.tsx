import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Divider, Group, LoadingOverlay, Stack, Text, createStyles } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useTranslation } from 'react-i18next';
import { INITIAL_VALUE, RESPONSE_DEFAULT_ERROR, SECONDS_PER_DAY } from 'constants/common';
import { listState, listTime } from './data';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import { FilledButton } from 'app/components/Button/FilledButton';
import PopupFalling from '../PopupFalling/PopupFalling';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCallListCoin, selectListCoins, selectLoadingCoin } from 'store/slice/coin/selector';
import { coinActions } from 'store/slice/coin';
import { filterStakingBookRequest } from 'store/slice/stake/request';
import { stakeActions } from 'store/slice/stake';
import { selectTotalPageLocal } from 'store/slice/stake/selector';
import { variable } from 'styles/variable';
// import { OtherStaking } from '../../Stake';

export type FilterStakeProps = {
  coinId: number;
  coinName: string;
  fromDate: Date;
  toDate: Date;
  chooseTime: number;
  chooseState: number;
  page: number;
  setCoinId: React.Dispatch<React.SetStateAction<number>>;
  setCoinName: React.Dispatch<React.SetStateAction<string>>;
  setFromDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setToDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setChooseTime: React.Dispatch<React.SetStateAction<number>>;
  setChooseState: React.Dispatch<React.SetStateAction<number>>;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

type TStake = {
  projectId: number;
  avatar: string;
  name: string;
  value: string;
  onClick?: (e?: any) => void;
};

type OtherStakingProps = {
  setCoinId: React.Dispatch<React.SetStateAction<number>>;
  setOpenFilterListCoin: React.Dispatch<React.SetStateAction<boolean>>;
  setCoinName: React.Dispatch<React.SetStateAction<string>>;
};

const CardStake = (props: TStake) => {
  const navigation = useNavigate();

  return (
    <Group position="apart" onClick={props.onClick} style={{ cursor: 'pointer' }}>
      <Group spacing={8}>
        <Avatar src={props.avatar} w={54} h={54} radius={100} />
        <Text className="subtitle_4-bold">{props.name}</Text>
      </Group>
      <Text className="small_2-medium">{props.value}</Text>
    </Group>
  );
};

export const OtherStaking = (props: OtherStakingProps) => {
  const { classes } = useStyleOtherStaking();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const callListCoin = useSelector(selectCallListCoin);
  const listCoins = useSelector(selectListCoins);
  const loadingListCoin = useSelector(selectLoadingCoin);

  useEffect(() => {
    if (!callListCoin) {
      dispatch(coinActions.requestGetListCoins());
    }
  }, [callListCoin]);

  const clickToAll = event => {
    event.stopPropagation();
    props.setCoinId(-1);
    props.setCoinName('');
    props.setOpenFilterListCoin(false);
  };

  const handleClick = (event, coinId: number, coinName: string) => {
    event.stopPropagation();
    props.setCoinId(coinId);
    props.setOpenFilterListCoin(false);
    props.setCoinName(coinName);
  };

  return (
    <Stack className={classes.box}>
      <LoadingOverlay visible={loadingListCoin} />

      <Text onClick={e => clickToAll(e)} className="subtitle_4-bold">
        {t('StakeManagement.filter.all')}
      </Text>
      <Divider mb={12} c={'var(--light)'} mt={6} />
      {!!listCoins.length &&
        listCoins.map(coinInfo => (
          <Box key={coinInfo.project_id}>
            <CardStake
              projectId={coinInfo?.project_id ?? 0}
              key={coinInfo?.project_id}
              avatar={coinInfo?.coin_avatar ?? ''}
              name={coinInfo?.coin_name ?? ''}
              value={`APR ${coinInfo.min_interest_rate ?? 0}-${coinInfo.max_interest_rate ?? 0}%`}
              onClick={e => handleClick(e, coinInfo?.id, coinInfo?.coin_name)}
            />
            <Divider mb={12} c={'var(--light)'} mt={6} />
          </Box>
        ))}
    </Stack>
  );
};

export const FilterStake = (props: FilterStakeProps) => {
  const { t } = useTranslation();
  const { classes } = useStyle();
  const dispatch = useDispatch();

  const totalPageLocal = useSelector(selectTotalPageLocal);
  const [openFilterListCoin, setOpenFilterListCoin] = useState<boolean>(false);

  const handleChooseTime = numberTime => {
    if (numberTime === props.chooseTime) return;

    props.setChooseTime(numberTime);
    props.setFromDate(new Date(Math.floor(new Date().getTime()) - SECONDS_PER_DAY * numberTime * 30 * 1000));
  };

  const handleChooseState = numberState => {
    if (numberState === props.chooseState) return;

    props.setChooseState(numberState);
  };

  const handleFilter = () => {
    if (!props.fromDate || !props.toDate) return;

    const dataFilter: filterStakingBookRequest = {
      coinId: props.coinId,
      beginTime: props.fromDate.setHours(0, 0, 0, 1),
      endTime: props.toDate.setHours(23, 59, 59, 999),
      status: props.chooseState,
      page: 1,
    };
    // set call api new page
    props.setHasMore(true);
    dispatch(stakeActions.requestReFreshFilterStakingBook(dataFilter));
    // turn off oppup
    props.setOpenFilter(false);
  };

  const handleRefresh = () => {
    if (!props.fromDate || !props.toDate) return;

    const dataFilter: filterStakingBookRequest = {
      coinId: INITIAL_VALUE,
      beginTime: 0,
      endTime: 0,
      status: INITIAL_VALUE,
      page: 1,
    };
    // set call api new page
    props.setHasMore(true);
    dispatch(stakeActions.requestReFreshFilterStakingBook(dataFilter));
    // turn off popup
    props.setOpenFilter(false);
  };

  return (
    <>
      <Box>
        <Text className="body_4-bold">{t('StakeManagement.filter.labelCoin')}</Text>
        <Group position="apart" mt={19}>
          <Text className="body_5-medium">{props.coinName ? props.coinName : t('StakeManagement.filter.all')}</Text>
          <Text
            onClick={() => setOpenFilterListCoin(true)}
            className="body_3-regular"
            c={'var(--grey-dark)'}
            style={{ cursor: 'pointer' }}
          >
            {t('StakeManagement.filter.exchange')}
          </Text>
        </Group>

        <Divider mt={12} mb={34} />

        {/* filter date */}
        <Text className="body_4-bold">{t('StakeManagement.filter.labelTimeStake')}</Text>
        <Group position="apart" noWrap mt={18}>
          <DateInput
            value={props.fromDate}
            onChange={props.setFromDate}
            dateParser={input => {
              const splited = input.split('/');
              const dateSplited = new Date(`${splited[2]}-${splited[1]}-${splited[0]}`);
              return dateSplited && splited.length !== 0 ? dateSplited : new Date(input);
            }}
            valueFormat="DD/MM/YYYY"
            placeholder="Date input"
            maxDate={props.toDate}
            maw={216}
            mx="auto"
            classNames={{ input: classes.input }}
          />
          <Text className="small_3-regular">{t('StakeManagement.filter.to')}</Text>
          <DateInput
            value={props.toDate}
            onChange={props.setToDate}
            dateParser={input => {
              const splited = input.split('/');
              const dateSplited = new Date(`${splited[2]}-${splited[1]}-${splited[0]}`);
              return dateSplited && splited.length !== 0 ? dateSplited : new Date(input);
            }}
            valueFormat="DD/MM/YYYY"
            placeholder="Date input"
            minDate={props.fromDate}
            maw={216}
            mx="auto"
            classNames={{ input: classes.input }}
          />
        </Group>

        <Group position="apart" noWrap spacing={10} mt={16}>
          {!!listTime.length &&
            listTime.map(time => (
              <Button
                key={time.id}
                bg={props.chooseTime === time.number ? 'var(--primary-5)' : '#F3F3F3'}
                c={props.chooseTime === time.number ? 'var(--black)' : 'var(--grey-dark)'}
                onClick={() => handleChooseTime(time.number)}
                className={classes.buttonChooseTime}
              >{`${time.number} ${t(`StakeManagement.filter.${time.unit}`)}`}</Button>
            ))}
        </Group>

        {/* filter state */}
        <Text className="body_4-bold" mt={34} mb={18}>
          {t('StakeManagement.filter.labelState')}
        </Text>
        <Group position="apart" noWrap spacing={10} mt={16}>
          {!!listState.length &&
            listState.map(state => (
              <Button
                key={state.id}
                bg={props.chooseState === state.value ? 'var(--primary-5)' : '#F3F3F3'}
                c={props.chooseState === state.value ? 'var(--black)' : 'var(--grey-dark)'}
                onClick={() => handleChooseState(state.value)}
                className={classes.buttonChooseTime}
              >{`${t(`${state.content}`)}`}</Button>
            ))}
        </Group>

        {/* button filter */}
        <Group position="apart" spacing={8} bg={'var(--white-light)'} p={'10px 16px'} mx={-16} mt={30}>
          <OutlineButton onClick={handleRefresh} style={{ flex: 1 }}>
            {t('StakeManagement.filter.refresh')}
          </OutlineButton>
          <FilledButton onClick={handleFilter} style={{ flex: 1 }}>
            {t('StakeManagement.filter.filterNow')}
          </FilledButton>
        </Group>
      </Box>
      <PopupFalling open={openFilterListCoin} onClose={() => setOpenFilterListCoin(false)} hmb={'70%'} h={'650px'}>
        <OtherStaking setCoinId={props.setCoinId} setOpenFilterListCoin={setOpenFilterListCoin} setCoinName={props.setCoinName} />
      </PopupFalling>
    </>
  );
};

const useStyle = createStyles({
  input: {
    background: '#F3F3F3',
    border: 'transparent',
    textAlign: 'center',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '21px',
  },

  buttonChooseTime: {
    flex: '1 1 76px',
    border: 'transparent',
    minWidth: '76px',
    paddingRight: '5px',
    paddingLeft: '5px',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',

    '&:hover': {
      background: variable.primary.primary5,
      filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    },
  },
});

const useStyleOtherStaking = createStyles(theme => ({
  box: {
    width: '100%',
    gap: 6,
  },
}));
