import React from 'react';
import { ActionIcon, Box, Center, createStyles, Divider, Group, Image, Stack, Tabs, Text } from '@mantine/core';
import { memo, useCallback, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
// import { ReactComponent as Earth } from 'assets/icons/earth.svg';
// import { ReactComponent as Inside } from 'assets/icons/notification/inside.svg';
import { ReactComponent as IconArrowRight } from 'assets/icons/arrow/arrow-right.svg';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { projectActions } from 'store/slice/project';
import { selectCalledFirstProjectDetail, selectListProjectDetail } from 'store/slice/project/selector';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Helmet } from 'react-helmet-async';

import { handleGetProjectDetail } from './utils';

import parse from 'html-react-parser';
import { MyButton } from 'app/components/Button/MyButton';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { Frame } from 'app/layouts/Frame';
import { variable } from 'styles/variable';
import { StyledTabs } from 'app/components/tab';
import { images } from 'assets/images';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';

const listFeature = [
  {
    id: 1,
    title: 'ProjectDetail.stakeUsdtTo',
    navigate: '/projects/stakes',
    hasCoinTile: true,
  },
  {
    id: 2,
    title: 'ProjectDetail.stakeCoinTo',
    navigate: '/projects/stakes-coin',
    hasCoinTile: true,
  },
];

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

type ButtonNavigateProps = {
  projectId: string;
  title: string;
  navigate: string;
};

const ButtonNavigate = (props: ButtonNavigateProps) => {
  const { t } = useTranslation();
  const { classes } = useStyleButtonNavigate();
  const navigation = useNavigate();

  const moveToPage = (url, projectId) => {
    navigation(`${url}/${projectId}`);
  };

  return (
    <Group className={classes.group} onClick={() => moveToPage(props.navigate, props.projectId)}>
      <Text c={'var(--white)'} className="body_1-bold">
        {t(props.title)}
      </Text>
      <IconArrowRight />
    </Group>
  );
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

export const SimpleProject = memo(() => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { projectId } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  const projectIdParam = searchParams.get('projectId');
  const targeParam = searchParams.get('target');

  // const language = useSelector(selectLanguage);
  const language = localStorage.getItem('i18nextLng');
  const calledFirstProjectDetail = useSelector(selectCalledFirstProjectDetail);
  const listProjectDetail = useSelector(selectListProjectDetail);

  const getProjectDetail = useCallback(handleGetProjectDetail, []);

  const projectDetail = getProjectDetail(listProjectDetail, Number(projectId));
  const { classes } = useStyleProjectDetail({ url: '' });

  console.log(language);

  useEffect(() => {
    if (projectId && !calledFirstProjectDetail.includes(Number(projectId))) {
      dispatch(projectActions.requestGetProjectDetail({ projectId: Number(projectId) }));
    }
  }, []);

  const moveToPageProjects = () => {
    navigation('/');
  };

  const handleFindOutMore = () => {
    if (projectDetail) window.open(projectDetail?.website);
  };

  return (
    <>
      <Helmet>
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
        <title>Easy Invest</title>
      </Helmet>
      <Frame titlePage={projectDetail?.name} onMovePage={moveToPageProjects} pb={40}>
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
          <StyledTabs defaultValue={targeParam ?? 'invest'} classNames={{ tab: classes.tab, panel: classes.panel }}>
            <Tabs.List position={'center'} grow>
              <Tabs.Tab value="information">{t('ProjectDetail.tabInformation')}</Tabs.Tab>
              <Tabs.Tab value="invest">{t('ProjectDetail.tabInvest')}</Tabs.Tab>
            </Tabs.List>

            {/* invest */}
            <Tabs.Panel value="invest" pt="xs">
              <Divider mb={24} />
              <CardInfo title={t('ProjectDetail.coinName')} value={projectDetail?.coin_info?.coin_name ?? 'Coin'} mb={6} />
              <CardInfo
                title={t('ProjectDetail.coinRate')}
                value={`1 USDT = ${numberWithCommas(projectDetail?.coin_info?.rate_usdt_coin?.toFixed(3) ?? 0)} ${
                  projectDetail?.coin_info?.coin_name ?? 'Coin'
                }`}
              />

              {/* choose */}
              <Stack spacing={8} mt={18}>
                <ButtonNavigate
                  projectId={projectId || projectIdParam || ''}
                  title={`${t('ProjectDetail.stakeUsdtTo')} ${projectDetail?.coin_info.coin_name ?? 'Coin'} `}
                  navigate={'/projects/stakes'}
                />
                <ButtonNavigate
                  projectId={projectId || projectIdParam || ''}
                  title={`Staking ${projectDetail?.coin_info.coin_name ?? 'Coin'} ${t('ProjectDetail.stakeCoinTo')} ${
                    projectDetail?.coin_info.coin_name ?? 'Coin'
                  } `}
                  navigate={'/projects/stakes-coin'}
                />
              </Stack>
            </Tabs.Panel>

            {/* information */}
            <Tabs.Panel value="information" pt="xs">
              <Divider mb={24} />
              <Box className={classes.boxContent}>
                {parse(
                  language === 'vi-VN' || language === 'vi'
                    ? projectDetail?.intro?.VN || ''
                    : language === 'en-US' || language === 'en'
                    ? projectDetail?.intro?.ENG || ''
                    : '',
                )}
              </Box>

              {projectDetail?.website && (
                <MyButton onClick={handleFindOutMore} w="100%" width_mobile="100%" h={44} mt={44}>
                  {t('ProjectDetail.btnResearch')}
                </MyButton>
              )}
            </Tabs.Panel>
          </StyledTabs>
        </Box>
      </Frame>
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

  showUSDT: {
    justifyContent: 'space-between',
    padding: '8px 12px',
    border: `1px solid ${variable.neutral.greyLight}`,
    boxShadow: `0px 2px 4px rgba(12, 1, 1, 0.15)`,
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '24px',
  },

  tab: {
    width: '50%',
    height: '40px',
    fontWeight: 700,
    fontFamily: 'Sarabun',
    color: variable.primary.primary2,
    justifyContent: 'center',
  },
  panel: {
    marginTop: '24px',
  },

  boxContent: {
    'ul, ol': {
      paddingLeft: 38,
    },
    p: {
      marginBottom: 7,
    },

    hr: {
      marginTop: 16,
      marginBottom: 12,
      borderTop: '1px dashed #868e96',
    },

    'h1,h2,h3,h4': {
      marginBottom: 12,
    },

    blockquote: {
      fontSize: '18px',
      margin: '16px 0',
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
      padding: '16px 20px',
      color: '#000000',
      borderLeft: '6px solid #dee2e6',
    },

    code: {
      padding: '1px 5px',
      borderRadius: '4px',
      color: '#000000',
      backgroundColor: '#f8f9fa',
      fontSize: '12px',
      border: '1px solid #dee2e6',
    },
  },
  groupButtonStake: {
    width: '100%',
    padding: '10px 16px',
    background: variable.neutral.whiteLight,
    marginTop: '48px',

    '@media (max-width : 576px)': {
      position: 'fixed',
      bottom: 0,
      left: 0,
    },
  },
}));

const useStyleButtonNavigate = createStyles(theme => ({
  group: {
    justifyContent: 'space-between',
    padding: '11px',
    background: variable.primary.primary1,
    borderRadius: '8px',
    cursor: 'pointer',
  },
}));
