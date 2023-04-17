import { Box, Button, Center, createStyles, Flex, Modal, Stack, Text } from '@mantine/core';
import { MyButton } from 'app/components/Button/MyButton';
import { useMediaQuery } from '@mantine/hooks';
// import HeaderDetails from 'app/components/HeaderDetails/HeaderDetails';
// import { AccumulationCard } from 'app/pages/Project/components/AccumulationCard';
import { useNavigate, useParams } from 'react-router-dom';
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useAssetSlice } from 'store/app/AssetManagement';
// import { selectAssetStakeItem, selectAssetWithdrawResponse } from 'store/app/AssetManagement/selector';
// import { formatCurrency } from 'utils/formatCurrency';
import IconUsd from 'assets/icons/coin/IconUsd';
import { convertTime, getSimpleBoughtStakeInfor } from './utils';
import { ReactComponent as IconSuccess } from 'assets/icons/notification/success.svg';
import React from 'react';
import { Accumulation } from './components/Accumulation';
import { AccumulationCard } from './components/AccumulationCard';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { stakeActions } from 'store/slice/stake';
import { selectBoughtStakes, selectCalledBoughtStakes } from 'store/slice/stake/selector';
import { Frame } from 'app/layouts/Frame';
import ConvertDate from 'helpers/formatDate';

interface PropsProject {
  mobiles?: any;
}

export const StakingClosed = () => {
  const mobile: any = useMediaQuery('(max-width: 768px)');
  const navigation = useNavigate();
  const { classes } = createNewStyle({ mobiles: mobile });
  const dispatch = useDispatch();

  const { stakingId } = useParams();
  const [openModal, setOpenModal] = useState(false);

  const ListCalledBoughtStakes = useSelector(selectCalledBoughtStakes);
  const listBoughtStakes = useSelector(selectBoughtStakes);

  const callbackGetBoughtStakeInfo = useCallback(getSimpleBoughtStakeInfor, []);
  const stakingInfo = useMemo(() => callbackGetBoughtStakeInfo(listBoughtStakes, Number(stakingId)), [stakingId]);

  console.log(stakingInfo);

  useLayoutEffect(() => {
    if (stakingId && !ListCalledBoughtStakes.includes(Number(stakingId))) {
      dispatch(stakeActions.requestSimpleBoughtStake({ stakingId: Number(stakingId) }));
    }
  }, [stakingId]);

  const moveToStakemanagement = () => {
    navigation('/stake-management');
  };

  return (
    <Frame onMovePage={moveToStakemanagement} titlePage={stakingInfo?.name}>
      <Center mt={12}>
        <Text className="body_2-medium">Tích lũy 1 tháng - {stakingInfo?.interest_rate} %/năm</Text>
      </Center>
      <Flex className={classes.infoProject}>
        <Flex className="infoItemsProject">
          <AccumulationCard title={`${numberWithCommas(stakingInfo?.usdt)} USDT`}>
            <Box px={12}>
              {stakingInfo?.status === 0 && (
                <>
                  <Accumulation
                    mark
                    label={'Lợi nhuận:'}
                    value={numberWithCommas(stakingInfo?.coin)}
                    unitValue={stakingInfo?.name}
                    my={10}
                  />
                  <Accumulation
                    mark
                    label={'Ngày bắt đầu:'}
                    value={ConvertDate.getDDMMYY(new Date(stakingInfo?.time_start))}
                    my={10}
                  />
                  <Accumulation mark label={'Rút trước kỳ hạn:'} value={stakingInfo?.interest_rate_before + '% /năm'} my={10} />
                  <Accumulation mark label={'Tái đầu tư:'} value={stakingInfo?.auto === 0 ? 'Không' : 'Có'} my={10} />
                  {/* <Center mb={8}>
                    <Button onClick={() => setOpenModal(true)} variant="outline" className={`body_4-bold ${classes.button}`}>
                      Rút staking
                    </Button>
                  </Center> */}
                </>
              )}
              {stakingInfo?.status === 1 && (
                <>
                  <Accumulation
                    mark
                    label={'Lợi nhuận:'}
                    value={numberWithCommas(stakingInfo?.coin)}
                    unitValue={stakingInfo?.name}
                    my={10}
                  />
                  <Accumulation
                    mark
                    label={'Ngày bắt đầu:'}
                    value={ConvertDate.getDDMMYY(new Date(stakingInfo?.time_start))}
                    my={10}
                  />
                  <Accumulation mark label={'Rút trước kỳ hạn:'} value={stakingInfo?.interest_rate_before + '% /năm'} my={10} />
                  <Accumulation mark label={'Tái đầu tư:'} value={stakingInfo?.auto === 0 ? 'Không' : 'Có'} my={10} />
                </>
              )}
            </Box>
          </AccumulationCard>
        </Flex>

        <MyButton onClick={() => navigation(`/stake/${stakingInfo?.project_id}`)} mb={24} h={44} className="infoItemsProjectbut">
          <Text>Staking</Text>
        </MyButton>
      </Flex>
    </Frame>
  );
};

