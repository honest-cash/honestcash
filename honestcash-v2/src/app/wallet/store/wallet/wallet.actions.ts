import {Action} from '@ngrx/store';
import {LoginSuccessResponse, SignupSuccessResponse} from '../../../shared/models/authentication';
import {ISimpleBitcoinWallet} from '../../../shared/lib/WalletUtils';
import Wallet from '../../../shared/models/wallet';

export enum WalletActionTypes {
  WALLET_SETUP = '[Wallet] Wallet setup',
  WALLET_SETUP_FAILED = '[Wallet] Wallet setup failed',
  WALLET_CLEANUP = '[Wallet] Wallet cleanup',
  WALLET_GENERATED = '[Wallet] Wallet has been generated'
}

export class WalletSetup implements Action {
  readonly type = WalletActionTypes.WALLET_SETUP;

  constructor(public payload?: LoginSuccessResponse | SignupSuccessResponse) {
  }
}

export class WalletSetupFailed implements Action {
  readonly type = WalletActionTypes.WALLET_SETUP_FAILED;
}

export class WalletCleanup implements Action {
  readonly type = WalletActionTypes.WALLET_CLEANUP;
}

export class WalletGenerated implements Action {
  readonly type = WalletActionTypes.WALLET_GENERATED;

  constructor(public payload: { wallet: ISimpleBitcoinWallet | Wallet }) {
  }
}

export type All =
  | WalletSetup
  | WalletSetupFailed
  | WalletGenerated
  | WalletCleanup;
