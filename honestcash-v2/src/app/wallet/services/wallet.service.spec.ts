import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpService} from '../../../core';
import {mock} from '../../../../mock';
import {API_ENDPOINTS, WALLET_LOCALSTORAGE_KEYS, WALLET_SETUP_STATUS, WalletService} from './wallet.service';
import {of} from 'rxjs';
import {LoginSuccessResponse, OkResponse} from '../../auth/models/authentication';
import {localStorageProvider, LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import User from '../../user/models/user';
import {LOCAL_TOKEN_KEY} from '../../auth/services/auth.service';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../app.states.mock';
import {ISimpleWallet, SimpleWallet} from '../models/simple-wallet';

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

  beforeEach(() => {
    mockHttpService = mock(HttpService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        WalletService,
        {provide: HttpService, useValue: mockHttpService},
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        provideMockStore({initialState: initialAppStates})
      ]
    });
    walletService = TestBed.get(WalletService);
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

  describe('loadWallet', () => {
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
    it('should return a SimpleBitcoinWallet if there is a payload and payload is a LoginSuccessResponse', (done) => {
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
        done();
      });
    });

    it('should return a SimpleBitcoinWallet if there is NO payload but a token and decrypted mnemonic exists in localStorage', (done) => {
      localStorage.setItem(LOCAL_TOKEN_KEY, mocks.setupWalletContext.token);
      localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, SHARED_MOCKS.mnemonic);
      // Act
      walletService.loadWallet().subscribe((wallet: ISimpleWallet) => {
        // Assert
        expect(wallet).toBeDefined();
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
    it('should make a request to API to set wallet with mnemonicEncrypted', (done) => {
      mocks.setWalletContext.wallet.mnemonicEncrypted = 'asdfasdfasdfasdf';
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.setWalletSuccess));
      // Act
      walletService.setWallet(
        mocks.setWalletContext.wallet
      ).subscribe((response: OkResponse) => {
        // Assert
        expect(mockHttpService.post)
        .toHaveBeenCalledWith(API_ENDPOINTS.setWallet, mocks.setWalletContext.wallet.mnemonicEncrypted);
        done();
      });
    });
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
