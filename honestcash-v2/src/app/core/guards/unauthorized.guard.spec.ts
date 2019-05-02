import { TestBed, inject } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { MockAuthenticationService } from '../mocks/authentication.service.mock';
import { UnauthorizedGuard } from './unauthorized.guard';

describe('UnauthorizedGuard', async () => {
  let authenticationGuard: UnauthorizedGuard;
  let authenticationService: MockAuthenticationService;
  let mockRouter: any;
  let mockSnapshot: RouterStateSnapshot;

  beforeEach(async () => {
    mockRouter = {
      navigateByUrl: jasmine.createSpy('navigate')
    };
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

    TestBed.configureTestingModule({
      providers: [
        UnauthorizedGuard,
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  beforeEach(inject(
    [UnauthorizedGuard, AuthenticationService],
    (_authenticationGuard: UnauthorizedGuard, _authenticationService: MockAuthenticationService) => {
      authenticationGuard = _authenticationGuard;
      authenticationService = _authenticationService;
    }
  ));

  it('should have a canActivate method', async () => {
    expect(typeof authenticationGuard.canActivate).toBe('function');
  });

  describe('canActivate', async () => {
    it('should return true if user is not authenticated', async() => {
      authenticationService.isAuthenticated = false;
      expect(authenticationGuard.canActivate()).toBe(true);
    });

    it('should return false and redirect to feed if user is already authenticated', async() => {
      // Arrange
      authenticationService.isAuthenticated = false;

      // Act
      const result = authenticationGuard.canActivate();

      // Assert
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(['/feed']);
      expect(result).toBe(false);
    });
  });
});
