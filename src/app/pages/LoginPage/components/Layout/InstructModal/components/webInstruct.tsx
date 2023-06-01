import React, { useState } from 'react';
import { Center, Flex, Image, Stepper, Text, createStyles } from '@mantine/core';
import { useCounter, useMediaQuery } from '@mantine/hooks';
import iconNext from 'assets/icons/arrow/circleNext.svg';
import iconPrev from 'assets/icons/arrow/circlePrev.svg';
import { images } from 'assets/images';
import { useTranslation } from 'react-i18next';
import { variable } from 'styles/variable';
import { MyButton } from 'app/components/Button/MyButton';

interface styleprops {
  mobile: any;
  changeSlides: any;
}
interface styleProps {
  mobiles: any;
  activeProps: any;
}
export const Webinstruct = props => {
  const [count, handlers] = useCounter(0, { min: 1, max: 7 });

  const mobile = useMediaQuery('(max-width:768px)');

  const { t } = useTranslation();

  const [active, setActive] = useState(0);

  const nextStep = () => setActive(current => (current < 7 ? current + 1 : current));
  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));
  if (active == 7) {
    props.onclose();
  }
  const { classes } = useStyle({ mobiles: mobile, activeProps: active });

  const nextBut = () => {
    nextStep();
  };
  const prevBut = () => {
    prevStep();
  };

  return (
    <Center className={classes.butHome}>
      <Flex onClick={() => prevBut()} className={classes.prefBut}>
        <Image miw={'52px'} h={52} src={iconPrev}></Image>
      </Flex>
      <Flex className={classes.flexStep}>
        <Flex
          sx={{
            background: `url('${
              active == 0
                ? images.b1Mobile
                : active == 1
                ? images.b2Mobile
                : active == 2
                ? images.b3Mobile
                : active == 3
                ? images.b4Mobile
                : active == 4
                ? images.b5Mobile
                : active == 5
                ? images.b6Mobile
                : images.b6Mobile
            }')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
            backgroundPosition: 'center',
          }}
          justify={'center'}
          align={'center'}
          w={'100%'}
          h={'60%'}
        ></Flex>
        <Flex className={classes.flexStep2}>
          <Stepper
            active={active}
            onStepClick={setActive}
            w={'100%'}
            classNames={{
              root: classes.root,
              step: classes.steps,
              stepIcon: classes.stepIcon,
              separatorActive: classes.separatorActive,
              separator: classes.separator,
            }}
          >
            <Stepper.Step color={variable.primary.primary1}>
              <Text ta={'center'} className="textSuggest">
                {t('Instruct.stepOne.content1')}
                <Text className="body-1_bold" display={'inline'}>
                  {t('Instruct.stepOne.content2')}
                </Text>
                {t('Instruct.stepOne.content3')}
              </Text>
            </Stepper.Step>

            <Stepper.Step color={variable.primary.primary1}>
              <Text ta={'center'} className="body-5_medium">
                {t('Instruct.stepTwo.content1')}
              </Text>
            </Stepper.Step>

            <Stepper.Step color={variable.primary.primary1}>
              <Text ta={'center'} className="body-5_medium">
                {t('Instruct.stepThree.content1')}
                <Text display={'inline'} className="body-1_bold">
                  {t('Instruct.stepThree.content2')}
                </Text>
                {t('Instruct.stepThree.content3')}
                <Text display={'inline'} className="body-1_bold">
                  {t('Instruct.stepThree.content4')}
                </Text>
                {t('Instruct.stepThree.content5')}
              </Text>
            </Stepper.Step>

            <Stepper.Step color={variable.primary.primary1}>
              <Text ta={'center'} className="body-5_medium">
                {t('Instruct.stepFour.content1')}
                <Text display={'inline'} className="body-1_bold">
                  {t('Instruct.stepFour.content2')}
                </Text>
                {t('Instruct.stepFour.content3')}
                <Text display={'inline'} className="body-1_bold">
                  {t('Instruct.stepFour.content4')}
                </Text>
              </Text>
            </Stepper.Step>

            <Stepper.Step color={variable.primary.primary1}>
              <Text ta={'center'} className="body-5_medium">
                {t('Instruct.stepFive.content1')}
              </Text>
            </Stepper.Step>

            <Stepper.Step color={variable.primary.primary1}>
              <Text
                sx={{
                  fontSize: '16px',
                }}
                ta={'center'}
                className="body-5_medium"
              >
                {t('Instruct.stepSix.content1')}
              </Text>
              <Text
                sx={{
                  fontSize: '12px',
                }}
                ta={'center'}
                className={'small-6_regular'}
                c={variable.secondary.secondary2}
              >
                {t('Instruct.stepSix.content2')}
              </Text>
            </Stepper.Step>
            <Stepper.Completed>
              <Text
                sx={{
                  textAlign: 'center',
                  lineHeight: '1.3',
                }}
              >
                {t('Instruct.out.outInstruct')}
              </Text>
            </Stepper.Completed>
          </Stepper>
          {active == 6 ? (
            <MyButton className={classes.buttonNext} onClick={nextStep}>
              {active == 6 ? t('Account.login.exitTutorial') : t('Account.login.next')}
            </MyButton>
          ) : null}
        </Flex>
      </Flex>
      <Flex onClick={() => nextBut()} className={classes.nextBut}>
        <Image miw={'52px'} h={52} src={iconNext}></Image>
      </Flex>
    </Center>
  );
};

const useStyle = createStyles((theme, params: styleProps) => ({
  butHome: {},
  prefBut: {
    width: '55px',
    height: '55px',
    zIndex: 1000,
    position: 'absolute',
    top: '46.5%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    left: '45px',
    cursor: 'pointer',
    ':hover': {
      opacity: params.mobiles ? '1' : '0.5',
    },
  },
  nextBut: {
    width: '55px',
    height: '55px',
    zIndex: 1000,
    position: 'absolute',
    top: '46.5%',
    right: '45px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    ':hover': {
      opacity: params.mobiles ? '1' : '0.5',
    },
  },
  buttonNext: {
    maxWidth: '200px',
    width: '100%',
    height: '52px',
  },
  flexStep: {
    margin: '0 auto',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '650px',
    background: 'white',
    padding: '25px 20px 25px 20px',

    '.imgStep': {
      maxWidth: '100px',
      height: '100%',
      objectFit: 'cover',
    },
    '.mantine-1s2fldj': {
      borderRadius: '50%',

      svg: {
        width: '12px',
        height: '12px',
        color: 'white',
      },
      '.mantine-16mix4j': {
        color: '#A9A9A9',
        fontSize: '12px',
        fontWeight: 500,
      },
    },
  },
  // r0und
  flexStep2: {
    margin: '0 auto',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    maxWidth: '70%',
    width: '100%',
    height: '200px',
    marginTop: '28px',

    '.mantine-1meyx90': {
      width: '300px !important',
      height: '200px',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'white',
      padding: '25px 20px 25px 20px',
    },
    '.mantine-1s2fldj': {
      border: '1.5px solid #BFBFBF',
      borderRadius: '50%',

      '.mantine-16mix4j': {
        color: '#A9A9A9',
        fontSize: '12px',
        fontWeight: 500,
      },
    },
    // all text
    '.textSuggest': {
      fontSize: '15px',
      marginTop: '10px',
      fontWeight: 500,
    },
    '.mantine-9snfeq': {
      paddingTop: 10,
    },
  },
  root: {
    width: '100% !important',
  },
  steps: {
    color: 'blue',
  },
  stepIcon: {
    width: '24px',
    height: '24px',
    minWidth: 'auto',
  },
  separatorActive: {
    backgroundColor: variable.primary.primary1,
  },
  separator: {
    marginLeft: 0,
    marginRight: 0,
    height: '3px',
  },
}));
