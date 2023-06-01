import React, { useRef, useState } from 'react';
import { Box, Center, createStyles, Divider, Group, Image, Loader, Modal, Stack, Text, TextInput } from '@mantine/core';
import { memo, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { projectActions } from 'store/slice/project';
import { selectCalledFirstProjectDetail, selectListProjectDetail } from 'store/slice/project/selector';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Helmet } from 'react-helmet-async';

import { handleGetProjectDetail } from 'app/pages/Projects/utils';
import { Frame } from 'app/layouts/Frame';
import { variable } from 'styles/variable';
import { images } from 'assets/images';
import { selectWalletTotalCoin } from 'store/slice/wallet/selectors';
import { FilledButton } from 'app/components/Button/FilledButton';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import {
  selectAddCoinToGame,
  selectAddGameId,
  selectCalledTransferHistoryGame,
  selectTotalPageLocalOfHistoryGame,
  selectTotalPageOfHistoryGame,
  selectTransferHistoryGame,
} from 'store/slice/withdraw/selector';
import { withdrawActions } from 'store/slice/withdraw';
import { authActions } from 'store/slice/auth';
import { selectProfile } from 'store/slice/profile/selector';
import { WITHDRAW_MONEY_CODE_GAME } from 'constants/account';
import { getRequestHistory } from 'store/slice/recharge/request';
import InfiniteScroll from 'react-infinite-scroll-component';
import ConvertDate from 'helpers/formatDate';
import { useMediaQuery } from '@mantine/hooks';

