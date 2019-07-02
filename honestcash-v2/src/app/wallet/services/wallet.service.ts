import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {LoginSuccessResponse} from '../../auth/models/authentication';
import {Logger} from '../../../core/shared/services/logger.service';
import {AsyncSubject, defer, forkJoin, Observable, of, Subject, throwError} from 'rxjs';
import {HttpService} from '../../../core';
import {LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import {sha3_512} from 'js-sha3';
import {ISimpleWallet} from '../models/simple-wallet';
import {ScriptService} from 'ngx-script-loader';
import {map} from 'rxjs/operators';
import {WalletBalanceUpdated, WalletStatusUpdated} from '../store/wallet.actions';
import {AppStates, selectWalletState} from '../../app.states';
import {Store} from '@ngrx/store';
import {WalletState} from '../store/wallet.state';
import {WALLET_STATUS} from '../models/status';

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

declare var SimpleWallet: any;

@Injectable({providedIn: 'root'})
export class WalletService {
  public wallet: ISimpleWallet;
  private exchangeRateCache: CoinbaseExchangeResponse;
  private logger: Logger;
  private readonly isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private http: HttpService,
    private store: Store<AppStates>,
    private scriptService: ScriptService,
  ) {
    this.logger = new Logger('WalletService');
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    this.store.select(selectWalletState).subscribe((walletState: WalletState) => {
      this.wallet = walletState.wallet;
    });
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

  public async cacheExchangeRates() {
    const response: CoinbaseExchangeResponse = await this.http.get<CoinbaseExchangeResponse>(`https://api.coinbase.com/v2/exchange-rates?currency=USD`)
      .toPromise();
    this.exchangeRateCache = response;
    console.log('response1');
  }

  public convertCurrency(amount: number, sourceCurrency: string, targetCurrency: string): Observable<number> {
    console.log('response2');
    return of(this.calculateRate(amount, this.exchangeRateCache.data.rates, targetCurrency));
  }

  public calculateRate(amount: number, rates: number[], targetCurrency: string): number {
    const rate = rates[targetCurrency.toUpperCase()];
    return Number(Number((Number(rate) * Number(amount))));
  }

  public updateWalletBalance() {
    if (this.wallet) {
      this.wallet.getWalletInfo().then(res => {
        this.convertCurrency(res.balance, 'bch', 'usd').subscribe((balance: number) => {
          this.store.dispatch(new WalletBalanceUpdated(balance));
        });
      });
    }
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

  public loadWallet(payload?: LoginSuccessResponse): Observable<ISimpleWallet> {
    return defer(
      async () => {
        await this.cacheExchangeRates();
        console.log('response3');
        this.store.dispatch(new WalletStatusUpdated(WALLET_STATUS.Started));
        await this.scriptService.loadScript(simpleBitcoinWalletAssetPath).toPromise();
        this.store.dispatch(new WalletStatusUpdated(WALLET_STATUS.Initialized));
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
            simpleWallet.mnemonicEncrypted = this.encrypt(payload.wallet.mnemonic, payload.password);
            this.http.post(API_ENDPOINTS.setWallet, {mnemonicEncrypted: simpleWallet.mnemonicEncrypted});
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
          this.store.dispatch(new WalletStatusUpdated(WALLET_STATUS.Errored));
          throwError(WALLET_STATUS.Errored);
        }

        this.store.dispatch(new WalletStatusUpdated(WALLET_STATUS.Loaded));
        return simpleWallet;
      }
    );
  }

  public getWalletMnemonic(): string | void {
    if (this.isPlatformBrowser) {
      return this.localStorage.getItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC);
    }
  }

  public setWallet(wallet: ISimpleWallet) {
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
