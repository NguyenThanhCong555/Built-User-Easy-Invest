import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getDateAfter } from 'utils/helpers/getDateAfter';

interface FilterProviderProps {
  children?: any;
}

type TFilterContext = {
  opened: boolean;
  active: number;
  isFilter: boolean;
  refresh: boolean;
  filter: {
    start: Date;
    end: Date;
  };
  filterAgain: boolean;
  setFilter: React.Dispatch<
    React.SetStateAction<{
      start: Date;
      end: Date;
    }>
  >;
  setIsFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  openFilter: () => void;
  handleFilter: () => void;
  handleRefresh: () => void;
  closeFilter: () => void;
};

export const FilterContext = createContext<TFilterContext>({
  opened: false,
  active: 1,
  isFilter: false,
  refresh: false,
  filterAgain: false,
  filter: {
    start: getDateAfter(new Date(), 0, -1),
    end: new Date(),
  },
  setActive: () => {},
  setFilter: () => {},
  setRefresh: () => {},
  setIsFilter: () => {},
  openFilter: () => {},
  handleFilter: () => {},
  handleRefresh: () => {},
  closeFilter: () => {},
});

const FilterProvider = ({ children }: FilterProviderProps) => {
  const [opened, setOpened] = useState(false);
  const [filter, setFilter] = useState({
    start: getDateAfter(new Date(new Date().setHours(0, 0, 0, 0)), 0, -1),
    end: new Date(new Date().setHours(23, 59, 59, 999)),
  });
  const [isFilter, setIsFilter] = useState(false);
  const [filterAgain, setFilterAgain] = useState(false);
  const [active, setActive] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const openFilter = () => {
    setOpened(true);
  };

  const closeFilter = () => {
    setOpened(false);
  };

  const handleFilter = () => {
    setSearchParams({ start: JSON.stringify(filter.start.getTime()), end: JSON.stringify(filter.end.getTime()) });
    setIsFilter(true);
    setFilterAgain(!filterAgain);
    setOpened(false);
  };

  function handleRefresh() {
    closeFilter();
    setIsFilter(false);
    setRefresh(true);
    setActive(1);
    setFilter({
      start: getDateAfter(new Date(new Date().setHours(0, 0, 0, 0)), 0, -1),
      end: new Date(new Date().setHours(23, 59, 59, 999)),
    });
    setSearchParams({});
  }

  useEffect(() => {
    if (searchParams.get('start') !== null && searchParams.get('end') !== null) {
      console.log('hi');

      setIsFilter(true);
      setFilter({
        start: new Date(Number(searchParams.get('start'))),
        end: new Date(Number(searchParams.get('end'))),
      });
    }
  }, []);

  return (
    <FilterContext.Provider
      value={{
        opened,
        refresh,
        filterAgain,
        filter,
        active,
        isFilter,
        setRefresh,
        setActive,
        setIsFilter,
        setFilter,
        openFilter,
        handleFilter,
        handleRefresh,
        closeFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterWallet = () => useContext(FilterContext);
export default FilterProvider;
