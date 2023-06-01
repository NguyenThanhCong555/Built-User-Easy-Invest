import { ErrorResponse } from 'utils/http/response';
import { DataProject, projectDetail } from './types';

export interface ListProjectResponse extends ErrorResponse {
  data?: {
    projects: DataProject[];
  };
}

export interface ProjectDetailResponse extends ErrorResponse {
  data: projectDetail;
}
