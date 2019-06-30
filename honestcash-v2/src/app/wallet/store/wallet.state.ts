import {ISimpleWallet} from '../models/simple-wallet';
import {WALLET_STATUS} from '../models/status';

export interface WalletState {
  wallet: ISimpleWallet;
  balance: number; // in usd by default
  status: WALLET_STATUS;
}

export const initialWalletState: WalletState = {
  wallet: null,
  balance: null,
  status: WALLET_STATUS.NotInitialized,
};
