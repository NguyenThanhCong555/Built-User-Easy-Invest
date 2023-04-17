import React, { createContext, useContext, useState } from 'react';
import { getDateAfter } from 'utils/helpers/getDateAfter';

interface FilterProviderProps {
  children?: any;
}

type TFilterContext = {
  opened: boolean;
  active: number;
  isFilter: boolean;
  filter: {
    start: Date;
    end: Date;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      start: Date;
      end: Date;
    }>
  >;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  openFilter: () => void;
  handleFilter: () => void;
  closeFilter: () => void;
};

export const FilterContext = createContext<TFilterContext>({
  opened: false,
  active: 1,
  isFilter: false,
  filter: {
    start: getDateAfter(new Date(), 0, -1),
    end: new Date(),
  },
  setActive: () => {},
  setFilter: () => {},
  openFilter: () => {},
  handleFilter: () => {},
  closeFilter: () => {},
});

const FilterProvider = ({ children }: FilterProviderProps) => {
  const [opened, setOpened] = useState(false);
  const [filter, setFilter] = useState({ start: getDateAfter(new Date(), 0, -1), end: new Date() });

  const [isFilter, setIsFilter] = useState(false);
  const [active, setActive] = useState(1);

  const openFilter = () => {
    setOpened(true);
  };

  const closeFilter = () => {
    setOpened(false);
  };

  const handleFilter = () => {
    setIsFilter(true);
    console.log('filter', filter);
  };

  return (
    <FilterContext.Provider
      value={{ opened, filter, active, setActive, setFilter, isFilter, openFilter, handleFilter, closeFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterWallet = () => useContext(FilterContext);
export default FilterProvider;
