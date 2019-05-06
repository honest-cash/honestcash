import { Injectable } from '@angular/core';
import SimpleBitcoinWallet from 'simple-bitcoin-wallet';
import { WalletUtils } from '../../shared/lib/WalletUtils';
import Wallet from '../models/wallet';

export const WALLET_LOCALSTORAGE_KEYS = {
  HD_PATH: 'HC_BCH_HD_PATH',
  MNEMONIC: 'HC_BCH_MNEMONIC',
  PRIVATE_KEY: 'HC_BCH_PRIVATE_KEY'
};

export const WALLET_DEFAULT_HD_PATH = `m/44'/0'/0'/0/0`;

@Injectable({providedIn: 'root'})
export class WalletService {
  _wallet: Wallet = null;
  wallet: Wallet = null;

  constructor() {}

  public getWalletMnemonic(): string {
    return localStorage.getItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC);
  }

  public setWallet(mnemonic: string): void {
    localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, mnemonic);

    return;
  }

  public unsetWallet(): void {
    localStorage.removeItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC);

    return;
  }
}
