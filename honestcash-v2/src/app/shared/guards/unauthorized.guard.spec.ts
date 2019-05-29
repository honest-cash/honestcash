import {TestBed} from '@angular/core/testing';
import {Router, RouterStateSnapshot} from '@angular/router';

import {AuthService} from '../services/auth.service';
import {MockAuthenticationService} from '../mocks/authentication.service.mock';
import {UnauthorizedGuard} from './unauthorized.guard';
import {resetLocalStorage} from '../../core/helpers/tests';
import {WindowToken} from '../../core/helpers/window';
import {localStorageProvider, LocalStorageToken} from '../../core/helpers/localStorage';
import {environmentProvider, EnvironmentToken} from '../../core/helpers/environment';

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

      const environment = environmentProvider();
      environment.production = true;

      // Act
      const result = authenticationGuard.canActivate();

      // Assert
      expect(guardWindow.location.href).toEqual('/');
      expect(result).toBe(false);
    });

    it('should return false and redirect to localhost root if user is already authenticated and the environment is NOT production', () => {
      // Arrange
      authService.isAuthenticated = true;
      const environment = environmentProvider();
      environment.production = false;

      // Act
      const result = authenticationGuard.canActivate();

      // Assert
      expect(guardWindow.location.href).toEqual('http://localhost:3010/');
      expect(result).toBe(false);
    });
  });
});
