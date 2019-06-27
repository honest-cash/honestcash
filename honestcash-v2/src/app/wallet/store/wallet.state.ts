import Wallet from '../models/wallet';

export interface WalletState {
  wallet: Wallet | null;
}

export const initialWalletState: WalletState = {
  wallet: null
};