const ModalWhiteDraw = memo(({ openModal, setOpenModal, data }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes } = useStyleModalWhiteDraw();

  const [isSuccess, setIsSuccess] = useState(false);
  const handleWhiteDrawStake = () => {
    // if (!data?.id) return;
    // dispatch(requestWithdrawStake(data?.id));
  };

  // useEffect(() => {
  //   if (error === 0) {
  //     setIsSuccess(true);
  //     setTimeout(() => {
  //       setOpenModal(false);
  //       setTimeout(() => {
  //         navigate(-1);
  //         setIsSuccess(false);
  //       }, 200);
  //     }, 1000);
  //   }
  // }, [error, loading]);

  useEffect(() => {
    return () => {
      setIsSuccess(false);
      // dispatch(resetResponseWithdrawStake());
    };
  }, []);

  return (
    <Modal
      classNames={{ root: classes.modalRoot }}
      // sx={{
      //   form: {
      //     width: '100%',
      //   },
      // }}
      centered={true}
      opened={openModal}
      onClose={() => {
        setOpenModal(false);
        setIsSuccess(false);
      }}
      withCloseButton={false}
    >
      {!isSuccess && (
        <>
          <Flex bg={'var(--primary2)'} c="white" direction="column" align={'center'} justify="center" w={'100%'} py={8}>
            <Text fz={24} fw={700}>
              Rút staking
            </Text>
            <Text fz={16}>(Trước kỳ hạn)</Text>
          </Flex>
          <Box
            sx={{
              backgroundColor: 'white',
              padding: '20px 12px 24px',
            }}
          >
            <Flex fz={16} fw={700} w={'100%'} direction={'column'} gap={10}>
              <Flex justify={'space-between'} align="center">
                <Text>Dự án:</Text>
                <Text c={'var(--primary2)'}>Luko King (để sau)</Text>
              </Flex>
              <Flex justify={'space-between'} align="center">
                <Text>Kỳ hạn:</Text>
                <Text c={'var(--primary2)'}>1 tháng (để sau)</Text>
              </Flex>
              <Flex justify={'space-between'} align="center">
                <Text>Lãi suất:</Text>
                <Text c={'var(--primary2)'}>{data?.interest_rate_before + '% /năm'}</Text>
              </Flex>
              <Flex justify={'space-between'} align="center">
                <Text>Staking:</Text>
                <Text c={'var(--primary2)'}>
                  <Flex align={'center'} gap={6}>
                    {numberWithCommas(data?.coin)}
                    <IconUsd></IconUsd>
                  </Flex>
                </Text>
              </Flex>
              <Flex justify={'space-between'} align="center">
                <Text>Lợi nhuận:</Text>
                <Text c={'var(--primary2)'}>
                  <Flex align={'center'} gap={6}>
                    {numberWithCommas(data?.coin)} (để sau)<IconUsd></IconUsd>
                  </Flex>
                </Text>
              </Flex>
              <Flex justify={'space-between'} align="center">
                <Text>Ngày bắt đầu</Text>
                <Text c={'var(--primary2)'}>{convertTime(data?.time_start)}</Text>
              </Flex>
              <Flex justify={'space-between'} align="center">
                <Text>Thời gian giao dịch</Text>
                <Text c={'var(--primary2)'}>{convertTime(Date.now() / 1000)}</Text>
              </Flex>
            </Flex>
            <Button
              // loading={loading}
              // disabled={loading}
              onClick={handleWhiteDrawStake}
              fz={16}
              fw={700}
              mt={24}
              h={44}
              c={'white'}
              w={'100%'}
              radius={8}
              bg={'var(--primary1)'}
            >
              Xác nhận
            </Button>
          </Box>
        </>
      )}

      {isSuccess && (
        <Stack py={30} bg={'white'} spacing={24} align={'center'}>
          <IconSuccess />
          <Text className="body-3_regular">Rút Stake thành công</Text>
        </Stack>
      )}
    </Modal>
  );
});

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

  button: {
    borderRadius: '8px',
    color: 'var(--primary-1)',
    width: '143px',
    height: '36px',
    border: '1px solid var(--primary-1)',
  },
}));

const useStyleModalWhiteDraw = createStyles(theme => ({
  modalRoot: {
    padding: 0,
    borderRadius: 14,
    width: '100%',
    maxWidth: '440px',
    margin: 'auto',
    overflow: 'hidden',
    backgroundColor: 'unset',
  },
}));

export default StakingClosed;
