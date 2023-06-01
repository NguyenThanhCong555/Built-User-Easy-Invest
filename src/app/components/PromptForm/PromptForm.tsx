import * as React from 'react';
import { createStyles } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import ReactRouterPrompt from 'react-router-prompt';
import ModalConfirm from '../Modal/ModalConfirm';
import { OutlineButton } from '../Button/OutlineButton';
import { FilledButton } from '../Button/FilledButton';

interface PromptFormProps {
  visible: boolean;
  title: string;
  leftString?: string;
  rightString?: string;
}

const PromptForm = ({ title, leftString, rightString, visible }: PromptFormProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();

  return (
    <ReactRouterPrompt when={visible}>
      {({ isActive, onConfirm, onCancel }) => (
        <ModalConfirm
          // title={t(
          //   'FormProject.The information has not been saved. Are you sure you want to exit ?',
          // )}
          title={title}
          opened={isActive}
          onCloseModal={() => onCancel(isActive)}
          btnLeft={
            <OutlineButton className={classes.button} onClick={() => onConfirm(isActive)}>
              {leftString ?? t('Header.Exit')}
            </OutlineButton>
          }
          btnRight={
            <FilledButton className={classes.button} onClick={() => onCancel(isActive)}>
              {rightString ?? t('Header.Cancel')}
            </FilledButton>
          }
        />
      )}
    </ReactRouterPrompt>
  );
};

const makeStyles = createStyles(theme => ({
  button: {
    flex: 1,
    fontSize: '16px !important',
  },
}));

export default PromptForm;
