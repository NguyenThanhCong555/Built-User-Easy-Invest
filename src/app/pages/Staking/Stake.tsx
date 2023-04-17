import {
  Avatar,
  Box,
  Center,
  Divider,
  Group,
  Modal,
  NumberInput,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
  createStyles,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';

import { MyButton } from 'app/components/Button/MyButton';
import { Frame } from 'app/layouts/Frame';
import { variable } from 'styles/variable';
import { Accumulation } from './components/Accumulation';
import { PopupFallingProvider, usePopupFalling } from './components/PopupFalling/PopupContext';
import PopupFalling from './components/PopupFalling/Popup';
import { RESPONSE_SUCCESS_ERROR, SECONDS_PER_DAY } from 'constants/common';
import {
  selectCalledStakes,
  selectListStakes,
  selectLoadingTradingStake,
  selectResponseErrorTradingStake,
} from 'store/slice/stake/selector';
import { selectCalledFirstProjectDetail, selectListProjectDetail } from 'store/slice/project/selector';
import { handleGetProjectDetail } from '../Projects/utils';
import { stakeActions } from 'store/slice/stake';
import { GetListAPROfStake, GetProfitAfterTerm, getListStakes, handleGetSpecifyStakeOfProject } from './utils';
import ConvertDate from 'helpers/formatDate';
import { ConfirmAskPopup } from 'app/components/Popup/ConfirmAskPoppup';
import { TradingStakeRequest } from 'store/slice/stake/request';
import { TransactionSuccess } from 'app/components/Popup/TransactionSuccess';
import { PopupPaymentConfirmation } from './components/Popup';
import { RESPONSE_ERROR_NOT_ENOUGH_USDT } from 'store/slice/stake/response';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { selectCallListCoin, selectListCoins } from 'store/slice/coin/selector';
import { coinActions } from 'store/slice/coin';
import { projectActions } from 'store/slice/project';

type Props = {};

type ListAPRProps = {
  ListAPR: { id: number; day: number; rateUsdt: number }[];
  selectAPR: number;
  setSelectAPR: React.Dispatch<SetStateAction<number>>;
  setTimeAPR: React.Dispatch<SetStateAction<number>>;
  setRateAPR: React.Dispatch<SetStateAction<number>>;
};

type InformationProjectProps = {
  avatar: string;
  title: string;
  triggerPopup?: any;
  px?: string | number;
  mt?: string | number;
};

type TStake = {
  projectId: number;
  avatar: string;
  name: string;
  value: string;
  onClick?: (e?: any) => void;
};

const CardStake = (props: TStake) => {
  const navigation = useNavigate();

  const { clearPopup } = usePopupFalling();

  const moveToDifferentStake = () => {
    navigation(`/stake/${props.projectId}`);
    clearPopup();
  };

  return (
    <Group position="apart" onClick={moveToDifferentStake} style={{ cursor: 'pointer' }}>
      <Group spacing={8}>
        <Avatar src={props.avatar} w={54} h={54} radius={100} />
        <Text className="subtitle_4-bold">{props.name}</Text>
      </Group>
      <Text className="small_2-medium">{props.value}</Text>
    </Group>
  );
};

const OtherStaking = () => {
  const { classes } = useStyleOtherStaking();
  const dispatch = useDispatch();

  const callListCoin = useSelector(selectCallListCoin);
  const listCoins = useSelector(selectListCoins);

  useEffect(() => {
    if (!callListCoin) {
      dispatch(coinActions.requestGetListCoins());
    }
  }, [callListCoin]);

  const handleClick = event => {
    event.stopPropagation();
  };

  return (
    <Stack className={classes.box}>
      {!!listCoins.length &&
        listCoins.map(coinInfo => (
          <Box key={coinInfo.project_id}>
            <CardStake
              projectId={coinInfo.project_id}
              key={coinInfo.project_id}
              avatar={coinInfo.coin_avatar}
              name={coinInfo.coin_name}
              value={`APR ${coinInfo.min_interest_rate ?? 0}-${coinInfo.max_interest_rate ?? 0}%`}
              onClick={e => handleClick(e)}
            />
            <Divider mb={12} c={'var(--light)'} mt={6} />
          </Box>
        ))}
    </Stack>
  );
};

const ListAPR = (props: ListAPRProps) => {
  const { t } = useTranslation();

  const handleSelectAPR = (payload: { id: number; day: number; rateUsdt: number }) => {
    props.setSelectAPR(payload.id);
    props.setRateAPR(payload.rateUsdt);
    props.setTimeAPR(payload.day);
  };

  return (
    <SimpleGrid w={'100%'} cols={2} spacing={20} verticalSpacing={10}>
      {!!props.ListAPR &&
        props.ListAPR.map(APR =>
          APR.id === props.selectAPR ? (
            <MyButton
              key={APR.id}
              w={'100%'}
              width_mobile="100%"
              h={44}
              onClick={() => handleSelectAPR({ id: APR.id, day: APR.day, rateUsdt: APR.rateUsdt })}
            >
              {APR.day / 1000} {t('Stake.day')} - {APR.rateUsdt}%
            </MyButton>
          ) : (
            <MyButton
              key={APR.id}
              onClick={() => handleSelectAPR({ id: APR.id, day: APR.day, rateUsdt: APR.rateUsdt })}
              variant="outline"
              c={variable.neutral.black}
              w={'100%'}
              width_mobile="100%"
              h={44}
            >
              {APR.day / 1000} {t('Stake.day')} - {APR.rateUsdt}%
            </MyButton>
          ),
        )}
    </SimpleGrid>
  );
};

const InformationProject = (props: InformationProjectProps) => {
  const { t } = useTranslation();
  const { classes } = useStyleInformationProject();
  const { triggerPopup } = usePopupFalling();

  return (
    <Group position="apart" px={props.px} mt={props.mt}>
      <Group spacing={6}>
        <Avatar src={props.avatar || ''} radius={100} w={54} h={54} alt="it's me"></Avatar>
        <Text className="subtitle_4-bold">{props.title}</Text>
      </Group>
      <Text onClick={triggerPopup} className={`body_3-regular ${classes.textOther}`}>
        {t('Stake.other')}
      </Text>
    </Group>
  );
};

export const Stake = (props: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { classes } = useStyle();
  const dispatch = useDispatch();

  const calledGetStake = useSelector(selectCalledStakes);
  const listProjectDetail = useSelector(selectListProjectDetail);
  const listStakes = useSelector(selectListStakes);
  const loadingTradingStake = useSelector(selectLoadingTradingStake);
  const responseErrorTradingStake = useSelector(selectResponseErrorTradingStake);

  const { projectId } = useParams();
  const [checked, setChecked] = useState(false);
  const [usdt, setUsdt] = useState<string>('');
  const [coinAfterExchange, SetCoinAfterExchange] = useState<string>('');
  const [opened, { open, close }] = useDisclosure(false);
  const [openNotEnoughUSDTPopup, setOpenNotEnoughUSDTPopup] = useState<boolean>(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState<boolean>(false);
  const [errorRateState, setErrorRateState] = useState<boolean>(false);
  const [callFirst, setCallFirst] = useState<boolean>(false);

  // callback
  const callbackGetListStake = useCallback(getListStakes, []);
  const callbackGetProjectDetail = useCallback(handleGetProjectDetail, []);
  const callbackGetListAPROfStake = useCallback(GetListAPROfStake, []);
  const callbackSpecifyStake = useCallback(handleGetSpecifyStakeOfProject, []);
  const calledFirstProjectDetail = useSelector(selectCalledFirstProjectDetail);

  // list data when used
  const listStakesOfProject = callbackGetListStake(listStakes, projectId ? projectId : '-1');
  const projectDetail = callbackGetProjectDetail(listProjectDetail, Number(projectId));
  const listRateOfStake = callbackGetListAPROfStake(listStakesOfProject);

  const [selectAPR, setSelectAPR] = useState<number>(() => listRateOfStake[0]?.id);
  const [rateAPR, setRateAPR] = useState<number>(() => listRateOfStake[0]?.rateUsdt ?? 0);
  const [timeAPR, setTimeAPR] = useState<number>(() => listRateOfStake[0]?.day ?? -1);

  const specifyStake = callbackSpecifyStake(listStakes, Number(projectId), Number(selectAPR));

  // plus date with date now
  const date = new Date();
  date.setDate(date.getDate() + timeAPR / 1000);

  useEffect(() => {
    if (!callFirst && listRateOfStake[0]?.id) {
      setCallFirst(true);
      setSelectAPR(listRateOfStake[0]?.id);
    }
  }, [listRateOfStake]);

  useEffect(() => {
    if (projectId && !calledFirstProjectDetail.includes(Number(projectId))) {
      dispatch(projectActions.requestGetProjectDetail({ projectId: Number(projectId) }));
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId && !calledGetStake.includes(Number(projectId)))
      dispatch(stakeActions.requestGetAllStakeOfProject({ projectId: Number(projectId) ?? -1 }));
  }, [projectId]);

  useEffect(() => {
    if (responseErrorTradingStake === RESPONSE_SUCCESS_ERROR) {
      dispatch(stakeActions.resetResponseTradingStake());
      setOpenSuccessPopup(true);
      setErrorRateState(false);
      close();
    } else if (responseErrorTradingStake === RESPONSE_ERROR_NOT_ENOUGH_USDT) {
      dispatch(stakeActions.resetResponseTradingStake());
      setOpenNotEnoughUSDTPopup(true);
      setErrorRateState(false);
      close();
    }
  }, [responseErrorTradingStake]);

  const moveToProjectDetail = () => {
    navigation(`/home`);
  };

  const moveToRecharge = () => {
    navigation(`/recharge`);
  };

  function handleCheckInput(e) {
    const newValue = e.target.value.replace(/[^0-9.]/g, '');
    e.target.value = newValue;
  }

  const onChangeUsdt = event => {
    const value = event.target.value;
    setUsdt(value);
    if (projectDetail?.coin_info?.rate_usdt_coin)
      SetCoinAfterExchange(String((Number(value) * projectDetail?.coin_info?.rate_usdt_coin).toFixed(3)));
  };

  const onChangeCoinAfterExchange = event => {
    const value = event.target.value;
    SetCoinAfterExchange(value);
    if (projectDetail?.coin_info?.rate_usdt_coin)
      setUsdt(String((Number(value) / projectDetail?.coin_info?.rate_usdt_coin).toFixed(3)));
  };

  const submitTradingStake = () => {
    if (!projectId || !specifyStake?.id) return;
    if (!selectAPR) return;

    if (isNaN(Number(usdt))) return;

    const payload: TradingStakeRequest = {
      project_id: Number(projectId),
      stake_id: Number(specifyStake?.id),
      auto: checked ? 1 : 0,
      usdt: Number(usdt),
    };
    dispatch(stakeActions.requestTradingStake(payload));
  };

  const handleOpenConfirmPopup = () => {
    if (!specifyStake) return;

    if (isNaN(Number(usdt))) {
      setErrorRateState(true);
      return;
    }

    //check rate coin
    const usdtMax = specifyStake.max_stake;
    const usdtMin = specifyStake.min_stake;
    if (Number(usdt) > usdtMax || Number(usdt) < usdtMin) {
      setErrorRateState(true);
      return;
    }
    setErrorRateState(false);
    open();
  };

  return (
    <>
      <PopupFallingProvider>
        <Frame titlePage={t('Stake.permanent')} pb={40} onMovePage={moveToProjectDetail} pos={'relative'}>
          <InformationProject avatar={projectDetail?.avatar ?? ''} title={projectDetail?.name ?? ''} px={16} mt={10} />
          <Center>
            <Text className="body_5-medium">Stake USDT nhận về USDT và LUDO</Text>
          </Center>
          <Divider mt={10} mb={15}></Divider>

          {listRateOfStake.length !== 0 ? (
            <>
              <Stack spacing={4} px={16} pb={30}>
                <Text className="body_4-bold">{t('Stake.APR')}</Text>
                <ListAPR
                  ListAPR={listRateOfStake}
                  selectAPR={selectAPR}
                  setSelectAPR={setSelectAPR}
                  setTimeAPR={setTimeAPR}
                  setRateAPR={setRateAPR}
                />

                <Text mt={14} className="body_4-bold">
                  {t('Stake.research')}
                </Text>
                <Group
                  spacing={0}
                  radioGroup="8px"
                  noWrap
                  className={classes.researchGroupInput}
                  style={{ border: `1px solid ${errorRateState ? variable.secondary.secondary2 : variable.neutral.grey}` }}
                >
                  <TextInput
                    placeholder={t('Stake.enterMoney')}
                    value={usdt}
                    onChange={event => onChangeUsdt(event)}
                    onInput={e => handleCheckInput(e)}
                    classNames={{ root: classes.groupInputNumber, input: classes.textInput }}
                  />
                  <Center className={classes.buttonExchange}>
                    <Text>USDT</Text>
                  </Center>
                </Group>

                {/* limit error*/}
                {errorRateState && (
                  <Text className="small_3-regular" c={errorRateState ? variable.secondary.secondary2 : variable.neutral.grey}>
                    {t('Stake.requireLargeOneOfNumber')}
                    {'  '} {specifyStake?.min_stake} {'-'} {specifyStake?.max_stake}
                  </Text>
                )}

                <Text className="small_2-medium" c={variable.primary.primary2}>
                  {t('Stake.rateUSDT')} = {projectDetail?.coin_info?.rate_usdt_coin} {projectDetail?.name}
                </Text>
                <Group spacing={0} noWrap className={classes.researchGroupInput} mt={12}>
                  <TextInput
                    value={coinAfterExchange}
                    onChange={event => onChangeCoinAfterExchange(event)}
                    placeholder={'Stake.enterExchange'}
                    onInput={e => handleCheckInput(e)}
                    classNames={{ root: classes.groupInputNumber, input: classes.textInput }}
                  />
                  <Center className={classes.buttonExchange}>
                    <Text>{projectDetail?.coin_info?.coin_name}</Text>
                  </Center>
                </Group>

                <Text mt={16} className="body_4-bold">
                  {t('Stake.profit')}
                </Text>

                <Accumulation label={t('Stake.amount')} value={numberWithCommas(usdt)} mark mt={2} />
                <Accumulation
                  label={t('Stake.afterTerm')}
                  value={GetProfitAfterTerm(Number(coinAfterExchange), rateAPR ?? 0, timeAPR * SECONDS_PER_DAY || 0).toFixed(3)}
                  mark
                  mt={4}
                />
                <Accumulation label={t('Stake.profitTime')} value={ConvertDate.getDDMMYY(date)} mark mt={4} />

                <Group w={'100%'} position={'right'} mb={2} mt={12}>
                  <Group spacing={6}>
                    <Text>{t('Stake.reinvestment')}</Text>
                    <Switch checked={checked} onChange={event => setChecked(event.currentTarget.checked)} />
                  </Group>
                </Group>
              </Stack>

              <Group className={classes.groupButtonStake}>
                <MyButton onClick={handleOpenConfirmPopup} w="100%" width_mobile="100%" h={44}>
                  Stake
                </MyButton>
              </Group>
            </>
          ) : (
            <Center h={'50vh'}>
              <Text>{t('Stake.notFoundStake')}</Text>
            </Center>
          )}
        </Frame>

        <PopupFalling>
          <OtherStaking />
        </PopupFalling>
      </PopupFallingProvider>
      {/* popup check confirm */}
      <Modal opened={opened} onClose={close} centered withCloseButton={false} padding={0} radius={20}>
        <PopupPaymentConfirmation
          nameProjects={projectDetail?.name ?? ''}
          author={projectDetail?.author.name ?? ''}
          RatePerYears={`${timeAPR} ${t('Stake.day')} - ${rateAPR}%/${t('Stake.year')}`}
          staking={Number(coinAfterExchange)}
          intoMoney={String(usdt)}
          reinvestment={checked ? t('Popup.yes') : t('Popup.no')}
          tradingTime={ConvertDate.getDDMMYY(ConvertDate.createNewDate(Date.now() / 1000))}
          loading={loadingTradingStake}
          onConfirmTrading={submitTradingStake}
        />
      </Modal>
      {/* popup not enough usdt */}
      <Modal
        opened={openNotEnoughUSDTPopup}
        onClose={() => setOpenNotEnoughUSDTPopup(false)}
        centered
        withCloseButton={false}
        padding={0}
        radius={20}
      >
        <ConfirmAskPopup
          title={t('Popup.titleConfirmRecharge')}
          cancelText={t('Popup.cancel')}
          successText={t('Popup.recharge')}
          onClose={() => setOpenNotEnoughUSDTPopup(false)}
          onCancel={() => setOpenNotEnoughUSDTPopup(false)}
          onSuccess={moveToRecharge}
        />
      </Modal>
      {/* popup trading success */}
      <Modal opened={openSuccessPopup} onClose={() => setOpenSuccessPopup(false)} centered radius={20}>
        <TransactionSuccess />
      </Modal>
    </>
  );
};

const useStyle = createStyles(theme => ({
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

  groupButtonStake: {
    width: '100%',
    padding: '10px 16px',
    background: variable.neutral.whiteLight,

    '@media (max-width : 576px)': {
      position: 'fixed',
      bottom: 0,
      left: 0,
    },
  },
}));

const useStyleInformationProject = createStyles(theme => ({
  textOther: {
    color: variable.primary.primary2,
    cursor: 'pointer',
  },

  '@media (max-width : 576px)': {
    width: '47px !important',
    height: '48px',
    fontSize: '24px',
  },
}));

const useStyleOtherStaking = createStyles(theme => ({
  box: {
    width: '100%',
    gap: 6,
  },
}));
