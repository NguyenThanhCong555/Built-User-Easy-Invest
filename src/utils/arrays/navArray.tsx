import React from 'react';

import { ReactComponent as Wallet } from 'assets/icons/header/wallet.svg';
import { ReactComponent as Users } from 'assets/icons/header/users.svg';
export const navArray = [
  {
    icon: <Wallet />,
    name: 'Manage Wallet',
    navigate: '/wallet',
  },
  {
    icon: <Users />,
    name: 'Stake Management',
    navigate: '/stake-management',
  },
];
