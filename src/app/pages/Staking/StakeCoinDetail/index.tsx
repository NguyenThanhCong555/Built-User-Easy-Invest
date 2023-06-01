import { Button, createStyles, Flex, Group, Modal, Text } from '@mantine/core';
import { MyButton } from 'app/components/Button/MyButton';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSimpleBoughtStakeInfor } from '../utils';
import React from 'react';
import { stakeActions } from 'store/slice/stake';
import {
  selectBoughtStakesCoin,
  selectCalledBoughtStakesCoin,
  selectLoadingWithdrawStakeCoin,
  selectResponseErrorWithdrawStakeCoin,
} from 'store/slice/stake/selector';
import { Frame } from 'app/layouts/Frame';
import ConvertDate from 'helpers/formatDate';
import { useTranslation } from 'react-i18next';
import { CLOSE, MILLISECONDS, OPEN, RESPONSE_SUCCESS_ERROR, SECONDS_PER_DAY } from 'constants/common';
import { TransactionSuccess } from 'app/components/Popup/TransactionSuccess';
import { ContentOfCardStaking } from './ContentOfCardStake';
import { PopupWithdrawConfirmationCoin } from '../components/Popup';
import { AccumulationCardV2 } from '../components/AccumulationCard';
import { ContentOfCardStakingSuccess } from './ContentOfCardStakeSuccess';
import { selectCalledFirstProjectDetail, selectListProjectDetail } from 'store/slice/project/selector';
import { projectActions } from 'store/slice/project';
import { handleGetProjectDetail } from 'app/pages/Projects/utils';

interface PropsProject {
  mobiles?: any;
}

