import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Container, createStyles } from '@mantine/core';

import { selectAuth } from 'store/slice/auth/selectors';
import Loading from 'app/components/Loading/Loading';
import Project from './components/Project/Project';
import { baseDomain } from 'utils/http/request';
import { media } from 'styles/media';
import { authActions } from 'store/slice/auth';
import { store } from 'store/configureStore';
import { selectCalledFirstProjects, selectListProject, selectLoading } from 'store/slice/project/selector';
import { projectActions } from 'store/slice/project';
import { images } from 'assets/images';

export function HomePage() {
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const calledFirstProjects = useSelector(selectCalledFirstProjects);
  const projects = useSelector(selectListProject);

  React.useEffect(() => {
    if (calledFirstProjects) return;

    dispatch(projectActions.requestGetAllProjects());
  }, []);

  return (
    <>
      <Helmet>
        <title>Easy Invest</title>
        <meta name="description" content="A Boilerplate application homepage" />
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Container fluid className={classes.container}>
        <Loading visible={loading} />
        <div className={classes.gird}>
          {projects.map(project => (
            <Project key={project.id} data={project} />
          ))}
        </div>
      </Container>
    </>
  );
}

const makeStyles = createStyles(() => ({
  container: {
    height: '100%',
    maxWidth: 1170,
    padding: 16,
    margin: '0px auto',
  },
  addBtn: {
    width: '50%',
    height: '100%',
  },
  gird: {
    display: 'grid',
    gap: '18px 38px',
    marginTop: 24,
    paddingBottom: 18,
    gridTemplateColumns: 'repeat( auto-fill, minmax(343px, 1fr))',
    [media.small()]: {
      gridTemplateColumns: 'repeat( auto-fill, minmax(100%, 1fr))',
    },
  },
}));
