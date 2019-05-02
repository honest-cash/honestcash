import { Action } from '@ngrx/store';
import {LoginResponse, SignupResponse} from '../../services/authentication.interfaces';

export enum WalletActionTypes {
  WALLET_SETUP = '[Wallet] Wallet setup',
  WALLET_CLEANUP = '[Wallet] Wallet cleanup',
}

export class WalletSetup implements Action {
  readonly type = WalletActionTypes.WALLET_SETUP;
  constructor(public payload?: LoginResponse | SignupResponse) {}
}

export class WalletCleanup implements Action {
  readonly type = WalletActionTypes.WALLET_CLEANUP;
  constructor() {}
}

export type All =
   | WalletSetup
   | WalletCleanup;
