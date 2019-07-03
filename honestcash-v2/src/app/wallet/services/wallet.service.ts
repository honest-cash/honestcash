import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {LoginSuccessResponse} from '../../auth/models/authentication';
import {Logger} from '../../../core/shared/services/logger.service';
import {defer, Observable} from 'rxjs';
import {LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import {sha3_512} from 'js-sha3';
import {ISimpleWallet} from '../models/simple-wallet';
import {ScriptService} from 'ngx-script-loader';
import {WalletBalanceUpdated, WalletStatusUpdated} from '../store/wallet.actions';
import {AppStates, selectWalletState} from '../../app.states';
import {Store} from '@ngrx/store';
import {WalletState} from '../store/wallet.state';
import {WALLET_STATUS} from '../models/status';
import {HttpService} from '../../../core/http/http.service';
import {CurrencyService} from './currency.service';
import {WalletModule} from '../wallet.module';

export const API_ENDPOINTS = {
  setWallet: `/auth/set-wallet`,
};

export const WALLET_LOCALSTORAGE_KEYS = {
  HD_PATH: 'HC_BCH_HD_PATH',
  MNEMONIC: 'HC_BCH_MNEMONIC',
  PRIVATE_KEY: 'HC_BCH_PRIVATE_KEY'
};

export const WALLET_DEFAULT_HD_PATH = `m/44'/0'/0'/0/0`;

export const simpleBitcoinWalletAssetPath = 'assets/libs/simple-bitcoin-wallet.min.js';

declare var SimpleWallet: any;

@Injectable()
export class WalletService {
  public wallet: ISimpleWallet;
  private logger: Logger;
  private readonly isPlatformBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private http: HttpService,
    private store: Store<AppStates>,
    private scriptService: ScriptService,
    private currencyService: CurrencyService,
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

  public updateWalletBalance() {
    if (this.wallet) {
      this.wallet.getWalletInfo().then(res => {
        this.currencyService.convertCurrency(res.balance, 'bch', 'usd').subscribe((balance: number) => {
          this.store.dispatch(new WalletBalanceUpdated(balance));
        });
      });
    }
  }

  public createWallet(mnemonic?: string, mnemonicEncrypted?: string, password?: string): ISimpleWallet {
    if (mnemonicEncrypted && password) {
      return new SimpleWallet(mnemonicEncrypted, {password});
    }
    if (mnemonic && !password) {
      return new SimpleWallet(mnemonic, {password: null});
    }

    if (!mnemonic && password) {
      return new SimpleWallet(null, {password});
    }
  }

  public encryptMnemonic(mnemonic: string, password: string): string {
    return SimpleWallet.encrypt(mnemonic, password);
  }

  public decryptMnemonic(mnemonicEncrypted: string, password: string): string {
    return SimpleWallet.decrypt(mnemonicEncrypted, password);
  }

  public loadWallet(payload?: LoginSuccessResponse): Observable<ISimpleWallet | undefined> {
    return defer(
      async () => {
        await this.currencyService.cacheExchangeRates();
        this.store.dispatch(new WalletStatusUpdated(WALLET_STATUS.Started));
        await this.scriptService.loadScript(simpleBitcoinWalletAssetPath).toPromise();
        this.store.dispatch(new WalletStatusUpdated(WALLET_STATUS.Initialized));
        let simpleWallet: ISimpleWallet;

        if (payload) {
          if ((<LoginSuccessResponse>payload).wallet && (<LoginSuccessResponse>payload).wallet.mnemonicEncrypted) {
            // if there is a payload and a wallet attached
            // it means it is a login action
            this.logger.info('Setting up an already existing wallet from payload');
            simpleWallet = this.createWallet(
              undefined,
              (<LoginSuccessResponse>payload).wallet.mnemonicEncrypted,
              payload.password
            );
            simpleWallet.mnemonicEncrypted = this.encryptMnemonic(payload.wallet.mnemonic, payload.password);
            this.http.post(API_ENDPOINTS.setWallet, {mnemonicEncrypted: simpleWallet.mnemonicEncrypted});
          }
        } else {
          if (this.getWalletMnemonic()) {
            // if there is no payload
            // but there is a decrypted mnemonic and a token in the localstorage
            // it means the app loads wallet from localStorage
            this.logger.info('Setting up an already existing wallet from local storage');
            simpleWallet = this.createWallet(<string>this.getWalletMnemonic());
          }
        }

        if (!simpleWallet) {
          this.store.dispatch(new WalletStatusUpdated(WALLET_STATUS.Errored));
        } else {
          this.store.dispatch(new WalletStatusUpdated(WALLET_STATUS.Loaded));
        }
        return simpleWallet;
      }
    );
  }

  public getWalletMnemonic(): string | undefined {
    if (this.isPlatformBrowser) {
      const mnemonic = this.localStorage.getItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC);
      return mnemonic ? mnemonic : undefined;
    }
  }

  public setWallet(wallet: ISimpleWallet) {
    if (this.isPlatformBrowser && wallet && wallet.mnemonic) {
      this.localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, wallet.mnemonic);
    }
  }

  public unsetWallet(): void {
    if (this.isPlatformBrowser) {
      this.localStorage.removeItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC);
    }
  }
}
