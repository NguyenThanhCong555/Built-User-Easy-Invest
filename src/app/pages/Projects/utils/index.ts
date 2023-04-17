import { projectDetail } from 'store/slice/project/types';

export const handleGetProjectDetail = (dataProjectDetail: projectDetail[], projectId: number): projectDetail | undefined => {
  for (let project of dataProjectDetail) {
    if (project.id === Number(projectId)) return project;
  }
  return undefined;
};
