import * as React from 'react';
import { Avatar, Box, Card, Center, Flex, Stack, Text, createStyles } from '@mantine/core';

import { useTranslation } from 'react-i18next';

import { media } from 'styles/media';
import { images } from 'assets/images';
import { ReactComponent as Arrow } from 'assets/icons/loginPage/chevron-right-double.svg';
import { Helmet } from 'react-helmet-async';
import { InstructModal } from './InstructModal';

interface Props {
  children?: JSX.Element | JSX.Element[];
}
export const LoginLayout = ({ children }: Props) => {
  const { t } = useTranslation();
  const { cx, classes } = makeStyles({ images });
  const [opened, setOpened] = React.useState<boolean>(false);

  const showinstruct = () => {
    console.log('hideinstruct');
  };
  return (
    <Center className={classes.container}>
      <Helmet>
        <title>Easy Invest</title>
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Card className={classes.wrapper}>
        <Stack className={classes.content}>
          <div className={classes.logoWrap}>
            <Avatar src={images.logo} className={classes.logo} />
          </div>
          {children}
          {/* open cinstruct */}
          <Flex onClick={() => showinstruct()} className={classes.tutorial}>
            {/* <Avatar src={images.hard} className={classes.image} />
            <Box>
              <Text className="small_3-regular">{t('Login.Having trouble logging in?')}</Text>
              <Flex>
                <Text className={cx('body_4-bold', classes.navigate)}>{t('Login.See the instructions')}</Text>
                <Arrow />
              </Flex>
            </Box> */}
            <InstructModal opened={opened} setOpened={setOpened} />
          </Flex>
        </Stack>
      </Card>
    </Center>
  );
};

const makeStyles = createStyles((theme, { images }: any) => ({
  container: {
    width: '100vw',
    height: '100vh',
    padding: '84px 16px 16px',
    [media.x_large()]: {
      padding: 16,
    },
    [media.small()]: {
      padding: 0,
    },
  },
  wrapper: {
    minHeight: 660,
    width: '100%',
    maxWidth: 570,
    margin: 'auto',
    borderRadius: 20,
    border: '1px solid var(--grey-light)',
    backgroundImage: `url(${images.backgroundWeb})`,
    backgroundSize: 'cover',
    [media.small()]: {
      height: '100vh',
      border: 'none',
      borderRadius: 0,
      backgroundImage: `url(${images.backgroundMobile})`,
    },
  },
  content: {
    gap: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    position: 'relative',
  },
  logoWrap: {
    width: '100%',
    height: 250,
  },
  logo: {
    width: 180,
    height: 180,
    margin: '0px auto',
  },
  // this is box tutorial
  tutorial: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '122px',
    cursor: 'pointer',
  },
  image: {
    width: 52,
    height: 52,
  },
  navigate: {
    color: 'var(--primary-1)',
  },
}));
