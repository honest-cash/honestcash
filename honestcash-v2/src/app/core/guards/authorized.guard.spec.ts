import {inject, TestBed} from '@angular/core/testing';
import {Router, RouterStateSnapshot} from '@angular/router';

import {AuthService} from '../services/auth.service';
import {MockAuthenticationService} from '../mocks/authentication.service.mock';
import {AuthorizedGuard} from './authorized.guard';
import {resetLocalStorage} from '../helpers/localStorage';

describe('AuthorizedGuard', () => {
  let authenticationGuard: AuthorizedGuard;
  let authenticationService: MockAuthenticationService;
  let mockRouter: any;
  let mockSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

    TestBed.configureTestingModule({
      providers: [
        AuthorizedGuard,
        {provide: AuthService, useClass: MockAuthenticationService},
        {provide: Router, useValue: mockRouter}
      ]
    });
  });

  beforeEach(inject(
    [AuthorizedGuard, AuthService],
    (_authenticationGuard: AuthorizedGuard, _authenticationService: MockAuthenticationService) => {
      authenticationGuard = _authenticationGuard;
      authenticationService = _authenticationService;
    }
  ));

  afterEach(() => {
    resetLocalStorage();
    authenticationService.isAuthenticated = false;
  });

  it('should have a canActivate method', () => {
    expect(typeof authenticationGuard.canActivate).toBe('function');
  });

  describe('canActivate', () => {
    it('should return true if user is authenticated', () => {
      authenticationService.isAuthenticated = true;
      expect(authenticationGuard.canActivate(null, mockSnapshot)).toBe(true);
    });

    it('should return false and redirect to login page if user is not authenticated', () => {
      // Arrange
      authenticationService.isAuthenticated = false;

      // Act
      const result = authenticationGuard.canActivate(null, mockSnapshot);

      // Assert
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {
        queryParams: {redirect: mockRouter.url},
        replaceUrl: true
      });
      expect(result).toBe(false);
    });

    it('should save url as queryParam if user is not authenticated', () => {
      authenticationService.isAuthenticated = false;
      mockRouter.url = '/about';
      mockSnapshot.url = '/about';

      authenticationGuard.canActivate(null, mockSnapshot);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {
        queryParams: {redirect: mockRouter.url},
        replaceUrl: true
      });
    });
  });
});
