import { Action } from '@ngrx/store';
import {LoginSuccessResponse} from '../../models/authentication';
import Wallet from 'app/core/models/wallet';

export enum WalletActionTypes {
  WALLET_SETUP = '[Wallet] Wallet setup',
  WALLET_CLEANUP = '[Wallet] Wallet cleanup',
  WALLET_GENERATED = '[Wallet] Wallet has been generated'
}

export class WalletSetup implements Action {
  readonly type = WalletActionTypes.WALLET_SETUP;
  constructor(public payload?: LoginSuccessResponse) {}
}

export class WalletCleanup implements Action {
  readonly type = WalletActionTypes.WALLET_CLEANUP;
  constructor() {}
}

export class WalletGenerated implements Action {
  readonly type = WalletActionTypes.WALLET_GENERATED;
  constructor(public payload: { wallet: Wallet}) {}
}

export type All =
   | WalletSetup
   | WalletGenerated
   | WalletCleanup;
