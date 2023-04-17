import { Box } from '@mantine/core';
import React, { createContext, useState, useContext } from 'react';

export interface TPopup {
  open: boolean;
  triggerPopup: () => void;
  clearPopup: () => void;
}

interface Props {
  children?: any;
}

const PopupContext = createContext<TPopup>({ open: false, triggerPopup: () => {}, clearPopup: () => {} });

export const PopupFallingProvider = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const triggerPopup = () => {
    setOpen(true);
  };

  const clearPopup = () => {
    setOpen(false);
  };

  return <PopupContext.Provider value={{ open, triggerPopup, clearPopup }}>{props.children}</PopupContext.Provider>;
};

export const usePopupFalling = () => useContext(PopupContext);
