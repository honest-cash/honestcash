import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {LoginSuccessResponse} from '../../auth/models/authentication';
import {Logger} from '../../../core/shared/services/logger.service';
import {AsyncSubject, defer, forkJoin, Observable, Subject, throwError} from 'rxjs';
import {HttpService} from '../../../core';
import {LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import {sha3_512} from 'js-sha3';
import {ISimpleWallet} from '../models/simple-wallet';
import {ScriptService} from 'ngx-script-loader';
import {map} from 'rxjs/operators';
import {WalletBalanceUpdated, WalletStatusUpdated} from '../store/wallet.actions';
import {AppStates} from '../../app.states';
import {Store} from '@ngrx/store';

interface CoinbaseExchangeResponse {
  data: {
    currency: string;
    rates: any;
  };
}


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
  Generated = 'GENERATED',
}

declare var SimpleWallet: any;

@Injectable({providedIn: 'root'})
export class WalletService {
  public wallet: ISimpleWallet;
  public isSettingUpWallet: Subject<WALLET_SETUP_STATUS> = new AsyncSubject<WALLET_SETUP_STATUS>();
  private logger: Logger;
  private readonly isPlatformBrowser: boolean;
  private mnemonicEncrypted: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private http: HttpService,
    private store: Store<AppStates>,
    private scriptService: ScriptService,
  ) {
    this.logger = new Logger('WalletService');
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    this.isSettingUpWallet.next(WALLET_SETUP_STATUS.NotInitialized);
  }

  public static calculateSHA3Hash(message: string): string {
    return sha3_512(message);
  }

  public static determineMessageForHashing(salt: string, password: string): string {
    return `${salt}:${password}`;
  }

  public static calculatePasswordHash(email: string, password: string): string {
    return WalletService.calculateSHA3Hash(
      WalletService.determineMessageForHashing(email, password)
    );
  }

  public convertCurrency(amount: number, sourceCurrency: string, targetCurrency: string) {
    return this.http.get(`https://api.coinbase.com/v2/exchange-rates?currency=${sourceCurrency.toUpperCase()}`)
      .pipe(
        map((response: CoinbaseExchangeResponse) => {
          const rate = response.data.rates[targetCurrency.toUpperCase()];
          return Number((Number(rate) * Number(amount)).toFixed(2));
        })
      );
  }

  public updateWalletBalance() {
    this.wallet.getWalletInfo().then(res => {
      this.convertCurrency(res.balance, 'bch', 'usd').subscribe((balance: number) => {
        this.store.dispatch(new WalletBalanceUpdated(balance));
      });
    });
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

  public loadWallet(payload?: LoginSuccessResponse): Observable<ISimpleWallet> {
    return defer(
      async () => {
        this.store.dispatch(new WalletStatusUpdated(WALLET_SETUP_STATUS.Started));
        await this.scriptService.loadScript(simpleBitcoinWalletAssetPath).toPromise();
        this.store.dispatch(new WalletStatusUpdated(WALLET_SETUP_STATUS.Initialized));
        let simpleWallet: ISimpleWallet;
        let shouldMakeRequest = false;
        if (payload) {
          if ((<LoginSuccessResponse>payload).wallet && (<LoginSuccessResponse>payload).wallet.mnemonicEncrypted) {
            // if there is a payload and a wallet attached
            // it means it is a login action
            this.logger.info('Setting up an already existing wallet from payload');
            simpleWallet = this.loadWalletWithEncryptedRecoveryPhrase(
              (<LoginSuccessResponse>payload).wallet.mnemonicEncrypted,
              payload.password
            );
            simpleWallet.mnemonicEncrypted = this.encrypt(payload.wallet.mnemonic, payload.password);
            shouldMakeRequest = true;
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
          this.store.dispatch(new WalletStatusUpdated(WALLET_SETUP_STATUS.Errored));
          throwError(WALLET_SETUP_STATUS.Errored);
        }

        const balance = (await simpleWallet.getWalletInfo()).balance;
        await this.setWallet(simpleWallet, balance, shouldMakeRequest);
        this.store.dispatch(new WalletStatusUpdated(WALLET_SETUP_STATUS.Loaded));
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

  public setWallet(wallet: ISimpleWallet, balance: number, shouldMakeRequest: boolean) {
    const requests: any = [
      this.convertCurrency(balance, 'bch', 'usd')
    ];

    if (shouldMakeRequest) {
      requests.push(this.http.post(API_ENDPOINTS.setWallet, {mnemonicEncrypted: wallet.mnemonicEncrypted}));
    }
    return forkJoin(
      ...requests
    ).subscribe(() => {
      if (this.isPlatformBrowser) {
        this.localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, wallet.mnemonic);
      }
      this.wallet = wallet;
      this.mnemonicEncrypted = wallet.mnemonicEncrypted;
      this.store.dispatch(new WalletBalanceUpdated(balance));
    });
  }

  public unsetWallet(): void {
    if (this.isPlatformBrowser) {
      this.localStorage.removeItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC);
    }
  }
}
