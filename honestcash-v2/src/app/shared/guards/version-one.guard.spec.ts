import {TestBed} from '@angular/core/testing';
import {Router, RouterStateSnapshot} from '@angular/router';

import {AuthService, LOCAL_TOKEN_KEY} from '../services/auth.service';
import {VersionOneGuard} from './version-one.guard';
import {localStorageProvider, LocalStorageToken} from '../../core/helpers/localStorage';
import {HttpService} from '../../core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {mock} from '../../../../mock';
import {WALLET_LOCALSTORAGE_KEYS, WALLET_SETUP_STATUS, WalletService} from '../services/wallet.service';
import {WindowToken} from '../../core/helpers/window';
import {environmentProvider, EnvironmentToken} from '../../core/helpers/environment';
import {resetEnvironment, resetLocalStorage} from '../../core/helpers/tests';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../mocks/app.states.mock';
import {Environment} from '../../../environments/environment';

const MockWindow = {
  location: {
    href: '',
  }
};

describe('VersionOneGuard', () => {
  let versionOneGuard: VersionOneGuard;
  let walletService: WalletService;
  let guardWindow: Window;
  let guardEnvironment: Environment;
  let mockHttpService: HttpService;
  let mockRouter: any;
  let mockSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    mockRouter = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
    mockHttpService = mock(HttpService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
        WalletService,
        VersionOneGuard,
        {provide: HttpService, useValue: mockHttpService},
        {provide: Router, useValue: mockRouter},
        {provide: WindowToken, useValue: MockWindow},
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        {provide: EnvironmentToken, useFactory: environmentProvider},
        provideMockStore({initialState: initialAppStates})

      ]
    });

    versionOneGuard = TestBed.get(VersionOneGuard);
    walletService = TestBed.get(WalletService);
    guardWindow = TestBed.get(WindowToken);
    guardEnvironment = TestBed.get(EnvironmentToken);
  });

  afterEach(() => {
    resetLocalStorage();
  });

  describe('canActivate', () => {

    it('should have a canActivate method', () => {
      expect(typeof versionOneGuard.canActivate).toBe('function');
    });

    it('should redirect window.location to root if user is authenticated', () => {
      localStorage.setItem(LOCAL_TOKEN_KEY, 'asdf');
      localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, 'mnemonic');
      versionOneGuard.canActivate(null, mockSnapshot);
      expect(guardWindow.location.href).toContain('/');
      resetEnvironment();
    });
    it('should NOT redirect but let the user pass to the page', () => {
      expect(versionOneGuard.canActivate(null, mockSnapshot)).toBeTruthy();
      resetEnvironment();
    });
  });

  describe('canDeactivate', () => {

    it('should have a canDeactivate method', () => {
      expect(typeof versionOneGuard.canDeactivate).toBe('function');
    });

    it('should let user leave the page if wallet has been initialized', () => {
      walletService.isSettingUpWallet.next(WALLET_SETUP_STATUS.NotInitialized);
      walletService.isSettingUpWallet.complete();

      walletService.isSettingUpWallet.asObservable().subscribe((response) => {
        versionOneGuard.canDeactivate(null, mockSnapshot).subscribe((result) => {
          expect(result).toBeFalsy();
        });
      });
    });

    it('should NOT let user leave the page if wallet has NOT yet been initialized (waits for it)', () => {
      walletService.isSettingUpWallet.next(WALLET_SETUP_STATUS.Initialized);
      walletService.isSettingUpWallet.complete();

      walletService.isSettingUpWallet.asObservable().subscribe((response) => {
        versionOneGuard.canDeactivate(null, mockSnapshot).subscribe((result) => {
          expect(result).toBeTruthy();
        });
      });
    });
  });
});
