// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { Project } from 'store/slice/project/types';
import { Stake } from 'store/slice/stake/types';
import { AuthState } from 'store/slice/auth/type';
import { Coin } from 'store/slice/coin/types';
import { WalletState } from 'store/slice/wallet/type';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  auth?: AuthState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  project?: Project;
  stake?: Stake;
  coin?: Coin;
  wallet?: WalletState;
}
