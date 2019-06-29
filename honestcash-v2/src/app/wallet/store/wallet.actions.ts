import {Action} from '@ngrx/store';
import {LoginSuccessResponse, SignupSuccessResponse} from '../../auth/models/authentication';
import {ISimpleWallet} from '../models/simple-wallet';
import {WALLET_SETUP_STATUS} from '../services/wallet.service';

export enum WalletActionTypes {
  WALLET_SETUP = '[Wallet] Wallet Setup',
  WALLET_SETUP_FAILED = '[Wallet] Wallet Setup Failed',
  WALLET_CLEANUP = '[Wallet] Wallet Cleanup',
  WALLET_GENERATED = '[Wallet] Wallet Generated',
  WALLET_BALANCE_UPDATED = '[Wallet] Wallet Balance Updated',
  WALLET_STATUS_UPDATED = '[Wallet] Wallet Status Update',
}

export class WalletSetup implements Action {
  public readonly type = WalletActionTypes.WALLET_SETUP;

  constructor(public payload?: LoginSuccessResponse | SignupSuccessResponse) {
  }
}

export class WalletSetupFailed implements Action {
  public readonly type = WalletActionTypes.WALLET_SETUP_FAILED;
}

export class WalletCleanup implements Action {
  public readonly type = WalletActionTypes.WALLET_CLEANUP;
}

export class WalletGenerated implements Action {
  public readonly type = WalletActionTypes.WALLET_GENERATED;

  constructor(public payload: { wallet: ISimpleWallet }) {
  }
}

export class WalletBalanceUpdated implements Action {
  public readonly type = WalletActionTypes.WALLET_BALANCE_UPDATED;

  constructor(public payload: number) {
  }
}

export class WalletStatusUpdated implements Action {
  public readonly type = WalletActionTypes.WALLET_STATUS_UPDATED;

  constructor(public payload: WALLET_SETUP_STATUS) {
  }

}

export type All =
  | WalletSetup
  | WalletSetupFailed
  | WalletGenerated
  | WalletCleanup
  | WalletBalanceUpdated
  | WalletStatusUpdated;
