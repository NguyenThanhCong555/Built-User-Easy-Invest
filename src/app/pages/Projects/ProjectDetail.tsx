import React from 'react';
import { ActionIcon, Box, Center, createStyles, Group, Image, Stack, Tabs, Text } from '@mantine/core';
import { memo, useCallback, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
// import { ReactComponent as Earth } from 'assets/icons/earth.svg';
// import { ReactComponent as Inside } from 'assets/icons/notification/inside.svg';
// import { ReactComponent as IconArrowRight } from 'assets/icons/arrow/arrow-right.svg';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { projectActions } from 'store/slice/project';
import { selectCalledFirstProjectDetail, selectListProjectDetail } from 'store/slice/project/selector';

import { handleGetProjectDetail } from './utils';

import { Helmet } from 'react-helmet-async';
import { Carousel } from '@mantine/carousel';

import parse from 'html-react-parser';
import { MyButton } from 'app/components/Button/MyButton';
import { NavContainer } from 'app/components/navigation/NavContainer';
import { Frame } from 'app/layouts/Frame';
import { variable } from 'styles/variable';

const listFeature = [
  {
    id: 1,
    title: 'Staking',
    navigate: '/projects/stakes',
  },
  {
    id: 2,
    title: 'Admin.CoinMiningMachine.Coin_Mining_Machine',
    navigate: '/projects/machines',
  },
  {
    id: 3,
    title: 'Admin.Items.Item_details',
    navigate: '/projects/items',
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
  id: number;
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
    <Group className={classes.group} key={props.id} onClick={() => moveToPage(props.navigate, props.projectId)}>
      <Text c={'var(--white)'} className="body-1_bold">
        {t(props.title)}
      </Text>
      {/* <IconArrowRight /> */}
    </Group>
  );
};

const TitleInformation = (props: TitleInfermationProps) => {
  const { classes } = useStyleTitleInfor();

  return (
    <Group className={classes.group} pos={props.pos} top={props.top} left={props.left} right={props.right} bottom={props.bottom}>
      <Image src={props.avatar} classNames={{ root: classes.rootImage, image: classes.avatar }} width={'90px'} height={'90px'} />
      <Stack spacing={0}>
        <Text className="subtitle_4-bold" lh={'26px'}>
          {props.title}
        </Text>
        <Text className="small_5-medium" lh={'16px'}>
          {props.title}
        </Text>
      </Stack>
    </Group>
  );
};

export const ProjectInformation = memo(() => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { t } = useTranslation();

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
        <title>{'Project Detail'}</title>
      </Helmet>
      <Frame titlePage={t('ProjectDetail.title')} onMovePage={moveToPageProjects} pb={40}>
        <Box className={classes.container}>
          <Carousel maw={'100%'} height={227} withControls={false} withIndicators={false} loop>
            {!!projectDetail?.cover_photo.length &&
              projectDetail.cover_photo.map((urlBanner, index) => (
                <Carousel.Slide key={index}>
                  <Image height={'100%'} width={'100%'} src={urlBanner} />
                </Carousel.Slide>
              ))}
          </Carousel>
          <TitleInformation
            avatar={projectDetail?.avatar ?? ''}
            title={projectDetail?.name ?? ''}
            author={projectDetail?.author.name ?? ''}
            pos={'absolute'}
            top={180}
            left={30}
          />
        </Box>

        <Box px={16} mt={70} pb={24} pos={'relative'}>
          <Box className={classes.boxContent}>
            {(language === 'vi-VN' || language === 'vi') && !projectDetail?.intro?.VN && (
              <Center>
                <Text>{t('ProjectDetail.notFound')}</Text>
              </Center>
            )}
            {(language === 'en-US' || language === 'en') && !projectDetail?.intro?.ENG && (
              <Center>
                <Text>{t('ProjectDetail.notFound')}</Text>
              </Center>
            )}
            {parse(
              language === 'vi-VN' || language === 'vi'
                ? projectDetail?.intro?.VN || ''
                : language === 'en-US' || language === 'en'
                ? projectDetail?.intro?.ENG || ''
                : '',
            )}
          </Box>

          <Group className={classes.groupButtonStake}>
            <MyButton onClick={handleFindOutMore} w="100%" width_mobile="100%" h={44}>
              {t('ProjectDetail.btnResearch')}
            </MyButton>
          </Group>
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
