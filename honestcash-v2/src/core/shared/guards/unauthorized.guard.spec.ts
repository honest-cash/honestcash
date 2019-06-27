import {TestBed} from '@angular/core/testing';
import {Router, RouterStateSnapshot} from '@angular/router';

import {AuthService} from '../../../app/auth/services/auth.service';
import {MockAuthenticationService} from '../../../app/auth/services/authentication.service.mock';
import {UnauthorizedGuard} from './unauthorized.guard';
import {resetLocalStorage} from '../../helpers/tests.helper';
import {WindowToken} from '../../helpers/window.helper';
import {localStorageProvider, LocalStorageToken} from '../../helpers/local-storage.helper';
import {environmentProvider, EnvironmentToken} from '../../helpers/environment.helper';
import {Environment} from '../../../environments/environment';

const MockWindow = {
  location: {
    href: '',
  }
};

describe('UnauthorizedGuard', () => {
  let authenticationGuard: UnauthorizedGuard;
  let authService: MockAuthenticationService;
  let mockRouter: any;
  let mockSnapshot: RouterStateSnapshot;
  let guardWindow: Window;
  let guardEnvironment: Environment;

  beforeEach(() => {
    mockRouter = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

    TestBed.configureTestingModule({
      providers: [
        UnauthorizedGuard,
        {provide: AuthService, useClass: MockAuthenticationService},
        {provide: Router, useValue: mockRouter},
        {provide: WindowToken, useValue: MockWindow},
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        {provide: EnvironmentToken, useFactory: environmentProvider},
      ]
    });
    authenticationGuard = TestBed.get(UnauthorizedGuard);
    authService = TestBed.get(AuthService);
    guardWindow = TestBed.get(WindowToken);
    guardEnvironment = TestBed.get(EnvironmentToken);
  });

  afterEach(() => {
    resetLocalStorage();
    MockWindow.location.href = '';
  });

  it('should have a canActivate method', () => {
    expect(typeof authenticationGuard.canActivate).toBe('function');
  });

  describe('canActivate', () => {
    it('should return true if user is not authenticated', () => {
      authService.isAuthenticated = false;
      expect(authenticationGuard.canActivate()).toBe(true);
    });

    it('should return false and redirect to root if user is already authenticated and the environment is production', () => {
      // Arrange
      authService.isAuthenticated = true;
      guardEnvironment.env = 'prod';

      // Act
      const result = authenticationGuard.canActivate();

      // Assert
      expect(guardWindow.location.href).toEqual('/');
      expect(result).toBe(false);
    });

    it('should return false and redirect to localhost root if user is already authenticated and the environment is NOT production', () => {
      // Arrange
      authService.isAuthenticated = true;
      guardEnvironment.env = 'local';

      // Act
      const result = authenticationGuard.canActivate();

      // Assert
      expect(guardWindow.location.href).toEqual('http://localhost:3010/');
      expect(result).toBe(false);
    });
  });
});
