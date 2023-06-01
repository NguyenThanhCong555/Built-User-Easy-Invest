import React from 'react';

import { ReactComponent as Wallet } from 'assets/icons/header/wallet.svg';
import { ReactComponent as IconStakeUsdt } from 'assets/icons/header/stake-usdt.svg';
import { ReactComponent as IconStakeCoin } from 'assets/icons/header/stake-coin.svg';
import { ReactComponent as Users } from 'assets/icons/header/users.svg';
import { ReactComponent as IconPolicy } from 'assets/icons/header/policy.svg';

export const navArray = [
  {
    id: 1,
    icon: <Wallet />,
    name: 'Header.walletManagement',
    navigate: '/wallet',
  },
  {
    id: 2,
    icon: <IconStakeUsdt />,
    name: 'Header.stakeUsdtManagement',
    navigate: '/stake-management',
  },
  {
    id: 3,
    icon: <IconStakeCoin />,
    name: 'Header.stakeCoinManagement',
    navigate: '/stake-coin-management',
  },
  {
    id: 4,
    icon: <Users />,
    name: 'Header.account',
    navigate: '/profile',
  },
  {
    id: 5,
    icon: <IconPolicy />,
    name: 'Header.policy',
    navigate: '/policy-terms',
  },
];
