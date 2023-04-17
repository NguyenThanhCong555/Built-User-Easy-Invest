import React, { useCallback, useEffect } from 'react';
import { Box, Center, Collapse, Flex, Group, Image, Modal, Stack, Text, createStyles } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { neutral, primary } from 'styles/variable';

import { MyButton } from 'app/components/Button/MyButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeaderDetails from './components/HeaderDetails';
import { Accumulation } from './components/Accumulation';

import { ReactComponent as ArrowDown } from 'assets/icons/arrow/arrow-bottom.svg';
import { ReactComponent as IconUSDT } from 'assets/icons/coin/usdt.svg';
import {
  selectCalledStakingBook,
  selectStakingBook,
  selectTotalUsdtClose,
  selectTotalUsdtOpen,
} from 'store/slice/stake/selector';
import { stakeActions } from 'store/slice/stake';
import { filterBookStake } from './utils';
import { TStakingBook } from 'store/slice/stake/types';
import ConvertDate from 'helpers/formatDate';
import { formatPhoneNumber } from 'helpers/formatPhoneNumber';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';

interface Styleprops {
  moblies?: any;
  clickrotate?: any;
}

interface ProfitInformationProps {
  TotalUSDT: number | string;
  valueUSD: number | string;
  mt?: string | number;
}

interface StakingBookCardProps {
  stakingId: number;
  usdt: string | number;
  coin: string | number;
  coinName: string;
  time: string;
}

interface StackingNumProps {
  openStake: TStakingBook[];
  closeStake: TStakingBook[];
}

const ContentModal = () => {
  const { t } = useTranslation();

  return (
    <>
      <Center>
        <Text className="body_1-bold" c={'var(--primary-2)'}>
          Stake
        </Text>
      </Center>
      <Stack mt={16} spacing={12}>
        <Text className="Small_2-medium">{t('StakeManagement.modal.text1')}</Text>
        <Text className="Small_2-medium">{t('StakeManagement.modal.text2')}</Text>
        <Text className="Small_2-medium">{t('StakeManagement.modal.text3')}</Text>

        <Text className="small_4-bold">{t('StakeManagement.modal.label')}</Text>
        <Accumulation label={t('StakeManagement.modal.text4')} value={''} mark />
        <Accumulation label={t('StakeManagement.modal.text5')} value={''} mark />
      </Stack>
    </>
  );
};

const StakingBookCard = (props: StakingBookCardProps) => {
  const { t } = useTranslation();
  const { classes } = useStyleStakingBookCard();
  const navigation = useNavigate();

  const moveToBoughtStake = () => {
    navigation(`/stake/info/${props.stakingId}`);
  };

  return (
    <Box className={classes.box} onClick={moveToBoughtStake}>
      <Accumulation label="Staking:" value={props.usdt} unitValue={<IconUSDT />} colorValue="var(--secondary-1)" />
      <Accumulation
        label={t('StakeManagement.increasedProfits')}
        value={props.coin}
        unitValue={props.coinName}
        colorValue="var(--primary-2)"
      />
      <Text className="small_2-medium" c="var(--grey)">
        {props.time}
      </Text>
    </Box>
  );
};

const ProfitInformation = (props: ProfitInformationProps) => {
  const { t } = useTranslation();
  const { classes } = useStyleProfitInformation();

  return (
    <Stack align="center" justify="center" className={classes.stake} mt={props.mt}>
      <Text lh={'18px'} c="var(--primary-4)" className="small_3-regular">
        {t('StakeManagement.totalAssets')}
      </Text>
      <Text lh={'42px'} c="var(--white)" mt={4} className="title_2-medium">
        {props.TotalUSDT} USDT
      </Text>
      <Text lh={'23px'} c="var(--primary-4)" className="body_2-medium">
        ~{props.valueUSD} USD
      </Text>
    </Stack>
  );
};