type TitleInfermationProps = {
  avatar: string;
  title: string;
  author: string;
  pos?: any;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

const TitleInformation = (props: TitleInfermationProps) => {
  const { classes } = useStyleTitleInfor();

  return (
    <Group
      className={classes.group}
      pos={props.pos}
      top={props.top}
      left={props.left}
      right={props.right}
      bottom={props.bottom}
      noWrap
    >
      <Image src={props.avatar} classNames={{ root: classes.rootImage, image: classes.avatar }} width={'90px'} height={'90px'} />
      <Stack spacing={0}>
        <Text lineClamp={1} className="subtitle_4-bold" lh={'26px'}>
          {props.title}
        </Text>
        <Text lineClamp={1} className="small_5-medium" lh={'16px'}>
          {props.author}
        </Text>
      </Stack>
    </Group>
  );
};

type CardInfo = {
  title: string;
  value: string;
  mb?: string | number;
  mt?: string | number;
};

const useStyleCardInfo = createStyles(theme => ({
  group: {
    height: '48px',
    background: 'var(--white)',
    border: `1px solid var(--grey-light)`,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '8px',
  },
}));

const CardInfo = (props: CardInfo) => {
  const { classes } = useStyleCardInfo();

  return (
    <Group position="apart" mb={props.mb} mt={props.mt} px={12} className={classes.group}>
      <Text className="body_4-bold">{props.title}</Text>
      <Text className="subtitle_4-bold" c={'var(--primary-2)'}>
        {props.value}
      </Text>
    </Group>
  );
};

export const CoinToTheGame = memo(() => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { coinId } = useParams();
  const smallThan576 = useMediaQuery('(max-width:576px)');

  console.log(smallThan576);

  const [errorAmount, setErrorAmount] = useState<boolean>(false);
  const [errorUserId, setErrorUserId] = useState<boolean>(false);
  const [openPopupEnoughCoin, setOpenPopupEnoughCoin] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const InputGameIdRef = useRef<HTMLInputElement>(null);
  const InputAmountRef = useRef<HTMLInputElement>(null);

  const amount = useSelector(selectAddCoinToGame);
  const gameId = useSelector(selectAddGameId);
  const walletTotalCoin = useSelector(selectWalletTotalCoin);
  const profile = useSelector(selectProfile);
  const transferHistory = useSelector(selectTransferHistoryGame);
  const calledTransferHistory = useSelector(selectCalledTransferHistoryGame);
  const totalPage = useSelector(selectTotalPageOfHistoryGame);
  const totalPageLocal = useSelector(selectTotalPageLocalOfHistoryGame);

  const calledFirstProjectDetail = useSelector(selectCalledFirstProjectDetail);
  const listProjectDetail = useSelector(selectListProjectDetail);

  const getProjectDetail = useCallback(handleGetProjectDetail, []);

  const projectDetail = getProjectDetail(listProjectDetail, Number(walletTotalCoin.project_id));
  const { classes } = useStyleProjectDetail({ url: '' });

  useEffect(() => {
    if (walletTotalCoin.project_id && !calledFirstProjectDetail.includes(Number(walletTotalCoin.project_id))) {
      dispatch(projectActions.requestGetProjectDetail({ projectId: Number(walletTotalCoin.project_id) }));
    }

    const dataFilter: getRequestHistory = {
      beginTime: 0,
      endTime: 0,
      page: 1,
      service: WITHDRAW_MONEY_CODE_GAME,
      coin_id: Number(coinId),
    };
    setHasMore(true);

    dispatch(withdrawActions.requestRefreshHistoryGameWithdraw(dataFilter));
  }, []);

  useEffect(() => {
    if (totalPage < totalPageLocal) {
      setHasMore(false);
      return;
    } else setHasMore(true);
  }, [transferHistory]);

  const fetchMoreData = () => {
    if (totalPage < totalPageLocal) {
      setHasMore(false);
      return;
    }

    const dataFilter: getRequestHistory = {
      beginTime: 0,
      endTime: 0,
      page: totalPageLocal,
      service: WITHDRAW_MONEY_CODE_GAME,
      coin_id: Number(coinId),
    };
    dispatch(withdrawActions.requestGetRequestHistoryGameWithdraw(dataFilter));
  };

  const moveToPageProjects = () => {
    dispatch(withdrawActions.resetAddCoinToGame());
    dispatch(withdrawActions.resetAddGameId());
    navigation(`/wallet/coin/${coinId}`);
  };

  const onChangeGameId = event => {
    const value = event.target.value;
    if (value.length > 23) return;

    dispatch(withdrawActions.setAddGameId({ gameId: value }));
  };
  const onChangeAmount = event => {
    const value = event.target.value;
    if (value.length > 23) return;

    dispatch(withdrawActions.setAddCoinToGame({ amount: value }));
  };

  function handleCheckInput(e) {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = newValue;
  }

  const handleSetErrorAmount = () => {
    setErrorAmount(true);
    if (InputAmountRef.current) InputAmountRef.current.focus();
  };

  const handleConfirmWithdraw = () => {
    if (walletTotalCoin.balance - walletTotalCoin.min_transfer < 0) {
      setOpenPopupEnoughCoin(true);
      return;
    }

    if (gameId.length < 1) {
      setErrorUserId(true);
      if (InputGameIdRef.current) InputGameIdRef.current.focus();
      return;
    } else setErrorUserId(false);

    if (amount.length < 1) {
      handleSetErrorAmount();
      return;
    } else setErrorAmount(false);

    if (Number(amount) < walletTotalCoin.min_transfer || Number(amount) > walletTotalCoin.balance) {
      handleSetErrorAmount();
      return;
    } else setErrorAmount(false);

    dispatch(authActions.requestGetOtp(profile.phone_number));
    navigation('confirm');
  };

  return (
    <>
      <Helmet>
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
        <title>Easy Invest</title>
      </Helmet>
      <Frame titlePage={projectDetail?.name} onMovePage={moveToPageProjects} pb={40}>
        <InfiniteScroll
          dataLength={transferHistory.length}
          next={fetchMoreData}
          hasMore={hasMore}
          height={smallThan576 ? 'calc(100vh - 185px)' : 'calc(100vh - 235px)'}
          loader={<Center>{<Loader size="sm" color={variable.primary.primary2} />}</Center>}
          endMessage={<Text></Text>}
        >
          <Box className={classes.container}>
            {!!projectDetail?.cover_photo.length && (
              <Carousel infiniteLoop centerMode showArrows={false} showIndicators={false} showThumbs autoPlay interval={2000}>
                {projectDetail.cover_photo.map((urlBanner, index) => (
                  <Image height={227} width={'100%'} src={urlBanner} />
                ))}
              </Carousel>
            )}

            <TitleInformation
              avatar={projectDetail?.avatar ?? ''}
              title={projectDetail?.name ?? ''}
              author={projectDetail?.author?.name ?? ''}
              pos={'absolute'}
              top={180}
              left={30}
            />
          </Box>

          <Box px={16} mt={70} pb={24}>
            <Text mt={14} className="body_4-bold">
              {t('CoinToGameId.userId')}{' '}
              <Text span className="body_4-bold" c={'var(--secondary-2)'}>
                *
              </Text>
            </Text>

            <TextInput
              placeholder={t('CoinToGameId.placeholderUserId')}
              value={gameId}
              onChange={event => onChangeGameId(event)}
              onInput={e => handleCheckInput(e)}
              classNames={{ root: classes.groupInputNumber, input: classes.textInputPayId }}
              ref={InputGameIdRef}
            />
            {/* limit error*/}
            {errorUserId && (
              <Text className="small_3-regular" c={variable.secondary.secondary2}>
                {t('CoinToGameId.errorEntryUserId')}
              </Text>
            )}

            <Text mt={10} mb={4} className="body_4-bold">
              {t('CoinToGameId.amount')}{' '}
              <Text span className="body_4-bold" c={'var(--secondary-2)'}>
                *
              </Text>
            </Text>
            <Group spacing={0} radioGroup="8px" noWrap className={classes.researchGroupInput}>
              <TextInput
                placeholder={`${t('CoinToGameId.valueTo')} ${
                  Number(walletTotalCoin.balance) - Number(walletTotalCoin.min_transfer) > 0
                    ? `${numberWithCommas(Number(walletTotalCoin.min_transfer).toFixed(3))} - ${numberWithCommas(
                        Number(walletTotalCoin.balance).toFixed(3),
                      )}`
                    : `${numberWithCommas(Number(walletTotalCoin.min_transfer).toFixed(3))}`
                }`}
                value={amount}
                data-autofocus
                onChange={event => onChangeAmount(event)}
                onInput={e => handleCheckInput(e)}
                classNames={{ root: classes.groupInputNumber, input: classes.textInput }}
                ref={InputAmountRef}
              />

              <Center className={classes.buttonExchange}>
                <Text>{walletTotalCoin.coin_name}</Text>
              </Center>
            </Group>
            {/* limit error*/}
            {errorAmount && (
              <Text className="small_3-regular" c={variable.secondary.secondary2}>
                {t('CoinToGameId.errorEntryAmount')} {'  '}
                {Number(walletTotalCoin.balance) - Number(walletTotalCoin.min_transfer) > 0
                  ? `${numberWithCommas(Number(walletTotalCoin.min_transfer).toFixed(3))} - ${numberWithCommas(
                      Number(walletTotalCoin.balance).toFixed(3),
                    )}`
                  : `${numberWithCommas(Number(walletTotalCoin.min_transfer).toFixed(3))}`}
              </Text>
            )}

            {/* history transaction */}
            <Text mt={10} mb={4} className="body_4-bold">
              {t('CoinToGameId.recentTransaction')}
            </Text>
            <Stack p={0} spacing={12}>
              {!!transferHistory.length &&
                transferHistory.map(history => (
                  <Box>
                    <Group position="apart">
                      <Text className="body_6-regular">ID: {history.other.ID}</Text>
                      <Text className="small_2-medium">{ConvertDate.GetHHMMSS_DDMMYY(new Date(history.create_time))}</Text>
                    </Group>
                    <Divider mt={2} />
                  </Box>
                ))}
            </Stack>
          </Box>
        </InfiniteScroll>

        <Group className={classes.groupButtonStake}>
          <FilledButton onClick={handleConfirmWithdraw} w="100%" h={44}>
            {t('CoinToGameId.btnConfirm')}
          </FilledButton>
        </Group>
      </Frame>

      {/* popup not enough coin */}
      <Modal opened={openPopupEnoughCoin} onClose={() => setOpenPopupEnoughCoin(false)} centered>
        <Text>{t('CoinToGameId.enoughCoin')}</Text>
      </Modal>
    </>
  );
});
const useStyleTitleInfor = createStyles(theme => ({
  group: {
    width: 'calc(100% - 40px)',
    gap: 10,
    alignItems: 'flex-end',
  },

  rootImage: {
    width: '90px',
    height: '90px',
  },

  avatar: {
    border: ` 2px solid ${variable.primary.primary1}`,
    borderRadius: '8px',
  },
}));

