import { useEffect } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { Project, projectDetail } from './types';
import { projectSaga } from './saga';
import { SimpleProjectResponse } from './response';

export const initialState: Project = {
  projects: [],
  calledFirstProjects: false,

  projectDetail: [],
  calledFirstProjectDetail: [],

  response: {
    loading: false,
    loadingProjectDetail: false,

    error: -1,
    message: '',
  },
};

const slice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    // set simple property
    setResponseError(state: Project, action: PayloadAction<{ error: number; message: string }>) {
      state.response.error = action.payload.error;
      state.response.message = action.payload.message;
    },
    setCalledFirstProjects(state: Project, action: PayloadAction<boolean>) {
      state.calledFirstProjects = action.payload;
    },

    // reset
    resetLoading(state: Project) {
      state.response.loading = false;
    },
    resetLoadingProjectDetail(state: Project) {
      state.response.loadingProjectDetail = false;
    },
    resetAllFieldProject(state: Project) {
      state.projects = [];
      state.calledFirstProjects = false;
      state.projectDetail = [];
      state.calledFirstProjectDetail = [];
      state.response = {
        loading: false,
        loadingProjectDetail: false,
        error: -1,
        message: '',
      };
    },

    resetResponse(state: Project) {
      state.response = {
        loading: false,
        loadingProjectDetail: false,
        error: -1,
        message: '',
      };
    },
    resetProject(state: Project) {
      state.projects = [];
    },

    // get all projects
    requestGetAllProjects(state: Project) {
      state.response.loading = true;
    },
    responseGetAllProjects(state: Project, action: PayloadAction<SimpleProjectResponse[]>) {
      state.projects = action.payload;
    },

    // get project
    requestGetProjectDetail(state: Project, action: PayloadAction<{ projectId: number }>) {
      state.response.loadingProjectDetail = true;
    },
    addNumberToCalledProjectDetail(state: Project, action: PayloadAction<{ projectId: number }>) {
      state.calledFirstProjectDetail.push(action.payload.projectId);
    },
    responseUpdateProjectDetail(state: Project, action: PayloadAction<projectDetail>) {
      for (let [index, oldDetail] of state.projectDetail.entries()) {
        if (oldDetail.id === action.payload.id) {
          state.projectDetail[index] = action.payload;
          return;
        }
      }

      state.projectDetail.push(action.payload);
    },
  },
});

export const { actions: projectActions, reducer } = slice;

export const projectReducer = reducer;
