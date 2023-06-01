import React, { useCallback, useState } from 'react';
import { Box, Button, Flex, Stack, Text, createStyles } from '@mantine/core';
import { DateInput, DatePicker } from '@mantine/dates';
import { TFilterDate } from '../type';
import { variable } from 'styles/variable';
import { MyButton } from 'app/components/Button/MyButton';
import { useMediaQuery } from '@mantine/hooks';

import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import { getDateAfter } from 'utils/helpers/getDateAfter';
import { boxContent } from '../data/data';
import { useFilterWallet } from './FilterContext/FilterProvider';
import { useTranslation } from 'react-i18next';

interface ContentFilterWalletProps {}

const ContentFilterWallet = ({}: ContentFilterWalletProps) => {
  const mobile: boolean = useMediaQuery('(max-width: 768px)');
  const { classes } = makeStyles({ mobile });
  const { t } = useTranslation();
  const { filter, setFilter, active, setActive, setRefresh, setIsFilter, handleFilter, closeFilter, handleRefresh } =
    useFilterWallet();
  function handleSelectActive(item) {
    setActive(item.id);
    const date = getDateAfter(new Date(new Date().setHours(0, 0, 0, 0)), item.type, item.time);
    setFilter({ start: date, end: new Date(new Date().setHours(23, 59, 59, 999)) });
  }

  return (
    <Stack className={classes.stack}>
      <Text className={classes.timeTitle}>{t('wallet.Time')}</Text>
      <Flex className={classes.flexTime}>
        <DateInput
          value={filter.start}
          valueFormat="DD/MM/YYYY"
          locale="vi"
          classNames={{ root: classes.inputDateRoot, input: classes.inputDate }}
          dateParser={value => {
            const date = value.split('/');
            const newDate = new Date(Number(date[2]), Number(date[1]) - 1, Number(date[0]));
            return newDate;
          }}
          onChange={value => {
            setFilter({ start: value as Date, end: filter.end });
            setActive(0);
          }}
          maxDate={filter.end}
        />
        <Text className={classes.toTitle}>{t('wallet.arrive')}</Text>
        <DateInput
          value={filter.end}
          valueFormat="DD/MM/YYYY"
          locale="vi"
          classNames={{ root: classes.inputDateRoot, input: classes.inputDate }}
          dateParser={value => {
            const date = value.split('/');
            const newDate = new Date(Number(date[2]), Number(date[1]) - 1, Number(date[0]));
            return newDate;
          }}
          minDate={filter.start}
          onChange={value => {
            setFilter({ start: filter.start, end: value as Date });
            setActive(0);
          }}
        />
      </Flex>

      <Flex className={classes.flexBox}>
        {boxContent.map((item, index) => (
          <Box
            key={item.id}
            onClick={() => handleSelectActive(item)}
            className={classes.box}
            style={{
              backgroundColor: active == index + 1 ? variable.primary.primary5 : variable.neutral.whiteLight,
              color: active == index + 1 ? variable.neutral.black : variable.neutral.greyDark,
            }}
          >
            <Text className={classes.boxText}>{t(`filter.${item.name}`)}</Text>
          </Box>
        ))}
      </Flex>

      <Flex className={classes.flexButton}>
        <MyButton
          style={{
            color: variable.primary.primary2,
            flex: 1,
          }}
          h={47}
          bg_active="#fff"
          bg_hover="#fff"
          variant="outline"
          onClick={handleRefresh}
        >
          {t('wallet.Refresh')}
        </MyButton>
        <MyButton
          h={47}
          style={{
            flex: 1,
          }}
          onClick={handleFilter}
        >
          {t('wallet.Filter immediately')}
        </MyButton>
      </Flex>
    </Stack>
  );
};

const makeStyles = createStyles((theme, { mobile }: { mobile: boolean }) => ({
  stack: {
    height: '100%',
  },
  timeTitle: {
    padding: '39px 16px 0 16px',
    fontSize: 16,
    fontWeight: 700,
    flexShrink: 0,
  },
  flexTime: {
    padding: '0 16px',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  inputDateRoot: {
    flex: 1,
  },
  inputDate: {
    backgroundColor: variable.neutral.whiteLight,
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
    height: 40,

    ':focus': {
      borderColor: variable.primary.primary2,
    },
  },
  toTitle: {
    fontSize: 14,
    fontWeight: 400,
    color: variable.neutral.greyDark,
  },
  headerModal: {
    display: 'none',
  },

  flexBox: {
    gap: mobile ? 5 : 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
    flexWrap: 'wrap',
    padding: '0 16px',
  },

  flexButton: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    backgroundColor: variable.neutral.whiteLight,
    padding: 16,
    flex: 1,

    borderBottomRightRadius: !mobile ? 20 : 0,
    borderBottomLeftRadius: !mobile ? 20 : 0,
  },
  box: {
    padding: '4px 10px',
    textAlign: 'center',
    minWidth: 76,
    cursor: 'pointer',
    flex: !mobile ? 1 : 0,
  },

  boxText: {
    fontSize: 14,
  },
}));

export default ContentFilterWallet;
