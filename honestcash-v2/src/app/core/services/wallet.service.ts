import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import Wallet from '../models/wallet';
import {isPlatformBrowser} from '@angular/common';
import {ISimpleBitcoinWallet, WalletUtils} from '../../shared/lib/WalletUtils';
import {LoginSuccessResponse} from '../models/authentication';
import {Logger} from './logger.service';

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

  private logger: Logger;
  private locallySavedMnemonic: string | void;
  readonly isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject('LOCALSTORAGE') private localStorage: Storage,
  ) {
    this.logger = new Logger('WalletService');
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    this.locallySavedMnemonic = this.getWalletMnemonic();
  }

  public async setupWallet(payload?: LoginSuccessResponse): Promise<ISimpleBitcoinWallet> {
    // if there is a payload it means it is a login with wallet attached
    // but we check for the existence of wallet just in case
    let simpleWallet: ISimpleBitcoinWallet;
    if (payload && payload.wallet) {
      this.logger.info('Setting up an already existing wallet');
      simpleWallet = await WalletUtils.generateWalletWithEncryptedRecoveryPhrase(payload.wallet.mnemonicEncrypted, payload.password);
    } else if ((!payload || !payload.wallet) && this.locallySavedMnemonic) {
      // if there is no payload or but there is a payload but no wallet
      // but there is a decrypted mnemonic in the localstorage
      // it means the app loads wallet from localStorage
      simpleWallet = await WalletUtils.generateWalletWithDecryptedRecoveryPhrase(this.locallySavedMnemonic);
    } else {
      // if there is no payload or no locally saved decrypted mnemonic
      // it means that this is a brand new user
      this.logger.info('Creating new wallet.');
      simpleWallet = await WalletUtils.generateNewWallet(payload.password);
    }
    return simpleWallet;
  }

  public getWalletMnemonic(): string | void {
    if (this.isPlatformBrowser) {
      return this.localStorage.getItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC);
    }
  }

  public setWallet(wallet: ISimpleBitcoinWallet): void {
    if (this.isPlatformBrowser) {
      this.localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, wallet.mnemonic);
    }
  }

  public unsetWallet(): void {
    if (this.isPlatformBrowser) {
      this.localStorage.removeItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC);
    }
  }
}
