import { Button, Flex, Group, Image, Stepper, StyleProperty, createStyles } from '@mantine/core';
import React, { useState } from 'react';
import { Timeline, Text } from '@mantine/core';
import { IconGitBranch } from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import { variable } from 'styles/variable';
import { useMediaQuery } from '@mantine/hooks';
import { MyButton } from 'app/components/Button/MyButton';
import { images } from 'assets/images';

import { ReactComponent as ArrowLeft } from 'assets/icons/arrow/arrow-narrow-left.svg';
import { ReactComponent as XClose } from 'assets/icons/x-close.svg';

interface styleProps {
  mobiles: any;
  activeProps: any;
}

export const Mobileinstruct = props => {
  const mobile = useMediaQuery('(max-width:768px)');

  const { t } = useTranslation();

  const [active, setActive] = useState(0);

  const nextStep = () => setActive(current => (current < 7 ? current + 1 : current));
  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));
  if (active === 7) {
    props.onclose();
  }
  const { classes } = useStyle({ mobiles: mobile, activeProps: active });

  return (
    <Flex className={classes.flexStep}>
      <Group position="apart" w={'100%'} mb={20}>
        <ArrowLeft onClick={prevStep} />
        <XClose onClick={props.onclose} />
      </Group>
      <Flex
        sx={{
          background: `url('${
            active === 0
              ? images.b1Mobile
              : active === 1
              ? images.b2Mobile
              : active === 2
              ? images.b3Mobile
              : active === 3
              ? images.b4Mobile
              : active === 4
              ? images.b5Mobile
              : active === 5
              ? images.b6Mobile
              : images.b6Mobile
          }')`,
          // background: 'red',
          height: '326px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '85%',
          backgroundPosition: 'center',
        }}
        justify={'center'}
        align={'center'}
        w={'100%'}
        h={'100%'}
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
              ta={'center'}
              sx={{
                fontSize: '16px',
              }}
              className="body-5_medium"
            >
              {t('Instruct.stepSix.content1')}
            </Text>
            <Text
              ta={'center'}
              sx={{
                fontSize: '12px',
              }}
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
        <MyButton className={classes.buttonNext} onClick={nextStep}>
          {active == 6 ? t('Account.login.exitTutorial') : t('Account.login.next')}
        </MyButton>
      </Flex>
    </Flex>
  );
};

const useStyle = createStyles((theme, params: styleProps) => ({
  // button
  buttonNext: {
    maxWidth: '200px',
    width: '100%',
    // padding: '10px',
    minHeight: '42px',
    height: '42px !important',
  },
  flexStep: {
    margin: '0 auto',
    alignItems: 'center',
    flexDirection: 'column',
    height: '89vh',
    width: '100%',
    // body img
    '.mantine-9drndi': {
      height: '326px',
    },
    '.mantine-ehuocz': {
      height: '0',
    },
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
    marginTop: '20px',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    maxWidth: '80%',
    width: '100%',
    height: '40%',
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
