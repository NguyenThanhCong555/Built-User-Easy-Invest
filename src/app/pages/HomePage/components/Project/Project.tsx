import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Flex, Group, Stack, Text, createStyles } from '@mantine/core';

import { media } from 'styles/media';
import { OutlineButton } from 'app/components/Button/OutlineButton';
import { FilledButton } from 'app/components/Button/FilledButton';
import { useNavigate } from 'react-router-dom';
import { ProjectState } from 'store/slice/auth/type';
import { DataProject } from 'store/slice/project/types';

interface Props {
  data: DataProject;
}
const Project = memo(({ data }: Props) => {
  const navigate = useNavigate();
  // Local
  const { t } = useTranslation();
  const { classes } = makeStyles();

  const moveToProjectInfo = event => {
    event.stopPropagation();
    navigate(`/projects/${data.id}?target=information`);
  };

  const moveToStakeOfProject = event => {
    event.stopPropagation();
    navigate(`/projects/${data.id}`);
  };

  return (
    <Flex className={classes.project} onClick={event => moveToStakeOfProject(event)}>
      <Avatar src={data?.avatar} className={classes.avatar} />
      <Stack className={classes.content}>
        <div>
          <Text lineClamp={1} className="subtitle_4-bold">
            {data?.name}
          </Text>
          {/* <Text lineClamp={1} className="small_6-regular">
            {data?.author.name}
          </Text> */}
          <Group spacing={4} mt={2} mb={12}>
            <Avatar src={data?.coin_avatar} className={classes.avatarCoin} h={32} w={32} />
            <Text mt={2} className="body_4-bold">
              {data?.coin_name}
            </Text>
          </Group>
        </div>
        <Flex className={classes.groupBtn}>
          <OutlineButton onClick={event => moveToProjectInfo(event)} className={classes.projectBtn}>
            {t('Home.Preview')}
          </OutlineButton>
          <FilledButton onClick={event => moveToStakeOfProject(event)} className={classes.projectBtn}>
            {t('Home.Invest')}
          </FilledButton>
        </Flex>
      </Stack>
    </Flex>
  );
});

export default Project;

const makeStyles = createStyles(() => ({
  project: {
    gap: 14,
    width: '100%',
    padding: 8,
    maxHeight: 343,
    borderRadius: 8,
    border: '1px solid var(--grey-light)',
    boxShadow: 'var(--shadow-hover)',
    position: 'relative',
    [`${media.small()}`]: {
      maxWidth: '100%',
    },
  },
  lock: {
    position: 'absolute',
    right: 8,
  },
  avatar: {
    width: 110,
    height: '100%',
    borderRadius: 14,
  },
  content: {
    gap: 4,
    flex: 1,
    justifyContent: 'space-between',
  },
  groupBtn: {
    gap: 8,
  },
  projectBtn: {
    width: '50%',
    padding: 0,
  },
  usdtWrap: {
    gap: 6,
  },
  money: {
    color: 'var(--primary-2)',
  },

  avatarCoin: {
    minWidth: '32px',
    overflow: 'hidden',
    boxSizing: 'border-box',
    height: '32px',
    borderRadius: '50%',
    margin: '5px 5px 0px 0',
  },
}));
