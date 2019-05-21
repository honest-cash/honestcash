import {TestBed} from '@angular/core/testing';
import {Router, RouterStateSnapshot} from '@angular/router';

import {AuthenticationService, LOCAL_TOKEN_KEY} from '../services/authentication.service';
import {VersionOneGuard} from './version-one.guard';
import {localStorageProvider, LocalStorageToken, resetLocalStorage} from '../helpers/localStorage';
import {HttpService} from '..';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {mock} from '../../../../mock';
import {WALLET_LOCALSTORAGE_KEYS} from '../services/wallet.service';
import {WindowToken} from '../helpers/window';
import {environmentProvider, EnvironmentToken} from '../helpers/environment';
import {resetEnvironment} from '../../../environments/environment';

const MockWindow = {
  location: {
    href: '',
  }
};

describe('VersionOneGuard', () => {
  let versionOneGuard: VersionOneGuard;
  let guardWindow: Window;
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
        AuthenticationService,
        VersionOneGuard,
        {provide: HttpService, useValue: mockHttpService},
        {provide: Router, useValue: mockRouter},
        {provide: WindowToken, useValue: MockWindow},
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        {provide: EnvironmentToken, useFactory: environmentProvider},

      ]
    });

    versionOneGuard = TestBed.get(VersionOneGuard);
    guardWindow = TestBed.get(WindowToken);
  });

  afterEach(() => {
    resetLocalStorage();
  });

  it('should have a canActivate method', () => {
    expect(typeof versionOneGuard.canActivate).toBe('function');
  });

  describe('canActivate', () => {
    it('should redirect window.location to root if user is authenticated and environment is production', () => {
      localStorage.setItem(LOCAL_TOKEN_KEY, 'asdf');
      localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, 'mnemonic');
      const environment = environmentProvider();
      environment.production = true;
      versionOneGuard.canActivate(null, mockSnapshot);
      expect(guardWindow.location.href).toBe('/');
      resetEnvironment();
    });
    it('should redirect window.location to http://localhost:3010 if user is authenticated and environment is NOT production', () => {
      localStorage.setItem(LOCAL_TOKEN_KEY, 'asdf');
      localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, 'mnemonic');
      const environment = environmentProvider();
      environment.production = false;
      versionOneGuard.canActivate(null, mockSnapshot);
      expect(guardWindow.location.href).toBe('http://localhost:3010/');
      resetEnvironment();
    });
    it('should NOT redirect but let the user pass to the page', () => {
      expect(versionOneGuard.canActivate(null, mockSnapshot)).toBeTruthy();
      resetEnvironment();
    });
  });
});