export const StakedCoinDetail = () => {
  const mobile: any = useMediaQuery('(max-width: 768px)');
  const navigation = useNavigate();
  const { classes } = createNewStyle({ mobiles: mobile });
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { stakingId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState<boolean>(false);
  const [moveToStake, setMoveToStake] = useState<boolean>(false);
  const [showErrorNotProject, setShowErrorNotProject] = useState<boolean>(false);

  const listBoughtStakes = useSelector(selectBoughtStakesCoin);
  const ListCalledBoughtStakes = useSelector(selectCalledBoughtStakesCoin);
  const responseErrorWithdrawStake = useSelector(selectResponseErrorWithdrawStakeCoin);
  const loadingWithdrawStake = useSelector(selectLoadingWithdrawStakeCoin);
  const calledFirstProjectDetail = useSelector(selectCalledFirstProjectDetail);
  const listProjectDetail = useSelector(selectListProjectDetail);

  const callbackGetProjectDetail = useCallback(handleGetProjectDetail, []);
  const callbackGetBoughtStakeInfo = useCallback(getSimpleBoughtStakeInfor, []);

  const stakingInfo = useMemo(
    () => callbackGetBoughtStakeInfo(listBoughtStakes, Number(stakingId)),
    [stakingId, listBoughtStakes],
  );
  const projectDetail = callbackGetProjectDetail(listProjectDetail, Number(stakingInfo?.project_id));

  useLayoutEffect(() => {
    if (stakingId && !ListCalledBoughtStakes.includes(Number(stakingId))) {
      dispatch(stakeActions.requestSimpleBoughtStakeCoin({ stakingId: Number(stakingId) }));
    }
  }, [stakingId]);

  useEffect(() => {
    if (responseErrorWithdrawStake === RESPONSE_SUCCESS_ERROR) {
      dispatch(stakeActions.resetResponseWithdrawStakeCoin());
      setOpenSuccessPopup(true);
      close();
    }
  }, [responseErrorWithdrawStake]);

  useEffect(() => {
    if (!moveToStake) return;

    if (projectDetail?.state === CLOSE) {
      setShowErrorNotProject(true);
    } else {
      navigation(`/projects/stakes-coin/${stakingInfo?.project_id}`);
    }
  }, [listProjectDetail, moveToStake]);

  const moveToStakeManagement = () => {
    navigation('/stake-coin-management');
  };

  const handleOpenConfirmPopup = () => {
    open();
  };

  const handleWithdrawStake = () => {
    if (stakingInfo?.id === undefined) return;

    dispatch(stakeActions.requestWithdrawStakeCoin({ stakingId: stakingInfo.id }));
  };

  const handleMoveToStakePage = () => {
    if (stakingInfo?.project_id && !calledFirstProjectDetail.includes(Number(stakingInfo?.project_id))) {
      dispatch(projectActions.requestGetProjectDetail({ projectId: Number(stakingInfo?.project_id) }));
    }

    setMoveToStake(true);
  };

  const handleClosePopupError = () => {
    setShowErrorNotProject(false);
    setMoveToStake(false);
  };

  return (
    <>
      <Frame onMovePage={moveToStakeManagement} titlePage={t('StakedDetail.titlePage')}>
        <Flex className={classes.infoProject}>
          <Flex className="infoItemsProject">
            <AccumulationCardV2
              coinName={stakingInfo?.coin_info.coin_name ?? ''}
              stakeRate={`${((stakingInfo?.time_end ?? 0) - (stakingInfo?.time_start ?? 0)) / SECONDS_PER_DAY / MILLISECONDS} ${t(
                'StakingClosed.day',
              )} -
            ${stakingInfo?.interest_rate}%`}
            >
              {stakingInfo?.status === OPEN && <ContentOfCardStaking {...stakingInfo} onClickButton={handleOpenConfirmPopup} />}
              {stakingInfo?.status === CLOSE && (
                <ContentOfCardStakingSuccess {...stakingInfo} onClickButton={handleOpenConfirmPopup} />
              )}
            </AccumulationCardV2>
          </Flex>

          {stakingInfo?.status === OPEN ? (
            <Group w={'100%'} noWrap px={16} spacing={8}>
              <Button
                h={44}
                w={'100%'}
                maw={'calc(100% - 4px)'}
                c={'var(--primary-1)'}
                variant="outline"
                style={{ border: '1px solid var(--primary-1)' }}
                className="body_4-bold"
                radius={8}
                onClick={handleOpenConfirmPopup}
              >
                <Text>{t('StakedDetail.completed')}</Text>
              </Button>
              <MyButton
                onClick={handleMoveToStakePage}
                mb={24}
                h={44}
                w={'100%'}
                maw={'calc(100% - 4px)'}
                className="infoItemsProjectbut"
              >
                <Text>Staking</Text>
              </MyButton>
            </Group>
          ) : (
            <MyButton onClick={handleMoveToStakePage} mb={24} h={44} className="infoItemsProjectbut">
              <Text>Staking</Text>
            </MyButton>
          )}
        </Flex>
      </Frame>

      {/* popup check confirm */}
      <Modal opened={opened} onClose={close} centered withCloseButton={false} padding={0} radius={20}>
        <PopupWithdrawConfirmationCoin
          nameProjects={stakingInfo?.project_name ?? ''}
          maturity={`${((stakingInfo?.time_end ?? 0) - (stakingInfo?.time_start ?? 0)) / SECONDS_PER_DAY / MILLISECONDS} ${t(
            'StakedDetail.days',
          )}`}
          interestRate={`${stakingInfo?.interest_rate}%`}
          coin={stakingInfo?.coin ?? 0}
          profit={stakingInfo?.profit ?? ''}
          coinName={stakingInfo?.coin_info?.coin_name ?? ''}
          tradingTime={ConvertDate.getDDMMYY(new Date(stakingInfo?.time_start ?? 0))}
          loading={loadingWithdrawStake}
          onConfirmTrading={handleWithdrawStake}
          onClose={close}
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

      {/* popup error : not axist project */}
      <Modal opened={showErrorNotProject} onClose={handleClosePopupError} centered radius={20}>
        <Text>Dự án đã tạm dừng hoạt động .</Text>
      </Modal>
    </>
  );
};

const createNewStyle = createStyles((theme, params: PropsProject) => ({
  infoStacking: {
    maxWidth: '570px',
    width: '100%',
    height: '197px',
    borderRadius: '14px',
    boxShadow: '0px 2px 4px #00000026',
    border: `1px solid  rgba(0, 0, 0, 0.15)`,
  },
  boxProject: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    width: '100%',
    height: '100%',
    maxWidth: '636px',
    margin: params.mobiles ? '0 auto' : '10px auto',
    borderRadius: params.mobiles ? '0' : '20px',
    border: params.mobiles ? 'none' : '1px solid rgba(214, 214, 214, 1)',
    maxHeight: '100%',
    boxShadow: params.mobiles ? 'none' : '0px 4px 8px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    transitions: 'all 1s linear',
    objectFit: 'cover',
  },
  infoProject: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    '.infoItemsProject': {
      width: '90%',
      transition: 'all .3s ease',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: '10px',
    },
    '.infoItemsProjectbut': {
      maxWidth: params.mobiles ? '343px' : '570px',
      width: '100%',
      borderRadius: '10px',
      marginTop: '26px',
    },
  },
}));

export default StakedCoinDetail;
