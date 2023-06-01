import React, { useState } from 'react';
import { Timeline, Text, Stepper, Group, createStyles } from '@mantine/core';
import { IconGitBranch } from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import { variable } from 'styles/variable';

// type Props = {
//   active: number;
//   setActive: React.Dispatch<React.SetStateAction<number>>;
// };

export const InstructStepper = () => {
  const { classes } = useStyle();
  const { t } = useTranslation();

  const [active, setActive] = useState(0);
  const nextStep = () => setActive(current => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));

  return (
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
        <Text ta={'center'} className="body-5_medium">
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
        <Text ta={'center'} className="body-5_medium">
          {t('Instruct.stepSix.content1')}
        </Text>
        <Text ta={'center'} className={'small-6_regular'} c={variable.secondary.secondary2}>
          {t('Instruct.stepSix.content2')}
        </Text>
      </Stepper.Step>

      {/* <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed> */}
    </Stepper>
  );
};

const useStyle = createStyles(theme => ({
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
