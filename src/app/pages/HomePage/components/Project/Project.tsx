import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Flex, Stack, Text, createStyles } from '@mantine/core';

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

  const moveToProjectDetail = () => {
    navigate(`/projects/detail/${data.id}`);
  };

  const moveToStakeOfProject = () => {
    navigate(`/stake/${data.id}`);
  };

  return (
    <Flex className={classes.project}>
      <Avatar src={data?.avatar} className={classes.avatar} />
      <Stack className={classes.content}>
        <div>
          <Text lineClamp={1} className="subtitle_4-bold">
            {data?.name}
          </Text>
          <Text lineClamp={1} className="small_6-regular">
            {data?.author.name}
          </Text>
        </div>
        <Flex className={classes.groupBtn}>
          <OutlineButton onClick={moveToProjectDetail} className={classes.projectBtn}>
            {t('Home.Preview')}
          </OutlineButton>
          <FilledButton onClick={moveToStakeOfProject} className={classes.projectBtn}>
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
    maxHeight: 125,
    borderRadius: 8,
    border: '1px solid var(--grey-light)',
    boxShadow: 'var(--shadow-hover)',
    position: 'relative',
    cursor: 'pointer',
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
}));
