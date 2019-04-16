import Wallet from '@models/wallet';

export interface State {
  wallet: Wallet | null;
}

export const initialState: State = {
  wallet: null
};
