import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../types';
import { initialState } from './index';

const selectDomain = (state: RootState) => state.project || initialState;
export const selectProject = createSelector([selectDomain], project => project);

export const selectListProject = createSelector([selectDomain], project => project.projects);
export const selectListProjectDetail = createSelector([selectDomain], project => project.projectDetail);

export const selectCalledFirstProjects = createSelector([selectDomain], project => project.calledFirstProjects);
export const selectCalledFirstProjectDetail = createSelector([selectDomain], project => project.calledFirstProjectDetail);

// response
export const selectLoading = createSelector([selectDomain], project => project.response.loading);
export const selectLoadingProjectDetail = createSelector([selectDomain], project => project.response.loadingProjectDetail);

export const selectError = createSelector([selectDomain], project => project.response.error);
