import {ISimpleWallet} from '../models/simple-wallet';

export interface WalletState {
  wallet: ISimpleWallet;
}

export const initialWalletState: WalletState = {
  wallet: null
};
