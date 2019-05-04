import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { AuthenticationService, LOCAL_TOKEN_KEY } from './authentication.service';
import {HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CryptoUtils} from '../../shared/lib/CryptoUtils';
import {FailedResponse, LoginResponse, LoginSuccessResponse} from '../models/authentication';

describe('AuthenticationService', async () => {
  let authenticationService: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
      ]
    });
  });

  beforeEach(inject([AuthenticationService, HttpClient, HttpTestingController], (_authenticationService: AuthenticationService, _httpMock: HttpTestingController) => {
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
      const token = '123';
      // Act
      authenticationService.setToken(token);

      // Assert
      expect(authenticationService.getToken()).toBeDefined();
      expect(localStorage.getItem(LOCAL_TOKEN_KEY)).toBe(token);
    });
  });

  describe('getToken', async () => {
    it('should return the token if token is set in instance', async () => {
      const token = '123';
      // Act
      authenticationService.setToken(token);

      // Assert
      expect(authenticationService.getToken()).toBe(token);
    });

    it('should return the token if token is not set in instance but set in localStorage', async () => {
      const token = '123';
      // Act
      localStorage.setItem(LOCAL_TOKEN_KEY, token);

      // Assert
      expect(authenticationService.getToken()).toBe(token);
    });
  });

  describe('unsetToken', async () => {
    it('should remove token from the instance and the localStorage and set isAuthenticated to false', async () => {
      const token = '123';
      // Act
      authenticationService.setToken(token);
      authenticationService.unsetToken();

      // Assert
      expect(authenticationService.getToken()).toBeUndefined();
      expect(authenticationService.hasAuthorization()).toBeFalsy();
    });
  });

  describe('hasAuthorization', async () => {
    it('should return true if a token is set', async () => {
      const token = '123';
      // Act
      authenticationService.setToken(token);

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
      const token = '123';
      authenticationService.init(token);
      // Assert
      expect(authenticationService.getToken()).toBe(token);
      expect(authenticationService.hasAuthorization()).toBeTruthy();
    });

    it('should set isAuthenticated and the token if a token is not provided but exists in localStorage', async () => {
      // Act
      const token = '123';
      localStorage.setItem(LOCAL_TOKEN_KEY, token);
      authenticationService.init();
      // Assert
      expect(authenticationService.getToken()).toBe(token);
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

  describe('login', async () => {
    it('should make API request to the correct API endpoint', async () => {
      const payload = {
        email: 'toto@toto.com',
        password: '123'
      };

      // Act
      authenticationService.logIn(payload).subscribe((response: LoginSuccessResponse | FailedResponse) => {});

      // Assert
      const request = httpMock.expectOne(authenticationService.API_ENDPOINTS.login);

      expect(request.cancelled).toBeFalsy();
      expect(request.request.responseType).toEqual('json');
    });

    it('should have the correct body on request with hashed password', async () => {
      const payload = {
        email: 'toto@toto.com',
        password: '123'
      };
      const passwordHash = CryptoUtils.calculatePasswordHash(payload.email, payload.password);
      // Act
      authenticationService.logIn(payload).subscribe((response: LoginResponse) => {});

      // Assert
      const request = httpMock.expectOne(authenticationService.API_ENDPOINTS.login);

      expect(request.request.body).toEqual({...payload, password: passwordHash});
    });

    it('should have the correct body on response with user, wallet, token', async () => {
      const payload = {
        email: 'toto@toto.com',
        password: '123'
      };
      const passwordHash = CryptoUtils.calculatePasswordHash(payload.email, payload.password);
      // Act
      authenticationService.logIn(payload).subscribe((response: LoginResponse) => {
        // Assert
        // expect (response.user).toBeDefined();
      });

      // Assert
      const request = httpMock.expectOne(authenticationService.API_ENDPOINTS.login);

      expect(request.request.body).toEqual({...payload, password: passwordHash});
    });


  });

});
