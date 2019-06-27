import {TestBed} from '@angular/core/testing';
import {Router, RouterStateSnapshot} from '@angular/router';

import {AuthService, LOCAL_TOKEN_KEY} from '../services/auth.service';
import {VersionOneGuard} from './version-one.guard';
import {localStorageProvider, LocalStorageToken} from '../../helpers/localStorage';
import {HttpService} from '../../index';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {mock} from '../../../../mock';
import {WALLET_LOCALSTORAGE_KEYS, WALLET_SETUP_STATUS, WalletService} from '../services/wallet.service';
import {WindowToken} from '../../helpers/window';
import {environmentProvider, EnvironmentToken} from '../../helpers/environment';
import {resetLocalStorage} from '../../helpers/tests';
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

    it('should redirect to root if user is authenticated and environment.env is set to prod', () => {
      localStorage.setItem(LOCAL_TOKEN_KEY, 'asdf');
      localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, 'mnemonic');
      versionOneGuard.environment.env = 'prod';
      versionOneGuard.canActivate(null, mockSnapshot);
      expect(guardWindow.location.href).toContain('/');
    });
    it('should redirect to root if user is authenticated and environment.env is set to dev', () => {
      localStorage.setItem(LOCAL_TOKEN_KEY, 'asdf');
      localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, 'mnemonic');
      versionOneGuard.environment.env = 'dev';
      versionOneGuard.canActivate(null, mockSnapshot);
      expect(guardWindow.location.href).toContain('/');
    });
    it('should redirect to root of LOCALHOST if user is authenticated and environment.env is NOT set to prod or dev', () => {
      localStorage.setItem(LOCAL_TOKEN_KEY, 'asdf');
      localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, 'mnemonic');
      versionOneGuard.environment.env = 'somethingelse';
      versionOneGuard.canActivate(null, mockSnapshot);
      expect(guardWindow.location.href).toContain('http://localhost:3010/');
    });
    it('should NOT redirect but let the user pass to the page', () => {
      expect(versionOneGuard.canActivate(null, mockSnapshot)).toBeTruthy();
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
