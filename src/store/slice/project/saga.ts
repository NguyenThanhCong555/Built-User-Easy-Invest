import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import { apiGet, apiGetV2 } from 'utils/http/request';
import { projectActions as actions } from '.';

// mook data
import { ListProjectResponse, ProjectDetailResponse } from './response';
import { selectAuth } from '../auth/selectors';

export function* FetchListProject() {
  try {
    const url = '/ez/project/getpublic';

    const res: AxiosResponse<ListProjectResponse> = yield call(apiGetV2, url, null);

    console.log(res);
    if (res.data.error === 0 && res.data.data) {
      yield put(actions.responseGetAllProjects(res.data.data.projects));
      yield put(actions.setCalledFirstProjects(true));
      yield put(actions.resetLoading());
    } else {
      yield put(actions.setCalledFirstProjects(true));
      yield put(actions.resetLoading());
    }
  } catch (error) {
    if (error) {
      yield put(actions.resetLoading());
    }
    console.log(error);
  }
}

export function* FetchProjectDetail(action: PayloadAction<{ projectId: number }>) {
  try {
    const projectId = action.payload.projectId;
    const url = `/ez/project/getpublicinfo?projectId=${projectId}`;

    const res: AxiosResponse<ProjectDetailResponse> = yield call(apiGetV2, url, null);

    console.log(res.data);
    if (res.data.error === 0 && res.data.data) {
      yield put(actions.responseUpdateProjectDetail({ ...res.data.data, id: projectId }));
      yield put(actions.addNumberToCalledProjectDetail({ projectId: projectId }));
      yield put(actions.resetLoadingProjectDetail());
    } else {
      yield put(actions.resetLoadingProjectDetail());
    }
  } catch (error) {
    if (error) {
      yield put(actions.resetLoadingProjectDetail());
    }
    console.log(error);
  }
}

export function* projectSaga() {
  // get all projects
  yield takeLatest(actions.requestGetAllProjects.type, FetchListProject);
  //get project detail
  yield takeLatest(actions.requestGetProjectDetail.type, FetchProjectDetail);
}
