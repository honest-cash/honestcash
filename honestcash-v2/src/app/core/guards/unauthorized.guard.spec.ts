import {inject, TestBed} from '@angular/core/testing';
import {Router, RouterStateSnapshot} from '@angular/router';

import {AuthService} from '../services/auth.service';
import {MockAuthenticationService} from '../mocks/authentication.service.mock';
import {UnauthorizedGuard} from './unauthorized.guard';
import {resetLocalStorage} from '../helpers/tests';

describe('UnauthorizedGuard', () => {
  let authenticationGuard: UnauthorizedGuard;
  let authenticationService: MockAuthenticationService;
  let mockRouter: any;
  let mockSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    mockRouter = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

    TestBed.configureTestingModule({
      providers: [
        UnauthorizedGuard,
        {provide: AuthService, useClass: MockAuthenticationService},
        {provide: Router, useValue: mockRouter}
      ]
    });
  });

  beforeEach(inject(
    [UnauthorizedGuard, AuthService],
    (_authenticationGuard: UnauthorizedGuard, _authenticationService: MockAuthenticationService) => {
      authenticationGuard = _authenticationGuard;
      authenticationService = _authenticationService;
    }
  ));

  afterEach(() => {
    resetLocalStorage();
  });

  it('should have a canActivate method', () => {
    expect(typeof authenticationGuard.canActivate).toBe('function');
  });

  describe('canActivate', () => {
    it('should return true if user is not authenticated', () => {
      authenticationService.isAuthenticated = false;
      expect(authenticationGuard.canActivate()).toBe(true);
    });

    it('should return false and redirect to feed if user is already authenticated', () => {
      // Arrange
      authenticationService.isAuthenticated = true;

      // Act
      const result = authenticationGuard.canActivate();

      // Assert
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/feed');
      expect(result).toBe(false);
    });
  });
});
