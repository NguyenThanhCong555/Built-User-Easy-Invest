import { Box, Group, Text, createStyles } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { CardDetail } from './CardDetail';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransferHistory } from 'store/slice/withdraw/selector';
import { useParams } from 'react-router-dom';
import { TransferHistory } from 'store/slice/withdraw/types';
import ConvertDate from 'helpers/formatDate';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import { variable } from 'styles/variable';
import { STATUS_WAITING } from 'constants/recharge';
import { withdrawActions } from 'store/slice/withdraw';
import CopyToolTip from 'app/components/CopyToolTip/CopyToolTip';

type Props = {};

export const DetailHistoryWithdraw = (props: Props) => {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const { detailWithdrawId } = useParams();
  const { classes } = useStyle();
  const dispatch = useDispatch();

  const transferHistory = useSelector(selectTransferHistory);

  const callbackGetDetailOfWithdrawHistory = useCallback(
    (listHistory: TransferHistory[], detailWithdrawId: number): TransferHistory | undefined => {
      for (let history of listHistory) {
        if (history.id === detailWithdrawId) return history;
      }
      return undefined;
    },
    [],
  );
  const detailHistoryWithdraw = callbackGetDetailOfWithdrawHistory(transferHistory, Number(detailWithdrawId));

  const moveToListHistory = () => {
    navigation('/withdraw/history');
  };

  const moveToEdit = () => {
    dispatch(withdrawActions.setAddUsdt({ usdt: String(detailHistoryWithdraw?.exchange) }));
    dispatch(withdrawActions.setAddBinanceId({ binanceId: String(detailHistoryWithdraw?.other.account_number) }));
    navigation(`/withdraw/edit/entry/${detailHistoryWithdraw?.id}`);
  };

  const moveToSupport = () => {
    dispatch(withdrawActions.setAddUsdt({ usdt: String(detailHistoryWithdraw?.exchange) }));
    dispatch(withdrawActions.setAddBinanceId({ binanceId: String(detailHistoryWithdraw?.other?.account_number) }));
    navigation('/withdraw/history/support');
  };

  return (
    <Frame onMovePage={moveToListHistory} titlePage={t('Withdraw.detailWithdraw')}>
      {detailHistoryWithdraw && (
        <Box px={16}>
          <Group w={'100%'} noWrap position="apart" mt={16} mb={8}>
            <Text className="small_2-medium">{t('HistoryRecharge.GDCode')}</Text>
            <Group spacing={2} noWrap>
              <Text className="small_2-medium">{detailHistoryWithdraw.id}</Text>
              <CopyToolTip text={String(detailHistoryWithdraw.id)} />
            </Group>
          </Group>

          <CardDetail
            accountNumber={detailHistoryWithdraw?.other.account_number}
            avatarBank={detailHistoryWithdraw?.other.banking_logo}
            creationTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(detailHistoryWithdraw?.create_time))}
            nameBank={detailHistoryWithdraw?.other.banking}
            nameReceiver={detailHistoryWithdraw?.other.account_name}
            transferContent={detailHistoryWithdraw?.content}
            updateTime={ConvertDate.GetHHMMSS_DDMMYY(new Date(detailHistoryWithdraw?.update_time))}
            usdt={numberWithCommas(detailHistoryWithdraw.exchange)}
            status={detailHistoryWithdraw?.status}
          />
        </Box>
      )}

      <Box className={classes.whiteSpace}></Box>

      {/* button edit and support  */}
      {detailHistoryWithdraw?.status === STATUS_WAITING ? (
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
