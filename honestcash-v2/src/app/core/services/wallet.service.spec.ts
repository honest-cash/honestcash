import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpService} from '..';
import {mock} from '../../../../mock';
import {API_ENDPOINTS, WALLET_LOCALSTORAGE_KEYS, WalletService} from './wallet.service';
import Wallet from '../models/wallet';
import {of} from 'rxjs';
import {OkResponse} from '../models/authentication';

const SHARED_MOCKS = {
  mnemonic: 'test test2 test3 test4',
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
        {provide: HttpService, useValue: mockHttpService}
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

  describe('setWallet', () => {
    const mocks = {
      setWalletContext: {
        wallet: new Wallet(),
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
      expect(localStorage.getItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC)).toEqual(SHARED_MOCKS.mnemonic);
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
      // Act
      walletService.setWallet(SHARED_MOCKS.mnemonic);
      // Assert
      expect(walletService.getWalletMnemonic()).toEqual(SHARED_MOCKS.mnemonic);
    });
  });

});
