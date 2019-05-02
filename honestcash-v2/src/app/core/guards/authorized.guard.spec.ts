import { TestBed, inject } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { MockAuthenticationService } from '../mocks/authentication.service.mock';
import { AuthorizedGuard } from './authorized.guard';

describe('AuthorizedGuard', async () => {
  let authenticationGuard: AuthorizedGuard;
  let authenticationService: MockAuthenticationService;
  let mockRouter: any;
  let mockSnapshot: RouterStateSnapshot;

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

    TestBed.configureTestingModule({
      providers: [
        AuthorizedGuard,
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  beforeEach(inject(
    [AuthorizedGuard, AuthenticationService],
    (_authenticationGuard: AuthorizedGuard, _authenticationService: MockAuthenticationService) => {
      authenticationGuard = _authenticationGuard;
      authenticationService = _authenticationService;
    }
  ));

  it('should have a canActivate method', async () => {
    expect(typeof authenticationGuard.canActivate).toBe('function');
  });

  describe('canActivate', async () => {
    it('should return true if user is authenticated', async() => {
      expect(authenticationGuard.canActivate()).toBe(true);
    });

    it('should return false and redirect to login if user is not authenticated', async() => {
      // Arrange
      authenticationService.credentials = null;

      // Act
      const result = authenticationGuard.canActivate();

      // Assert
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {
        queryParams: { redirect: undefined },
        replaceUrl: true
      });
      expect(result).toBe(false);
    });

    it('should save url as queryParam if user is not authenticated', () => {
      authenticationService.credentials = null;
      mockRouter.url = '/about';
      mockSnapshot.url = '/about';

      authenticationGuard.canActivate();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {
        queryParams: { redirect: mockRouter.url },
        replaceUrl: true
      });
    });
  });
});
