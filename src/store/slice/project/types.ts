export interface DataProject {
  id: number;
  name: string;
  avatar: string;
  author: { name: string };
  coin_id: number;
  coin_name: string;
  coin_avatar: string;
}

export type TCoinInfo = {
  id: string;
  coin_name: string;
  coin_avatar: string;
  rate_usdt_coin: number;
  min_transfer: number;
};

export interface projectDetail {
  id: number;
  name: string;
  avatar: string;
  cover_photo: string[];
  author: { name: string };
  intro: { ENG: string; VN: string };
  website: string;
  coin_info: TCoinInfo;
  state: number;
}

export interface Project {
  projects: DataProject[];
  calledFirstProjects: boolean;

  projectDetail: projectDetail[];
  calledFirstProjectDetail: number[]; //check call api

  response: {
    loading: boolean;
    loadingProjectDetail: boolean;

    error: number;
    message: string;
  };
}
