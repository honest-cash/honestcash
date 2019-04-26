import { Action } from '@ngrx/store';
import Wallet from '../../models/wallet';

export enum WalletActionTypes {
  WALLET_SETUP = '[Wallet] Wallet setup',
  WALLET_CLEANUP = '[Wallet] Wallet cleanup',
}

export class WalletSetup implements Action {
  readonly type = WalletActionTypes.WALLET_SETUP;
  constructor(public payload: {
    mnemonicEncrypted: string;
    password: string;
  }) {}
}

export class WalletCleanup implements Action {
  readonly type = WalletActionTypes.WALLET_CLEANUP;
  constructor() {}
}

export type All =
   | WalletSetup
   | WalletCleanup;
