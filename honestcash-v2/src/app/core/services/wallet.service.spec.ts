import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpService} from '..';
import {mock} from '../../../../mock';
import {WALLET_LOCALSTORAGE_KEYS, WalletService} from './wallet.service';

const SHARED_MOCKS = {
  mnemonic: 'test test2 test3 test4',
};

describe('WalletService', () => {
  let walletService: WalletService;
  let httpServiceMock: HttpService;

  beforeEach(() => {
    httpServiceMock = mock(HttpService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        WalletService,
        {provide: HttpService, useValue: httpServiceMock}
      ]
    });
    walletService = TestBed.get(WalletService);
  });

  afterEach(() => {
    // Cleanup
  });

  describe('instance', () => {
    it('should have been initialized', () => {
      expect(walletService).toBeDefined();
    });
  });

  describe('setWallet', () => {
    it('should set the mnemonic in localStorage with correct key', () => {
      // Act
      walletService.setWallet(SHARED_MOCKS.mnemonic);
      // Assert
      expect(localStorage.getItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC)).toEqual(SHARED_MOCKS.mnemonic);
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
