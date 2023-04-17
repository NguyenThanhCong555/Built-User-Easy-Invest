import { SECONDS_PER_DAY } from 'constants/common';
import { convertSeconds } from 'helpers/convertDay';
import { projectDetail } from 'store/slice/project/types';
import { IListStake, SimpleStake, TBoughtStakeIteam, TStakeBought, TStakingBook } from 'store/slice/stake/types';
import { isArray } from 'util';

export const handleGetProjectDetail = (dataProjectDetail: projectDetail[], projectId: number): projectDetail | undefined => {
  for (let project of dataProjectDetail) {
    if (project.id === Number(projectId)) return project;
  }
  return undefined;
};

export const handleGetSpecifyStakeOfProject = (
  dataStakes: IListStake[],
  projectId: number,
  stakeId: number,
): SimpleStake | undefined => {
  let stakesOfProjectId: SimpleStake[] = [];
  for (let stake of dataStakes) {
    if (stake.project_id === projectId) {
      stakesOfProjectId = [...stake.listStake];
      break;
    }
  }

  for (let simpleStake of stakesOfProjectId) {
    if (simpleStake.id === stakeId) return simpleStake;
  }

  return undefined;
};

export const getListStakes = (dataStakes: IListStake[], projectId: string): SimpleStake[] | undefined => {
  for (let stakeOfProject of dataStakes) {
    if (stakeOfProject.project_id === Number(projectId)) return stakeOfProject.listStake;
  }
  return [];
};

export const GetListAPROfStake = (listStakes: SimpleStake[] | undefined): { id: number; day: number; rateUsdt: number }[] => {
  if (listStakes === undefined) return [];

  return listStakes.map(stake => {
    const days = convertSeconds(stake.timeframe);

    const payload: { id: number; day: number; rateUsdt: number } = {
      id: stake.id,
      day: days,
      rateUsdt: stake.interest_rate,
    };
    return payload;
  });
};

export const filterBookStake = (data: TStakingBook[], state: 0 | 1) => {
  if (data.length === 0) return [];

  return data.filter(stakeBook => {
    if (stakeBook.auto === state) return stakeBook;
  });
};

export const getSimpleBoughtStakeInfor = (data: TBoughtStakeIteam[], stakingId: number): TStakeBought | undefined => {
  for (let boughtStake of data) {
    if (boughtStake.stakingId === stakingId) return boughtStake.stakeInfor;
  }
  return undefined;
};

export const GetProfitAfterTerm = (coin: number, rate: number, timeframe: number): number => {
  const percent = 100;
  const DayPerYear = 365;

  return (((coin * rate) / percent) * timeframe) / (DayPerYear * SECONDS_PER_DAY);
};

export const formatPreWithDrawalProfit = (coin: number, interest_rate_before: number, time_start: number): number => {
  const now = new Date().getTime();
  const time = (now - time_start) / (1000 * 60 * 60 * 24 * 365);

  const profit = coin * (interest_rate_before / 100) * time;

  return profit;
};

export const convertTime = (timestamp: number) => {
  if (!timestamp) return null;
  let date = new Date(timestamp * 1000);
  let day = ('0' + date.getDate()).slice(-2);
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear();
  let formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export function formatCurrency(value) {
  if (value === 0) return value;
  return value?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).slice(0, -1);
}
