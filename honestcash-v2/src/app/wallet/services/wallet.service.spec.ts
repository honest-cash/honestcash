import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {mock} from '../../../../mock';
import {simpleBitcoinWalletAssetPath, WALLET_LOCALSTORAGE_KEYS, WalletService} from './wallet.service';
import {LoginSuccessResponse} from '../../auth/models/authentication';
import {localStorageProvider, LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import User from '../../user/models/user';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../app.states.mock';
import {ISimpleWallet, SimpleWallet} from '../models/simple-wallet';
import {LOCAL_TOKEN_KEY} from '../../user/services/user.service';
import {ScriptService} from 'ngx-script-loader';
import {Observable, of} from 'rxjs';
import {AppStates} from '../../app.states';
import {Store} from '@ngrx/store';
import {WalletBalanceUpdated, WalletStatusUpdated} from '../store/wallet.actions';
import {WALLET_STATUS} from '../models/status';
import {sha3_512} from 'js-sha3';
import {HttpService} from '../../../core/http/http.service';
import {CoinbaseExchangeResponse, CurrencyService} from './currency.service';

const SHARED_MOCKS = {
  mnemonic: 'test1 test2 test3 test4 test5 test6 test7 test8',
  password: '12345abc',
  // this is encrypted with the above mnemonic and password
  // with CryptoJS AES encryption
  // in order to test simpleWallets match the one the service returns
  mnemonicEncrypted: 'U2FsdGVkX19s2+ZuTD0IAQ8Asf/ShwBsLHkMzXzHOvh3sgggyfR8KpIPv9OcET65wnzjMv85LiUjYZoh4859hQ==',
};


describe('WalletService', () => {
  let walletService: WalletService;
  let mockHttpService: HttpService;
  let scriptService: ScriptService;
  let currencyService: CurrencyService;
  let store: MockStore<AppStates>;

  beforeEach(() => {
    mockHttpService = mock(HttpService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        WalletService,
        ScriptService,
        CurrencyService,
        {provide: HttpService, useValue: mockHttpService},
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        provideMockStore({initialState: initialAppStates})
      ]
    });
    walletService = TestBed.get(WalletService);
    scriptService = TestBed.get(ScriptService);
    currencyService = TestBed.get(CurrencyService);
    store = TestBed.get(Store);
  });

  afterEach(() => {
    // Cleanup
    localStorage.removeItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC);
  });

  describe('instance', () => {
    it('should have been initialized', () => {
      expect(walletService).toBeDefined();
    });
  });

  describe('static functions', () => {
    describe('calculateSHA3Hash should', () => {
      it('call sha3_512 with the message and return hashed string', () => {
        const message = 'test';
        const hashedMessage = WalletService.calculateSHA3Hash(message);
        const expectedHashedMessage = sha3_512(message);
        expect(hashedMessage).toEqual(expectedHashedMessage);
      });
    });

    describe('determineMessageForHashing should', () => {
      it('return a string with salt and password', () => {
        const salt = '123';
        const password = '456';
        const determinedMessage = WalletService.determineMessageForHashing(salt, password);
        expect(determinedMessage).toEqual(`${salt}:${password}`);
      });
    });

    describe('calculatePasswordHash should', () => {
      it('return a salted password', () => {
        const email = 'asdfasdf@asdf.com';
        const password = 'test123';

        const expectedResult = WalletService.calculateSHA3Hash(WalletService.determineMessageForHashing(email, password));
        const hashedResult = WalletService.calculatePasswordHash(email, password);
        expect(hashedResult).toEqual(expectedResult);
      });
    });
  });

  describe('non-static functions', () => {

    describe('updateWalletBalance should', () => {
      const bchBalance = 0.00005;
      const dollarBalance = 1; // not real value

      it('call wallet.getWalletInfo() if there is a wallet', () => {
        walletService.wallet = new SimpleWallet();
        const getWalletInfoSpy = spyOn(walletService.wallet, 'getWalletInfo').and.callFake(() => {
          return new Promise((resolve: any) => {
            return resolve({
              balance: bchBalance
            });
          });
        });
        walletService.updateWalletBalance();
        expect(getWalletInfoSpy).toHaveBeenCalled();
      });
      it('call convertCurrency after it gets response from wallet.getWalletInfo if there is a wallet', (done) => {
        const convertCurrencySpy = spyOn(currencyService, 'convertCurrency').and.callFake(() => {
          return of(dollarBalance);
        });
        walletService.wallet = new SimpleWallet();
        spyOn(walletService.wallet, 'getWalletInfo').and.callFake(() => {
          return new Promise((resolve: any) => {
            return resolve({
              balance: bchBalance
            });
          });
        });
        walletService.updateWalletBalance();
        walletService.wallet.getWalletInfo().then(res => {
          expect(convertCurrencySpy).toHaveBeenCalledWith(bchBalance, 'bch', 'usd');
          done();
        });
      });
      it('call store.dispatch after it gets response from wallet.getWalletInfo and convertCurrency if there is a wallet', (done) => {
        spyOn(currencyService, 'convertCurrency').and.callFake(() => {
          return of(dollarBalance);
        });
        const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
        walletService.wallet = new SimpleWallet();
        spyOn(walletService.wallet, 'getWalletInfo').and.callFake(() => {
          return new Promise((resolve: any) => {
            return resolve({
              balance: bchBalance
            });
          });
        });
        walletService.updateWalletBalance();
        walletService.wallet.getWalletInfo().then(res => {
          expect(dispatchSpy).toHaveBeenCalledWith(new WalletBalanceUpdated(dollarBalance));
          done();
        });
      });
    });

    describe('createWallet should', () => {
      it('return a wallet when mnemonicEncrypted and password is provided', (done) => {
        scriptService.loadScript(simpleBitcoinWalletAssetPath).subscribe(() => {
          const wallet = walletService.createWallet(undefined, 'asdfasdf', 'asdfasdf');
          expect(wallet).toBeDefined();
          done();
        });
      });
      it('return a wallet when mnemonic is provided', (done) => {
        scriptService.loadScript(simpleBitcoinWalletAssetPath).subscribe(() => {
          const wallet = walletService.createWallet('asdfasdf');
          expect(wallet).toBeDefined();
          done();
        });
      });
      it('return a wallet when password', (done) => {
        scriptService.loadScript(simpleBitcoinWalletAssetPath).subscribe(() => {
          const wallet = walletService.createWallet(undefined, undefined, 'asdfasdf');
          expect(wallet).toBeDefined();
          done();
        });
      });
      it('NOT return a wallet when nothing is provided', (done) => {
        scriptService.loadScript(simpleBitcoinWalletAssetPath).subscribe(() => {
          const wallet = walletService.createWallet();
          expect(wallet).toBeUndefined();
          done();
        });
      });
    });

    describe('encryptMnemonic should', () => {
      it('call SimpleWallet.decrypt with correct arguments', (done) => {
        scriptService.loadScript(simpleBitcoinWalletAssetPath).subscribe(() => {
          const decryptedMnemonic = walletService.encryptMnemonic('mnemonicEncrypted', 'password');
          expect(decryptedMnemonic).toBeDefined();
          done();
        });
      });
    });

    describe('decryptMnemonic should', () => {
      it('call SimpleWallet.decrypt with correct arguments', (done) => {
        scriptService.loadScript(simpleBitcoinWalletAssetPath).subscribe(() => {
          const decryptedMnemonic = walletService.decryptMnemonic('mnemonicEncrypted', 'password');
          expect(decryptedMnemonic).toBeDefined();
          done();
        });
      });
    });

    describe('loadWallet should', () => {
      const mocks = {
        setupWalletContext: {
          user: new User(),
          wallet: new SimpleWallet(),
          token: 'adf',
          password: SHARED_MOCKS.password,
        },
        setupWalletSuccess: {
          ok: true
        },
      };

      it('should call cacheExchangeRates', (done) => {
        const coinbaseResultMock: CoinbaseExchangeResponse = {
          data: {
            currency: 'BCH',
            rates: {
              'USD': 1.4
            }
          }
        };
        (<jasmine.Spy>mockHttpService.get).and.returnValue(of(coinbaseResultMock));
        const cacheExchangeRatesSpy = spyOn(currencyService, 'cacheExchangeRates').and.callThrough();
        // Act
        walletService.loadWallet().subscribe((wallet: ISimpleWallet | Observable<any>) => {
          expect(cacheExchangeRatesSpy).toHaveBeenCalled();
          done();
        });
      });

      it('return a SimpleBitcoinWallet if there is a payload and payload is a LoginSuccessResponse WITH wallet', (done) => {
        const coinbaseResultMock: CoinbaseExchangeResponse = {
          data: {
            currency: 'BCH',
            rates: {
              'USD': 1.4
            }
          }
        };
        (<jasmine.Spy>mockHttpService.get).and.returnValue(of(coinbaseResultMock));
        (<jasmine.Spy>mockHttpService.post).and.returnValue(of());
        const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
        const loginSuccessResponse: LoginSuccessResponse = {
          user: mocks.setupWalletContext.user,
          wallet: mocks.setupWalletContext.wallet,
          token: mocks.setupWalletContext.token,
          password: mocks.setupWalletContext.password,
        };
        loginSuccessResponse.wallet.mnemonic = SHARED_MOCKS.mnemonic;
        loginSuccessResponse.wallet.mnemonicEncrypted = SHARED_MOCKS.mnemonicEncrypted;

        // Act
        walletService.loadWallet(loginSuccessResponse).subscribe((wallet: ISimpleWallet) => {
          // Assert
          expect(wallet).toBeDefined();
          expect(dispatchSpy).toHaveBeenCalledWith(new WalletStatusUpdated(WALLET_STATUS.Loaded));
          done();
        });
      });

      it('return a SimpleBitcoinWallet if there is a payload and payload is a LoginSuccessResponse WITHOUT wallet but mnemonic exists in localStorage', (done) => {
        const coinbaseResultMock: CoinbaseExchangeResponse = {
          data: {
            currency: 'BCH',
            rates: {
              'USD': 1.4
            }
          }
        };
        (<jasmine.Spy>mockHttpService.get).and.returnValue(of(coinbaseResultMock));
        (<jasmine.Spy>mockHttpService.post).and.returnValue(of());
        const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
        const loginSuccessResponse: LoginSuccessResponse = {
          user: mocks.setupWalletContext.user,
          token: mocks.setupWalletContext.token,
          password: mocks.setupWalletContext.password,
          wallet: undefined
        };

        localStorage.setItem(LOCAL_TOKEN_KEY, mocks.setupWalletContext.token);
        localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, SHARED_MOCKS.mnemonic);

        // Act
        walletService.loadWallet(loginSuccessResponse).subscribe((wallet: ISimpleWallet) => {
          // Assert
          expect(wallet).toBeDefined();
          expect(dispatchSpy).toHaveBeenCalledWith(new WalletStatusUpdated(WALLET_STATUS.Loaded));
          done();
        });
      });

      it('return a SimpleBitcoinWallet if there is a payload and payload is a LoginSuccessResponse WITHOUT wallet and mnemonic DOES NOT in localStorage', (done) => {
        const coinbaseResultMock: CoinbaseExchangeResponse = {
          data: {
            currency: 'BCH',
            rates: {
              'USD': 1.4
            }
          }
        };
        (<jasmine.Spy>mockHttpService.get).and.returnValue(of(coinbaseResultMock));
        (<jasmine.Spy>mockHttpService.post).and.returnValue(of());
        const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
        const loginSuccessResponse: LoginSuccessResponse = {
          user: mocks.setupWalletContext.user,
          token: mocks.setupWalletContext.token,
          password: mocks.setupWalletContext.password,
          wallet: undefined
        };

        // Act
        walletService.loadWallet(loginSuccessResponse).subscribe((wallet: ISimpleWallet) => {
          // Assert
          expect(wallet).toBeDefined();
          expect(dispatchSpy).toHaveBeenCalledWith(new WalletStatusUpdated(WALLET_STATUS.Loaded));
          done();
        });
      });

      it('return a SimpleBitcoinWallet if there is NO payload but a token and decrypted mnemonic exists in localStorage', (done) => {
        const coinbaseResultMock: CoinbaseExchangeResponse = {
          data: {
            currency: 'BCH',
            rates: {
              'USD': 1.4
            }
          }
        };
        (<jasmine.Spy>mockHttpService.get).and.returnValue(of(coinbaseResultMock));
        const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
        localStorage.setItem(LOCAL_TOKEN_KEY, mocks.setupWalletContext.token);
        localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, SHARED_MOCKS.mnemonic);
        // Act
        walletService.loadWallet().subscribe((wallet: ISimpleWallet) => {
          // Assert
          expect(wallet).toBeDefined();
          expect(dispatchSpy).toHaveBeenCalledWith(new WalletStatusUpdated(WALLET_STATUS.Loaded));
          done();
        });
      });

      it('NOT return a SimpleBitcoinWallet if there is NO payload and NO token and ' +
        'NO decrypted mnemonic exists in localStorage', (done) => {
        const coinbaseResultMock: CoinbaseExchangeResponse = {
          data: {
            currency: 'BCH',
            rates: {
              'USD': 1.4
            }
          }
        };
        (<jasmine.Spy>mockHttpService.get).and.returnValue(of(coinbaseResultMock));
        const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
        // Act
        walletService.loadWallet().subscribe((wallet: ISimpleWallet | Observable<any>) => {
          // Assert
          expect(wallet).toBeUndefined();
          expect(dispatchSpy).toHaveBeenCalledWith(new WalletStatusUpdated(WALLET_STATUS.Errored));
          done();
        });
      });
    });

    describe('setWallet', () => {
      const mocks = {
        setWalletContext: {
          wallet: new SimpleWallet,
        },
        setWalletSuccess: {
          ok: true
        },
      };
      it('should set the mnemonic in localStorage with correct key', () => {
        mocks.setWalletContext.wallet.mnemonic = 'asdf asdf asdf asdf';
        // Act
        walletService.setWallet(mocks.setWalletContext.wallet);
        // Assert
        expect(localStorage.getItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC)).toEqual(mocks.setWalletContext.wallet.mnemonic);
      });
      /*it('should make a request to API to set wallet with mnemonicEncrypted', (done) => {
        mocks.setWalletContext.wallet.mnemonicEncrypted = 'asdfasdfasdfasdf';
        (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.setWalletSuccess));
        // Act
        walletService.setWallet(
          mocks.setWalletContext.wallet
        ).subscribe((response: OkResponse) => {
          // Assert
          expect(mockHttpService.post)
          .toHaveBeenCalledWith(API_ENDPOINTS.setWallet, {mnemonicEncrypted: mocks.setWalletContext.wallet.mnemonicEncrypted});
          done();
        });
      });*/
    });

    describe('unsetWallet', () => {
      it('should unset the mnemonic in localStorage', () => {
        // Act
        localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, SHARED_MOCKS.mnemonic);
        walletService.unsetWallet();
        // Assert
        expect(localStorage.getItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC)).toBeNull();
      });
    });

    describe('getWalletMnemonic', () => {
      it('should get the mnemonic', () => {
        const wallet = new SimpleWallet();
        wallet.mnemonic = 'asdf';
        // Act
        walletService.setWallet(wallet);
        // Assert
        expect(walletService.getWalletMnemonic()).toEqual(wallet.mnemonic);
      });
    });

  });
});