const useStyleProjectDetail = createStyles((theme, params: { url: string }) => ({
  container: {
    maxWidth: '100%',
    height: '227px',
    position: 'relative',

    backgroundImage: `url(${params.url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  linkURL: {
    justifyContent: 'space-between',
    cursor: 'pointer',
    marginTop: '8px',
  },

  TextLink: {
    width: '100%',
    maxWidth: '500px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    '@media (max-width:576px)': {
      width: '270px',
    },
  },

  researchGroupInput: {
    borderRadius: '8px',
    border: `1px solid ${variable.neutral.grey}`,
  },

  textInput: {
    height: '44px',
    width: '100%',
    border: 'none',
    padding: '0 16px',
    borderRadius: '10px',
  },
  groupInputNumber: {
    width: '100%',
  },

  buttonExchange: {
    height: '44px',
    width: '78px',
    background: variable.primary.primary5,
    borderRadius: '0 8px 8px 0',
  },

  textInputPayId: {
    height: '44px',
    width: '100%',
    padding: '0 16px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 400,
    // border: `1px solid ${params.errorBinanceId ? variable.secondary.secondary2 : '#929292'}`,
    border: `1px solid #929292`,
    // '&:focus': {
    //   border: `1px solid #929292`,
    // },
  },

  groupButtonStake: {
    width: '100%',
    padding: '10px 16px',

    '@media (max-width : 576px)': {
      position: 'fixed',
      bottom: 0,
      left: 0,
      background: variable.neutral.whiteLight,
    },
  },
}));
