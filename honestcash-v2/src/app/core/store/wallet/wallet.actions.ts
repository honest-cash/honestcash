import { Action } from '@ngrx/store';
import { IAuthRequestSuccessResponse } from '../../services/authentication.service';

export enum WalletActionTypes {
  WALLET_SETUP = '[Wallet] Wallet setup',
  WALLET_CLEANUP = '[Wallet] Wallet cleanup',
}

export class WalletSetup implements Action {
  readonly type = WalletActionTypes.WALLET_SETUP;
  constructor(public payload?: IAuthRequestSuccessResponse) {}
}

export class WalletCleanup implements Action {
  readonly type = WalletActionTypes.WALLET_CLEANUP;
  constructor() {}
}

export type All =
   | WalletSetup
   | WalletCleanup;