const StackingNum = (props: StackingNumProps) => {
  const { t } = useTranslation();
  const mobile: any = useMediaQuery('(max-width: 768px)');
  const [rotateauto, setRotateauto] = useState(true);
  const { classes } = createNewStyle({ moblies: mobile, clickrotate: rotateauto });

  return (
    <Stack className={classes.stakingNum}>
      {!!props.openStake.length && (
        <>
          <Text className="body_4-bold">{t('StakeManagement.stakingBook')}</Text>
          <Stack w={'100%'} spacing={8}>
            {props.openStake.map(stakeBook => (
              <StakingBookCard
                key={stakeBook.id}
                stakingId={stakeBook.id}
                usdt={numberWithCommas(String(stakeBook.usdt))}
                coin={numberWithCommas(String(stakeBook.coin))}
                coinName={'LULU'}
                time={ConvertDate.getDDMMYY(new Date(stakeBook.time_start))}
              />
            ))}
          </Stack>
        </>
      )}

      {!!props.closeStake.length && (
        <>
          <Text className="body_4-bold">{t('StakeManagement.closeBook')}</Text>
          <Stack w={'100%'} spacing={8}>
            {props.closeStake.map(stakeBook => (
              <StakingBookCard
                key={stakeBook.id}
                stakingId={stakeBook.stake_id}
                usdt={stakeBook.usdt}
                coin={stakeBook.coin}
                coinName={'LULU'}
                time={ConvertDate.getDDMMYY(new Date(stakeBook.time_start))}
              />
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export const StakeManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mobile: any = useMediaQuery('(max-width: 768px)');
  const { classes } = createNewStyle({ moblies: mobile });
  const dispatch = useDispatch();

  const [opened, setOpen] = useState(false);
  const calledStakingBook = useSelector(selectCalledStakingBook);
  const stakingBook = useSelector(selectStakingBook);
  const totalUsdtClose = useSelector(selectTotalUsdtClose);
  const totalUsdtOpen = useSelector(selectTotalUsdtOpen);

  const callbackFilterBookStake = useCallback(filterBookStake, []);
  const openStakeBook = useMemo(() => callbackFilterBookStake(stakingBook ?? [], 0), [stakingBook]);
  const closeStakeBook = useMemo(() => callbackFilterBookStake(stakingBook ?? [], 1), [stakingBook]);

  useEffect(() => {
    if (!calledStakingBook) dispatch(stakeActions.requestGetStakingBook());
  }, []);

  return (
    <Flex direction={'column'} w={'100%'} h={'fit-content'}>
      <Flex className={classes.boxProject2}>
        <HeaderDetails setOpen={setOpen} isDetail text="Stake"></HeaderDetails>

        <Box px={16}>
          <ProfitInformation
            TotalUSDT={numberWithCommas(totalUsdtClose + totalUsdtOpen)}
            valueUSD={numberWithCommas(23.5)}
            mt={14}
          ></ProfitInformation>
        </Box>
        <MyButton onClick={() => navigate('/')} className="butStake">
          Stake
        </MyButton>
        {/* filter */}
        {/* <Group position="right" className={classes.listProject}>
          <Text className="small_2-edium">{t('StakeManagement.all')}</Text>
          <ArrowDown className={`rotateImg`}></ArrowDown>
        </Group> */}
        <StackingNum openStake={openStakeBook} closeStake={closeStakeBook}></StackingNum>
      </Flex>

      <Modal centered opened={opened} onClose={() => setOpen(false)} classNames={{ header: classes.headerModal }}>
        <ContentModal />
      </Modal>
    </Flex>
  );
};

const createNewStyle = createStyles((theme, params: Styleprops) => ({
  stakingNum: {
    width: '100%',
    background: neutral.whiteLight,
    padding: '10px 16px',
    justifyContent: 'center',

    '.closedbook': {
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      marginBottom: '20px',
    },
  },
  listProject: {
    width: '100%',
    overflow: 'hidden',
    gap: 2,
    background: 'var(--grey-light)',
    padding: '12px 13px',

    '.rotateImg': {
      transition: 'all .3s linear',
      transform: params.clickrotate ? 'rotateX(180deg)' : 'rotateX(0deg)',
    },
  },

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
      maxWidth: params.moblies ? '343px' : '570px',
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
}));

const useStyleProfitInformation = createStyles(theme => ({
  stake: {
    height: '115px',
    background: 'var(--primary-2)',
    borderRadius: '14px',
    padding: '12px 10px',
    gap: 2,
  },
}));

const useStyleStakingBookCard = createStyles(theme => ({
  box: {
    width: '100%',
    padding: '5.5px 12px 4px',
    background: 'var(--white)',
    border: `1px solid var(--white)`,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '8px',
    cursor: 'pointer',
  },
}));
