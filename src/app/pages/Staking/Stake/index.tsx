import { Center, Divider, FocusTrap, Group, Modal, Stack, Switch, Text, TextInput, createStyles } from '@mantine/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';

import { MyButton } from 'app/components/Button/MyButton';
import { Frame } from 'app/layouts/Frame';
import { variable } from 'styles/variable';
import { Accumulation } from '../components/Accumulation';
import { PopupFallingProvider } from '../components/PopupFalling/PopupContext';
import PopupFalling from '../components/PopupFalling/Popup';
import { RESPONSE_SUCCESS_ERROR, SECONDS_PER_DAY } from 'constants/common';
import {
  selectCalledStakes,
  selectListStakes,
  selectLoadingGetStakes,
  selectLoadingTradingStake,
  selectResponseErrorTradingStake,
} from 'store/slice/stake/selector';
import {
  selectCalledFirstProjectDetail,
  selectListProjectDetail,
  selectLoadingProjectDetail,
} from 'store/slice/project/selector';
import { stakeActions } from 'store/slice/stake';
import {
  GetListAPROfStake,
  GetProfitAfterTerm,
  getListStakes,
  handleGetProjectDetail,
  handleGetSpecifyStakeOfProject,
} from '../utils';
import ConvertDate from 'helpers/formatDate';
import { ConfirmAskPopup } from 'app/components/Popup/ConfirmAskPoppup';
import { TradingStakeRequest } from 'store/slice/stake/request';
import { TransactionSuccess } from 'app/components/Popup/TransactionSuccess';
import { PopupPaymentConfirmation } from '../components/Popup';
import { RESPONSE_ERROR_NOT_ENOUGH_USDT } from 'store/slice/stake/response';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { projectActions } from 'store/slice/project';
import Loading from 'app/components/Loading/Loading';
import { InformationProject } from './InformationProject';
import { ListAPR } from './ListAPR';
import { OtherCoin } from './OtherCoin';
import { ReactComponent as IconAlert } from 'assets/icons/alert-circle.svg';

