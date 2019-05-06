import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { AuthenticationService, LOCAL_TOKEN_KEY } from './authentication.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FailedResponse, LoginResponse, LoginSuccessResponse, SignupResponse, SignupSuccessResponse} from '../models/authentication';
import {MockAuthenticationService} from '..';

describe('AuthenticationService', async () => {
  let authenticationService: MockAuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
      ]
    });
  });

  beforeEach(inject(
    [
      AuthenticationService,
      HttpClient,
      HttpTestingController
    ],
    (
      _authenticationService: MockAuthenticationService,
      _httpMock: HttpTestingController
    ) => {
      authenticationService = _authenticationService;
      httpMock = _httpMock;
    }));

  afterEach(() => {
    // Cleanup
    localStorage.removeItem(LOCAL_TOKEN_KEY);
    httpMock.verify();
  });

  describe('instance', async () => {
    it('should have been initialized', () => {
      expect(authenticationService).toBeDefined();
    });
  });

  describe('setToken', async () => {
    it('should set service instance token and localStorage', async () => {
      // Act
      authenticationService.setToken(authenticationService.mocks.token);

      // Assert
      expect(authenticationService.getToken()).toBeDefined();
      expect(localStorage.getItem(LOCAL_TOKEN_KEY)).toBe(authenticationService.mocks.token);
    });
  });

  describe('getToken', async () => {
    it('should return the token if token is set in instance', async () => {
      // Act
      authenticationService.setToken(authenticationService.mocks.token);

      // Assert
      expect(authenticationService.getToken()).toBe(authenticationService.mocks.token);
    });

    it('should return the token if token is not set in instance but set in localStorage', async () => {
      // Act
      localStorage.setItem(LOCAL_TOKEN_KEY, authenticationService.mocks.token);

      // Assert
      expect(authenticationService.getToken()).toBe(authenticationService.mocks.token);
    });
  });

  describe('unsetToken', async () => {
    it('should remove token from the instance and the localStorage and set isAuthenticated to false', async () => {
      // Act
      authenticationService.setToken(authenticationService.mocks.token);
      authenticationService.unsetToken();

      // Assert
      expect(authenticationService.getToken()).toBeUndefined();
      expect(authenticationService.hasAuthorization()).toBeFalsy();
    });
  });

  describe('hasAuthorization', async () => {
    it('should return true if a token is set', async () => {
      // Act
      authenticationService.setToken(authenticationService.mocks.token);

      // Assert
      expect(authenticationService.hasAuthorization()).toBeTruthy();
    });

    it('should return false if no token is set', async () => {
      // Assert
      expect(authenticationService.hasAuthorization()).toBeFalsy();
    });
  });

  describe('init', async () => {
    it('should set isAuthenticated and the token if a token is provided', async () => {
      // Act
      authenticationService.init(authenticationService.mocks.token);
      // Assert
      expect(authenticationService.getToken()).toBe(authenticationService.mocks.token);
      expect(authenticationService.hasAuthorization()).toBeTruthy();
    });

    it('should set isAuthenticated and the token if a token is not provided but exists in localStorage', async () => {
      // Act
      localStorage.setItem(LOCAL_TOKEN_KEY, authenticationService.mocks.token);
      authenticationService.init();
      // Assert
      expect(authenticationService.getToken()).toBe(authenticationService.mocks.token);
      expect(authenticationService.hasAuthorization()).toBeTruthy();
    });

    it('should not set isAuthenticated and the token if a token is not provided and does not exist in localStorage', async () => {
      // Act
      authenticationService.init();
      // Assert
      expect(authenticationService.getToken()).toBeUndefined();
      expect(authenticationService.hasAuthorization()).toBeFalsy();
    });
  });

  describe('logIn', async () => {
    it('should make API request to the correct API endpoint', async () => {
      // Act
      authenticationService.logIn(authenticationService.mocks.loginContext).subscribe((response: LoginSuccessResponse | FailedResponse) => {});

      // Assert
      const request = httpMock.expectOne(authenticationService.API_ENDPOINTS.login);

      expect(request.cancelled).toBeFalsy();
      expect(request.request.responseType).toEqual('json');
    });

    it('should have the correct body on request with hashed password', async () => {
      // Act
      authenticationService.logIn(authenticationService.mocks.loginContext).subscribe((response: LoginResponse) => {});

      // Assert
      const request = httpMock.expectOne(authenticationService.API_ENDPOINTS.login);

      expect(request.request.body).toEqual({...authenticationService.mocks.loginContext, password: authenticationService.mocks.hashedPassword});
    });

    it('should have the correct body on response with user, wallet, token', async () => {

      // Act
      authenticationService.logIn(authenticationService.mocks.loginContext).subscribe((response: LoginSuccessResponse) => {
        // Assert
        expect (response.user).toBeDefined();
        expect (response.wallet).toBeDefined();
        expect (response.token).toBeDefined();
      }, (error: FailedResponse) => {
        expect (error).toBeDefined();
      });
    });


  });

  describe('logOut', async () => {
    it('should make API request to the correct API endpoint', async () => {
      // Act
      authenticationService.logOut().subscribe(() => {});

      // Assert
      const request = httpMock.expectOne(authenticationService.API_ENDPOINTS.logout);

      expect(request.cancelled).toBeFalsy();
    });

    it('should have no body on request', async () => {
      // Act
      authenticationService.logOut().subscribe(() => {});

      // Assert
      const request = httpMock.expectOne(authenticationService.API_ENDPOINTS.logout);

      expect(request.request.body).toEqual({});
    });

    it('should have no body on response', async () => {
      // Act
      authenticationService.logOut().subscribe((response: any) => {
        // Assert
        expect (response).toBeUndefined();
      }, (error: FailedResponse) => {
        expect (error).toBeDefined();
      });
    });

  });

  describe('signUp', async () => {
    it('should make API request to the correct API endpoint', async () => {
      // Act
      authenticationService.signUp(authenticationService.mocks.signupContext).subscribe((response: SignupSuccessResponse | FailedResponse) => {});

      // Assert
      const request = httpMock.expectOne(authenticationService.API_ENDPOINTS.signup);

      expect(request.cancelled).toBeFalsy();
      expect(request.request.responseType).toEqual('json');
    });

    it('should have the correct body on request with hashed password', async () => {
      // Act
      authenticationService.signUp(authenticationService.mocks.signupContext).subscribe((response: SignupResponse) => {});

      // Assert
      const request = httpMock.expectOne(authenticationService.API_ENDPOINTS.signup);

      expect(request.request.body).toEqual({...authenticationService.mocks.signupContext, password: authenticationService.mocks.hashedPassword});
    });

    it('should have the correct body on response with user, wallet, token', async () => {
      // Act
      authenticationService.signUp(authenticationService.mocks.signupContext).subscribe((response: LoginSuccessResponse) => {
        // Assert
        expect (response.user).toBeDefined();
        expect (response.token).toBeDefined();
      }, (error: FailedResponse) => {
        expect (error).toBeDefined();
      });
    });


  });

});
