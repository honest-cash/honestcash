import { Injectable } from '@angular/core';
import { WalletUtils } from 'app/shared/lib/WalletUtils';
import Wallet from 'app/models/wallet';

@Injectable()
export class WalletService {
  private WALLET_KEYS = {
    HD_PATH: 'HC_BCH_HD_PATH',
    MNEMONIC: 'HC_BCH_MNEMONIC',
    PRIVATE_KEY: 'HC_BCH_PRIVATE_KEY'
  };

  private DEFAULT_HD_PATH = `m/44'/0'/0'/0/0`;
  wallet: Wallet = null;

  constructor() {}

  public getWallet(): Wallet {
    if (!this.wallet) {
      const mnemonic = localStorage.getItem(this.WALLET_KEYS.MNEMONIC);
      if (!mnemonic) {
        return null;
      }
      this.wallet = {
        privateKey: localStorage.getItem(this.WALLET_KEYS.PRIVATE_KEY),
        mnemonic,
        HdPath: localStorage.getItem(this.WALLET_KEYS.HD_PATH) || this.DEFAULT_HD_PATH,
      };
    }
    return this.wallet;
  }

  public setWallet(password: string, mnemonic?: string): void {
    let simpleWallet: Wallet = null;
    if (mnemonic) {
      simpleWallet = WalletUtils.generateWalletWithEncryptedRecoveryPhrase(mnemonic, password);
    } else {
      simpleWallet = WalletUtils.generateNewWallet(password);
      simpleWallet.mnemonic = WalletUtils.encrypt(simpleWallet.mnemonic, password);
    }

    this.wallet = simpleWallet;

    localStorage.setItem(this.WALLET_KEYS.PRIVATE_KEY, simpleWallet.privateKey);
    localStorage.setItem(this.WALLET_KEYS.MNEMONIC, simpleWallet.mnemonic);
    return localStorage.setItem(this.WALLET_KEYS.HD_PATH, simpleWallet.HdPath || this.DEFAULT_HD_PATH);
  }

  public unsetWallet(): void {
    this.wallet = null;
    localStorage.removeItem(this.WALLET_KEYS.PRIVATE_KEY);
    localStorage.removeItem(this.WALLET_KEYS.MNEMONIC);
    return localStorage.removeItem(this.WALLET_KEYS.HD_PATH);
  }
}
