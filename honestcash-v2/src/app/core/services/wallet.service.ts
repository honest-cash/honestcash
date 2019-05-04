import { Injectable } from '@angular/core';
import SimpleBitcoinWallet from 'simple-bitcoin-wallet';
import { WalletUtils } from '../../shared/lib/WalletUtils';
import Wallet from '../models/wallet';

@Injectable({providedIn: 'root'})
export class WalletService {
  private WALLET_KEYS = {
    HD_PATH: 'HC_BCH_HD_PATH',
    MNEMONIC: 'HC_BCH_MNEMONIC',
    PRIVATE_KEY: 'HC_BCH_PRIVATE_KEY'
  };

  private DEFAULT_HD_PATH = `m/44'/0'/0'/0/0`;
  _wallet: Wallet = null;
  wallet: Wallet = null;

  constructor() {}

  public getWalletMnemonic(): string {
    return localStorage.getItem(this.WALLET_KEYS.MNEMONIC);
  }

  public setWallet(mnemonic: string): void {
    localStorage.setItem(this.WALLET_KEYS.MNEMONIC, mnemonic);

    return;
  }

  public unsetWallet(): void {
    localStorage.removeItem(this.WALLET_KEYS.MNEMONIC);

    return;
  }
}
