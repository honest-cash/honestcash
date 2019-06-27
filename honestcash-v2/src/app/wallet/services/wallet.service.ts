import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {LoginSuccessResponse, OkResponse, SignupSuccessResponse} from '../../auth/models/authentication';
import {Logger} from '../../../core/shared/services/logger.service';
import {AsyncSubject, defer, Observable, of, Subject, throwError} from 'rxjs';
import {HttpService} from '../../../core';
import {LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import {sha3_512} from 'js-sha3';
import {ISimpleWallet} from '../models/simple-wallet';
import {ScriptService} from 'ngx-script-loader';

export const API_ENDPOINTS = {
  setWallet: `/auth/set-wallet`,
};

export const WALLET_LOCALSTORAGE_KEYS = {
  HD_PATH: 'HC_BCH_HD_PATH',
  MNEMONIC: 'HC_BCH_MNEMONIC',
  PRIVATE_KEY: 'HC_BCH_PRIVATE_KEY'
};

export const WALLET_DEFAULT_HD_PATH = `m/44'/0'/0'/0/0`;

const simpleBitcoinWalletAssetPath = 'assets/libs/simple-bitcoin-wallet.min.js';

export enum WALLET_SETUP_STATUS {
  NotInitialized = 'NOT_INITIALIZED',
  Loaded = 'LOADED',
  Errored = 'ERRORED',
  Started = 'STARTED',
  Initialized = 'INITIALIZED',
}

declare var SimpleWallet: any;

@Injectable({providedIn: 'root'})
export class WalletService {
  public wallet: ISimpleWallet;
  public isSettingUpWallet: Subject<WALLET_SETUP_STATUS> = new AsyncSubject<WALLET_SETUP_STATUS>();
  private logger: Logger;
  private readonly isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private http: HttpService,
    private scriptService: ScriptService,
  ) {
    this.logger = new Logger('WalletService');
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    this.isSettingUpWallet.next(WALLET_SETUP_STATUS.NotInitialized);
  }

  public createWallet(password: string): ISimpleWallet {
    return new SimpleWallet(null, {password});
  }

  public encrypt(mnemonic: string, password: string): string {
    return SimpleWallet.encrypt(mnemonic, password);
  }

  public decrypt(mnemonicEncrypted: string, password: string): string {
    return SimpleWallet.decrypt(mnemonicEncrypted, password);
  }

  public loadWalletWithEncryptedRecoveryPhrase(
    encryptedRecoveryPhrase: string,
    password: string
  ): ISimpleWallet {
    return new SimpleWallet(encryptedRecoveryPhrase, {password});
  }

  public loadWalletWithDecryptedRecoveryPhrase(
    recoveryPhrase: string,
  ): ISimpleWallet {
    return new SimpleWallet(recoveryPhrase, {password: null});
  }

  public calculateSHA3Hash = (message: string): string => {
    return sha3_512(message);
  };

  public determineMessageForHashing = (salt: string, password: string): string => {
    return `${salt}:${password}`;
  };

  public calculatePasswordHash = (email: string, password: string): string => {
    return this.calculateSHA3Hash(
      this.determineMessageForHashing(email, password)
    );
  };

  public loadWallet(payload?: LoginSuccessResponse): Observable<ISimpleWallet | WALLET_SETUP_STATUS> {
    return defer(
      async () => {
        this.isSettingUpWallet.next(WALLET_SETUP_STATUS.Started);
        await this.scriptService.loadScript(simpleBitcoinWalletAssetPath).toPromise();
        let simpleWallet: ISimpleWallet;
        if (payload) {
          if ((<LoginSuccessResponse>payload).wallet && (<LoginSuccessResponse>payload).wallet.mnemonicEncrypted) {
            // if there is a payload and a wallet attached
            // it means it is a login action
            this.logger.info('Setting up an already existing wallet from payload');
            simpleWallet = this.loadWalletWithEncryptedRecoveryPhrase(
              (<LoginSuccessResponse>payload).wallet.mnemonicEncrypted,
              payload.password
            );
          } else {
            // if there is a payload but NO wallet attached
            // it means it is a signup action with only the password
            this.logger.info('Creating new wallet.');
            simpleWallet = this.createWallet(payload.password);
          }
        } else {
          if (this.getWalletMnemonic()) {
            // if there is no payload
            // but there is a decrypted mnemonic and a token in the localstorage
            // it means the app loads wallet from localStorage
            this.logger.info('Setting up an already existing wallet from local storage');
            simpleWallet = this.loadWalletWithDecryptedRecoveryPhrase(<string>this.getWalletMnemonic());
          }
        }

        if (!simpleWallet) {
          throwError(WALLET_SETUP_STATUS.Errored);
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

  public getWalletMnemonic(): string | void {
    if (this.isPlatformBrowser) {
      return this.localStorage.getItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC);
    }
  }

  public setWallet(wallet: ISimpleWallet): Observable<OkResponse> {
    if (this.isPlatformBrowser) {
      this.localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, wallet.mnemonic);
    }
    this.wallet = wallet;
    return this.http.post<OkResponse>(API_ENDPOINTS.setWallet, wallet.mnemonicEncrypted);
  }

  public unsetWallet(): void {
    if (this.isPlatformBrowser) {
      this.localStorage.removeItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC);
    }
  }
}
