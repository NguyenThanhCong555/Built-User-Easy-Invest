import { Flex, Text, createStyles } from '@mantine/core';
import React, { useLayoutEffect, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { walletActions } from 'store/slice/wallet';
import { formatCurrency } from 'utils/formatCurrency';
import { convertDateTime } from 'utils/helpers/convertDateTime';

export interface IHistory {
  id?: string | number;
  name?: string | number;
  coin?: string | number;
  time_rate?: string | number;
  day_rate?: string | number;
  surplus?: string | number;
  service?: string | number;
  create_time?: string | number;
}

export const ItemsHistory = (props: IHistory) => {
  const { t } = useTranslation();
  const { classes: c } = createStyleProps({});
  const navigate = useNavigate();

  const timestamp: any = props.create_time;
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  return (
    <Flex className={c.Boxhistory} onClick={() => navigate(`/wallet/transaction/detail/${props.id}`)}>
      <Flex className={c.top}>
        <Text fw={700} fz={16} color="#000000">
          {props.service}
        </Text>
        <Text
          fw={700}
          fz={16}
          sx={{
            color: Number(props.coin) > 0 ? '#26C95D' : '#000000',
          }}
        >
          {Number(props.coin) > 0 ? '+' : null}
          {formatCurrency(props.coin)}
        </Text>
      </Flex>
      <Flex className={c.bottom}>
        <Flex>
          <Text mr={3} fz={12} fw={500} color="#424242">
            {`${hours}:${minutes}`}
          </Text>
          <Text fz={12} fw={500} color="#424242">
            {`${day}/${month}/${year}`}
          </Text>
        </Flex>
        <Flex>
          <Text mr={3} fz={12} fw={500} color="#929292">
            {t('wallet.history.Surplus')}{' '}
          </Text>
          <Text fz={12} fw={500} color="#000000">
            {formatCurrency(props.surplus)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
const createStyleProps = createStyles((theme, params: IHistory) => ({
  Boxhistory: {
    width: '100%',
    flexDirection: 'column',
    borderBottom: '1px solid var(--light)',
  },
  top: { justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' },
  bottom: { justifyContent: 'space-between', alignItems: 'center', marginBottom: '9px' },
}));
