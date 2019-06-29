import {ISimpleWallet} from '../models/simple-wallet';
import {WALLET_SETUP_STATUS} from '../services/wallet.service';

export interface WalletState {
  wallet: ISimpleWallet;
  balance: number; // in usd by default
  status: WALLET_SETUP_STATUS;
}

export const initialWalletState: WalletState = {
  wallet: null,
  balance: null,
  status: WALLET_SETUP_STATUS.NotInitialized,
};
