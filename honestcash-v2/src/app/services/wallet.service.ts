import { Injectable } from '@angular/core';
import { WalletUtils } from 'app/shared/lib/WalletUtils';

@Injectable()
export class WalletService {
  private WALLET_KEYS = {
    HD_PATH: 'HC_BCH_HD_PATH',
    MNEMONIC: 'HC_BCH_MNEMONIC',
    PRIVATE_KEY: 'HC_BCH_PRIVATE_KEY'
  };

  constructor() {}

  public getWallet(): any {
    const wallet = {
      mnemonic: localStorage.getItem(this.WALLET_KEYS.MNEMONIC),
      privateKey: localStorage.getItem(this.WALLET_KEYS.PRIVATE_KEY),
      HdPath: localStorage.getItem(this.WALLET_KEYS.HD_PATH),
    };
    return wallet;
  }

  public setWallet(mnemonic: string, password: string): void {
    const simpleWallet = WalletUtils.generateWalletWithEncryptedRecoveryPhrase(mnemonic, password);
    localStorage.setItem(this.WALLET_KEYS.PRIVATE_KEY, simpleWallet.privateKey);
    localStorage.setItem(this.WALLET_KEYS.MNEMONIC, simpleWallet.mnemonic);
    return localStorage.setItem(this.WALLET_KEYS.HD_PATH, simpleWallet.HdPath);
  }

  public unsetWallet(): void {
    localStorage.removeItem(this.WALLET_KEYS.PRIVATE_KEY);
    localStorage.removeItem(this.WALLET_KEYS.MNEMONIC);
    return localStorage.removeItem(this.WALLET_KEYS.HD_PATH);
  }
}
