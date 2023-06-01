import React, { useEffect } from 'react';
import { Box, Divider, LoadingOverlay, Stack, createStyles } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { usePopupFalling } from '../../components/PopupFalling/PopupContext';
import { selectCallListCoin, selectListCoins, selectLoadingCoin } from 'store/slice/coin/selector';
import { coinActions } from 'store/slice/coin';
import { CardCoin } from './CardCoin';

type OtherStakingProps = {
  setUsdt: React.Dispatch<React.SetStateAction<string>>;
  SetCoinAfterExchange: React.Dispatch<React.SetStateAction<string>>;
};

export const OtherCoin = (props: OtherStakingProps) => {
  const navigation = useNavigate();
  const { classes } = useStyleOtherStaking();
  const dispatch = useDispatch();

  const { clearPopup } = usePopupFalling();
  const callListCoin = useSelector(selectCallListCoin);
  const listCoins = useSelector(selectListCoins);
  const loadingListCoin = useSelector(selectLoadingCoin);

  useEffect(() => {
    if (!callListCoin) {
      dispatch(coinActions.requestGetListCoins());
    }
  }, [callListCoin]);

  const handleClick = (event, projectId) => {
    event.stopPropagation();

    props.setUsdt('');
    props.SetCoinAfterExchange('');
    navigation(`/projects/stakes/${projectId}`);
    clearPopup();
  };

  return (
    <Stack className={classes.box}>
      <LoadingOverlay visible={loadingListCoin} />

      {!!listCoins.length &&
        listCoins.map(coinInfo => (
          <Box key={coinInfo.project_id}>
            <CardCoin
              projectId={coinInfo?.project_id ?? 0}
              key={coinInfo?.project_id}
              avatar={coinInfo?.coin_avatar ?? ''}
              name={coinInfo?.coin_name ?? ''}
              value={`APR ${coinInfo.min_interest_rate ?? 0}-${coinInfo.max_interest_rate ?? 0}%`}
              onClick={e => handleClick(e, coinInfo?.project_id)}
            />
            <Divider mb={12} c={'var(--light)'} mt={6} />
          </Box>
        ))}
    </Stack>
  );
};

const useStyleOtherStaking = createStyles(theme => ({
  box: {
    width: '100%',
    gap: 6,
  },
}));