type Props = {};

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
  const loadingGetStakes = useSelector(selectLoadingGetStakes);
  const loadingProjectDetail = useSelector(selectLoadingProjectDetail);

  const { projectId } = useParams();
  const [checked, setChecked] = useState(true);
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
  const listRateOfStake = useMemo(() => callbackGetListAPROfStake(listStakesOfProject), [projectId, listStakes]);

  const [selectAPR, setSelectAPR] = useState<number>(() => listRateOfStake[0]?.id);
  const [rateAPR, setRateAPR] = useState<number>(() => listRateOfStake[0]?.rateUsdt);
  const [timeAPR, setTimeAPR] = useState<number>(() => listRateOfStake[0]?.day);

  const specifyStake = callbackSpecifyStake(listStakes, Number(projectId), Number(selectAPR));
  const [active, { toggle }] = useDisclosure(false);

  // plus date with date now
  const date = new Date();
  date.setDate(date.getDate() + timeAPR / 1000);

  useEffect(() => {
    if (listRateOfStake[0]?.id) {
      setCallFirst(true);
      setSelectAPR(listRateOfStake[0]?.id);
      setRateAPR(listRateOfStake[0]?.rateUsdt);
      setTimeAPR(listRateOfStake[0]?.day);
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
    navigation(`/projects/${projectId}`);
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
    if (value.length > 23) return;

    setUsdt(value);
    if (projectDetail?.coin_info?.rate_usdt_coin)
      SetCoinAfterExchange(String((Number(value) * (projectDetail?.coin_info?.rate_usdt_coin ?? 0)).toFixed(3)));
  };

  const handleBlueInputUsdt = () => {
    if (!specifyStake) return;

    //check rate coin
    const usdtMax = specifyStake.max_stake;
    const usdtMin = specifyStake.min_stake;
    if (Number(usdt) > usdtMax || Number(usdt) < usdtMin) {
      setErrorRateState(true);
    } else setErrorRateState(false);
  };

  const onChangeCoinAfterExchange = event => {
    const value = event.target.value;
    // if (value.length > 23) return;

    SetCoinAfterExchange(value);
    if (projectDetail?.coin_info?.rate_usdt_coin)
      setUsdt(String((Number(value) / (projectDetail?.coin_info?.rate_usdt_coin ?? 0)).toFixed(3)));
  };

  const submitTradingStake = () => {
    if (!projectId || !specifyStake?.id) return;
    if (!selectAPR) return;

    if (isNaN(Number(usdt))) return;

    const payload: TradingStakeRequest = {
      project_id: Number(projectId),
      stake_id: Number(specifyStake?.id),
      auto: checked ? 0 : 1,
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

    toggle();
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

  if (loadingGetStakes || loadingProjectDetail) return <Loading visible={true} />;
  const handleClick = () => {
    handleOpenConfirmPopup();
  };

  function handleInstruction() {
    navigation('/instruction/staking-usdt');
  }

  return (
    <>
      <PopupFallingProvider>
        <Frame
          titlePage={'APR'}
          pb={40}
          onMovePage={moveToProjectDetail}
          pos={'relative'}
          rightSection={<IconAlert onClick={handleInstruction} />}
        >
          <InformationProject
            avatar={projectDetail?.coin_info?.coin_avatar ?? ''}
            title={projectDetail?.coin_info?.coin_name ?? ''}
            px={16}
            mt={10}
          />
          <Center>
            <Text className="body_4-bold" color="var(--primary-2)">{`${t('Stake.welfare')} ${
              projectDetail?.coin_info?.coin_name ?? 'Coin'
            }`}</Text>
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
                  setCallFirst={setCallFirst}
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
                  <FocusTrap active={active}>
                    <TextInput
                      placeholder={t('Stake.enterMoney')}
                      value={usdt}
                      data-autofocus
                      onChange={event => onChangeUsdt(event)}
                      onBlur={handleBlueInputUsdt}
                      onInput={e => handleCheckInput(e)}
                      classNames={{ root: classes.groupInputNumber, input: classes.textInput }}
                    />
                  </FocusTrap>

                  <Center className={classes.buttonExchange}>
                    <Text>USDT</Text>
                  </Center>
                </Group>

                {/* limit error*/}
                {errorRateState && (
                  <Text className="small_3-regular" c={errorRateState ? variable.secondary.secondary2 : variable.neutral.grey}>
                    {t('Stake.requireLargeOneOfNumber')}
                    {'  '} {numberWithCommas(Number(specifyStake?.min_stake ?? 0).toFixed(3))} {'-'}{' '}
                    {numberWithCommas(Number(specifyStake?.max_stake ?? 0).toFixed(3))}
                  </Text>
                )}

                <Text className="small_2-medium" c={variable.primary.primary2}>
                  {t('Stake.rateUSDT')} = {numberWithCommas((projectDetail?.coin_info?.rate_usdt_coin ?? 0).toFixed(3))}{' '}
                  {projectDetail?.coin_info?.coin_name}
                </Text>
                <Group spacing={0} noWrap className={classes.researchGroupInput} mt={12}>
                  <TextInput
                    value={coinAfterExchange}
                    onChange={event => onChangeCoinAfterExchange(event)}
                    onBlur={handleBlueInputUsdt}
                    placeholder={t('Stake.enterExchange')}
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
                  label={`${t('Stake.amountCoin')} ${projectDetail?.coin_info.coin_name ?? 'Coin'} ${t('Stake.afterTermCoin')}`}
                  value={numberWithCommas(
                    GetProfitAfterTerm(Number(coinAfterExchange), rateAPR ?? 0, timeAPR * SECONDS_PER_DAY || 0).toFixed(3),
                  )}
                  mark
                  mt={4}
                />
                <Accumulation label={t('Stake.profitTime')} value={ConvertDate.getDDMMYY(date)} mark mt={4} />

                <Group w={'100%'} position={'right'} mb={2} mt={12}>
                  <Group spacing={6}>
                    <Text>{t('Stake.reinvestment')}</Text>
                    <Switch
                      checked={checked}
                      onChange={event => setChecked(event.currentTarget.checked)}
                      classNames={{ track: classes.switch }}
                    />
                  </Group>
                </Group>
              </Stack>

              <Group className={classes.groupButtonStake}>
                <MyButton onClick={handleClick} w="100%" width_mobile="100%" h={44}>
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
          <OtherCoin setUsdt={setUsdt} SetCoinAfterExchange={SetCoinAfterExchange} />
        </PopupFalling>
      </PopupFallingProvider>
      {/* popup check confirm */}
      <Modal opened={opened} onClose={close} centered withCloseButton={false} padding={0} radius={20}>
        <PopupPaymentConfirmation
          nameProjects={projectDetail?.name ?? ''}
          author={projectDetail?.author.name ?? ''}
          RatePerYears={`${timeAPR / 1000} ${t('Stake.day')} - ${rateAPR}%/${t('Stake.year')}`}
          timeAPR={`${timeAPR / 1000} ${t('Stake.day')}`}
          APR={`${rateAPR}%`}
          coinName={projectDetail?.coin_info?.coin_name ?? ''}
          staking={Number(coinAfterExchange)}
          intoMoney={String(usdt)}
          reinvestment={checked ? t('Popup.yes') : t('Popup.no')}
          tradingTime={ConvertDate.getDDMMYY(ConvertDate.createNewDate(Date.now() / 1000))}
          loading={loadingTradingStake}
          onConfirmTrading={submitTradingStake}
          onClose={close}
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
      <Modal
        opened={openSuccessPopup}
        onClose={() => setOpenSuccessPopup(false)}
        centered
        radius={20}
        closeButtonProps={{
          display: 'none',
        }}
      >
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

    '@media (max-width : 576px)': {
      position: 'fixed',
      bottom: 0,
      left: 0,
      background: variable.neutral.whiteLight,
    },
  },

  switch: {
    cursor: 'pointer',
  },
}));
