import { ErrorResponse } from 'utils/http/response';
import { projectDetail } from './types';

export interface SimpleProjectResponse {
  id: number;
  name: string;
  avatar: string;
  author: { name: string };
}

export interface ListProjectResponse extends ErrorResponse {
  data?: {
    projects: SimpleProjectResponse[];
  };
}

export interface ProjectDetailResponse extends ErrorResponse {
  data: projectDetail;
}
