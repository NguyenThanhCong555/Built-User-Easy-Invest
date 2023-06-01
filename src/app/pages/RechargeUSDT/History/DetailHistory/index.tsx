import { ActionIcon, Box, Group, Text, createStyles } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import { CardDetail } from './CardDetail';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCalledTransferHistoryDetail,
  selectListTransferDetail,
  selectLoadingTransferDetail,
  selectTransferHistory,
} from 'store/slice/recharge/selector';
import { TransferDetail, TransferHistory } from 'store/slice/recharge/types';
import ConvertDate from 'helpers/formatDate';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { MyButton } from 'app/components/Button/MyButton';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import { variable } from 'styles/variable';
import { STATUS_WAITING } from 'constants/recharge';
import { rechargeActions } from 'store/slice/recharge';
import CopyToolTip from 'app/components/CopyToolTip/CopyToolTip';
import Loading from 'app/components/Loading/Loading';
import { TYPE_BINANCE } from 'constants/common';

type Props = {};

export const DetailHistoryRecharge = (props: Props) => {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const { detailRechargeId } = useParams();
  const { classes } = useStyle();
  const dispatch = useDispatch();

  const transferHistory = useSelector(selectTransferHistory);

  function handleGetTransferDetail(dataTransferDetail: TransferDetail[], transferId: number): TransferDetail | undefined {
    for (let transfer of dataTransferDetail) {
      if (transfer.id === Number(transferId)) return transfer;
    }
    return undefined;
  }

  const calledFirstTransferDetail = useSelector(selectCalledTransferHistoryDetail);
  const listTransferDetail = useSelector(selectListTransferDetail);
  const loading = useSelector(selectLoadingTransferDetail);

  const getProjectDetail = useCallback(handleGetTransferDetail, []);

  const transferDetail = getProjectDetail(listTransferDetail, Number(detailRechargeId));

  const callbackGetDetailOfRechargeHistory = useCallback(
    (listHistory: TransferHistory[], detailRechargeId: number): TransferHistory | undefined => {
      for (let history of listHistory) {
        if (history.id === detailRechargeId) return history;
      }
      return undefined;
    },
    [],
  );

  useEffect(() => {
    if (detailRechargeId && !calledFirstTransferDetail.includes(Number(detailRechargeId))) {
      dispatch(rechargeActions.requestGetInfoRequest({ request_id: Number(detailRechargeId) }));
    }
  }, []);

  const detailHistoryRecharge = callbackGetDetailOfRechargeHistory(transferHistory, Number(detailRechargeId));

  const moveToListHistory = () => {
    navigation('/recharge/history');
  };

  const moveToEdit = () => {
    dispatch(rechargeActions.setAddUsdt({ usdt: String(detailHistoryRecharge?.exchange) }));
    if (transferDetail?.banking_info?.type === TYPE_BINANCE)
      return navigation(`/recharge/edit/binance/${detailHistoryRecharge?.id}`);
    else return navigation(`/recharge/edit/bank/${detailHistoryRecharge?.id}`);
  };

  const moveToSupport = () => {
    dispatch(rechargeActions.setAddUsdt({ usdt: String(detailHistoryRecharge?.exchange) }));
    navigation('/recharge/history/support');
  };

  return (
    <Frame onMovePage={moveToListHistory} titlePage={t('HistoryRecharge.titleDetailPage')}>
      {detailHistoryRecharge && (
        <Box px={16}>
          <Group w={'100%'} noWrap position="apart" mt={16} mb={8}>
            <Text className="small_2-medium">{t('HistoryRecharge.GDCode')}</Text>
            <Group spacing={2} noWrap>
              <Text className="small_2-medium">{detailHistoryRecharge.id}</Text>
              <CopyToolTip text={String(detailHistoryRecharge.id)} />
            </Group>
          </Group>

          <CardDetail
            accountNumber={transferDetail?.banking_info?.account_number ?? ''}
            avatarBank={transferDetail?.banking_info?.banking_logo ?? ''}
            creationTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(transferDetail?.create_time ?? 0))}
            nameBank={transferDetail?.banking_info.banking_name ?? ''}
            nameReceiver={transferDetail?.banking_info.account_name ?? ''}
            transferContent={transferDetail?.content ?? ''}
            updateTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(transferDetail?.update_time ?? 0))}
            usdt={numberWithCommas(
              transferDetail?.status === 1 ? transferDetail?.real_exchange ?? 0 : transferDetail?.exchange ?? 0,
            )}
            status={transferDetail?.status ?? 0}
          />
        </Box>
      )}

      <Box className={classes.whiteSpace}></Box>

      {/* button edit and support  */}
      {detailHistoryRecharge?.status === STATUS_WAITING ? (
        <Group className={classes.groupButtonContinue} noWrap>
          <OutlineButton onClick={moveToEdit} w="calc(100% - 4px)" h={44}>
            {t('HistoryRecharge.buttonEdit')}
          </OutlineButton>
          <OutlineButton onClick={moveToSupport} w="calc(100% - 4px)" h={44}>
            {t('HistoryRecharge.buttonSupport')}
          </OutlineButton>
        </Group>
      ) : (
        <Group className={classes.groupButtonContinue} noWrap>
          <OutlineButton onClick={moveToSupport} w="100%" h={44}>
            {t('HistoryRecharge.buttonSupport')}
          </OutlineButton>
        </Group>
      )}

      <Loading visible={loading} />
    </Frame>
  );
};

const useStyle = createStyles(() => ({
  groupButtonContinue: {
    width: '100%',
    padding: '10px 16px',
    marginTop: '40px',

    '@media (max-width : 576px)': {
      position: 'fixed',
      bottom: 0,
      left: 0,
      background: variable.neutral.whiteLight,
    },
  },

  whiteSpace: {
    '@media (max-width : 576px)': {
      paddingBottom: '40px',
      paddingTop: '40px',
    },
  },

  notificationTitle: {
    fontWeight: 700,
    fontSize: '16px',
  },
}));
