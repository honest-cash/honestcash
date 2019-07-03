import {inject, TestBed} from '@angular/core/testing';
import {Router, RouterStateSnapshot} from '@angular/router';

import {AuthService} from '../services/auth.service';
import {MockAuthenticationService} from '../services/auth.service.mock';
import {AuthorizedGuard} from './authorized.guard';
import {resetLocalStorage} from '../../../core/shared/helpers/tests.helper';

describe('AuthorizedGuard', () => {
  let authorizedGuard: AuthorizedGuard;
  let mockAuthService: MockAuthenticationService;
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

    authorizedGuard = TestBed.get(AuthorizedGuard);
    mockAuthService = TestBed.get(AuthService);
  });

  afterEach(() => {
    resetLocalStorage();
    mockAuthService.isAuthenticated = false;
  });

  it('should have a canActivate method', () => {
    expect(typeof authorizedGuard.canActivate).toBe('function');
  });

  describe('canActivate', () => {
    it('should return true if user is authenticated', () => {
      mockAuthService.isAuthenticated = true;
      expect(authorizedGuard.canActivate(null, mockSnapshot)).toBe(true);
    });

    it('should return false and redirect to login page if user is not authenticated', () => {
      // Arrange
      mockAuthService.isAuthenticated = false;

      // Act
      const result = authorizedGuard.canActivate(null, mockSnapshot);

      // Assert
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {
        queryParams: {redirect: mockRouter.url},
        replaceUrl: true
      });
      expect(result).toBe(false);
    });

    it('should save url as queryParam if user is not authenticated', () => {
      mockAuthService.isAuthenticated = false;
      mockRouter.url = '/about';
      mockSnapshot.url = '/about';

      authorizedGuard.canActivate(null, mockSnapshot);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {
        queryParams: {redirect: mockRouter.url},
        replaceUrl: true
      });
    });
  });
});
