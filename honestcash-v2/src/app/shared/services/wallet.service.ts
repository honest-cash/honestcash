import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import Wallet from '../models/wallet';
import {isPlatformBrowser} from '@angular/common';
import {ISimpleBitcoinWallet, WalletUtils} from '../lib/WalletUtils';
import {LoginSuccessResponse, OkResponse, SignupSuccessResponse} from '../models/authentication';
import {Logger} from './logger.service';
import {AsyncSubject, defer, Observable, Subject} from 'rxjs';
import {HttpService} from '../../core';
import {LocalStorageToken} from '../../core/helpers/localStorage';

export const API_ENDPOINTS = {
  setWallet: `/auth/set-wallet`,
};

export const WALLET_LOCALSTORAGE_KEYS = {
  HD_PATH: 'HC_BCH_HD_PATH',
  MNEMONIC: 'HC_BCH_MNEMONIC',
  PRIVATE_KEY: 'HC_BCH_PRIVATE_KEY'
};

export const WALLET_DEFAULT_HD_PATH = `m/44'/0'/0'/0/0`;

export enum WALLET_SETUP_STATUS {
  NotInitialized = 'NOT_INITIALIZED',
  Started = 'STARTED',
  Initialized = 'INITIALIZED',
}

@Injectable({providedIn: 'root'})
export class WalletService {
  public _wallet: Wallet = null;
  public wallet: Wallet = null;

  public isSettingUpWallet: Subject<WALLET_SETUP_STATUS> = new AsyncSubject<WALLET_SETUP_STATUS>();

  private logger: Logger;
  private readonly isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private http: HttpService,
  ) {
    this.logger = new Logger('WalletService');
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    this.isSettingUpWallet.next(WALLET_SETUP_STATUS.NotInitialized);
  }

  public setupWallet(payload?: LoginSuccessResponse): Observable<ISimpleBitcoinWallet | Error> {
    return defer(
      async () => {
        this.isSettingUpWallet.next(WALLET_SETUP_STATUS.Started);
        let simpleWallet: ISimpleBitcoinWallet;
        if (payload) {
          if ((<LoginSuccessResponse>payload).wallet && (<LoginSuccessResponse>payload).wallet.mnemonicEncrypted) {
            // if there is a payload and a wallet attached
            // it means it is a login action
            this.logger.info('Setting up an already existing wallet from payload');
            simpleWallet = await WalletUtils.generateWalletWithEncryptedRecoveryPhrase(
              (<LoginSuccessResponse>payload).wallet.mnemonicEncrypted,
              payload.password
            );
          } else {
            // if there is a payload but NO wallet attached
            // it means it is a signup action with only the password
            this.logger.info('Creating new wallet.');
            simpleWallet = await WalletUtils.generateNewWallet(payload.password);
          }

        } else {
          if (this.getUserToken() && this.getWalletMnemonic()) {
            // if there is no payload
            // but there is a decrypted mnemonic and a token in the localstorage
            // it means the app loads wallet from localStorage
            this.logger.info('Setting up an already existing wallet from local storage');
            simpleWallet = await WalletUtils.generateWalletWithDecryptedRecoveryPhrase(<string>this.getWalletMnemonic());
          }
        }

        if (!simpleWallet) {
          return new Error();
        }

        this.setWallet(simpleWallet);
        this.isSettingUpWallet.next(WALLET_SETUP_STATUS.Initialized);
        this.isSettingUpWallet.complete();
        return simpleWallet;
      }
    );
  }

  public getWalletSetupStatus(): Observable<WALLET_SETUP_STATUS> {
    return this.isSettingUpWallet.asObservable();
  }

  // todo: already being refactored into another service
  public getUserToken(): string | void {
    if (this.isPlatformBrowser) {
      return this.localStorage.getItem('HC_USER_TOKEN');
    }
  }

  public getWalletMnemonic(): string | void {
    if (this.isPlatformBrowser) {
      return this.localStorage.getItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC);
    }
  }

  public setWallet(wallet: ISimpleBitcoinWallet | Wallet): Observable<OkResponse> {
    if (this.isPlatformBrowser) {
      this.localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, wallet.mnemonic);
    }
    return this.http.post<OkResponse>(API_ENDPOINTS.setWallet, {mnemonicEncrypted: wallet.mnemonicEncrypted});
  }

  public unsetWallet(): void {
    if (this.isPlatformBrowser) {
      this.localStorage.removeItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC);
    }
  }
}
