import { Injectable } from '@angular/core';
import SimpleBitcoinWallet from 'simple-bitcoin-wallet';
import { WalletUtils } from '../../shared/lib/WalletUtils';
import Wallet from '../../models/wallet';

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

  public getWallet(): Wallet {
    if (!this._wallet) {
      const mnemonic = localStorage.getItem(this.WALLET_KEYS.MNEMONIC);
      if (!mnemonic) {
        return null;
      }
      this._wallet = {
        privateKey: localStorage.getItem(this.WALLET_KEYS.PRIVATE_KEY),
        mnemonic,
        HdPath: localStorage.getItem(this.WALLET_KEYS.HD_PATH) || this.DEFAULT_HD_PATH,
      };
      this.wallet = new SimpleBitcoinWallet(mnemonic, {
        HdPath: this.DEFAULT_HD_PATH,
      });
    }
    return this.wallet;
  }

  public setWallet(password?: string, mnemonic?: string): void {
    let simpleWallet: Wallet = null;
    if (mnemonic) {
      simpleWallet = WalletUtils.generateWalletWithEncryptedRecoveryPhrase(mnemonic, password);
    } else {
      simpleWallet = WalletUtils.generateNewWallet(password);
      simpleWallet.mnemonic = WalletUtils.encrypt(simpleWallet.mnemonic, password);
    }

    this._wallet = simpleWallet;
    this.wallet = new SimpleBitcoinWallet(simpleWallet.mnemonic, {
      HdPath: this.DEFAULT_HD_PATH,
    });

    localStorage.setItem(this.WALLET_KEYS.PRIVATE_KEY, this.wallet.privateKey);
    localStorage.setItem(this.WALLET_KEYS.MNEMONIC, this.wallet.mnemonic);
    return localStorage.setItem(this.WALLET_KEYS.HD_PATH, this.wallet.HdPath || this.DEFAULT_HD_PATH);
  }

  public unsetWallet(): void {
    this._wallet = null;
    localStorage.removeItem(this.WALLET_KEYS.PRIVATE_KEY);
    localStorage.removeItem(this.WALLET_KEYS.MNEMONIC);
    return localStorage.removeItem(this.WALLET_KEYS.HD_PATH);
  }
}
