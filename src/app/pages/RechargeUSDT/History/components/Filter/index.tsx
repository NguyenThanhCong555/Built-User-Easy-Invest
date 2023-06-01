import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Divider, Group, LoadingOverlay, Stack, Text, createStyles } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useTranslation } from 'react-i18next';
import { INITIAL_VALUE, RESPONSE_DEFAULT_ERROR, SECONDS_PER_DAY } from 'constants/common';
import { listState, listTime } from './data';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import { FilledButton } from 'app/components/Button/FilledButton';
import { useDispatch, useSelector } from 'react-redux';
import { filterStakingBookRequest } from 'store/slice/stake/request';
import { stakeActions } from 'store/slice/stake';
import { selectTotalPageLocal } from 'store/slice/stake/selector';
import { variable } from 'styles/variable';
import { getRequestHistory } from 'store/slice/recharge/request';
import { rechargeActions } from 'store/slice/recharge';

export type FilterStakeProps = {
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

export const FilterHistoryRecharge = (props: FilterStakeProps) => {
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

  const handleFilter = () => {
    if (!props.fromDate || !props.toDate) return;

    const dataFilter: getRequestHistory = {
      beginTime: props.fromDate.setHours(0, 0, 0, 1),
      endTime: props.toDate.setHours(23, 59, 59, 999),
      service: 1,
      page: 1,
    };
    // set call api new page
    props.setHasMore(true);
    dispatch(rechargeActions.requestGetRequestHistoryRecharge(dataFilter));
    // turn off oppup
    props.setOpenFilter(false);
  };

  const handleRefresh = () => {
    if (!props.fromDate || !props.toDate) return;

    props.setFromDate(new Date(0));
    props.setToDate(new Date());

    const dataFilter: getRequestHistory = {
      beginTime: 0,
      endTime: 0,
      service: 1,
      page: 1,
    };
    // set call api new page
    props.setHasMore(true);
    dispatch(rechargeActions.requestRefreshHistoryRecharge(dataFilter));
    // turn off oppup
    props.setOpenFilter(false);
  };

  return (
    <Box>
      {/* filter date */}
      <Text className="body_4-bold">{t('Withdraw.time')}</Text>
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
  );
};

const useStyle = createStyles({
  input: {
    background: '#F3F3F3',
    border: 'transparent',
    textAlign: 'center',
  },

  buttonChooseTime: {
    flex: '1 1 76px',
    border: 'transparent',
    minWidth: '76px',
    paddingRight: '5px',
    paddingLeft: '5px',

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
