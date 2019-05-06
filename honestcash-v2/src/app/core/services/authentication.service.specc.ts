import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import {API_ENDPOINTS, AuthenticationService, getPrefixedEndpoint, LOCAL_TOKEN_KEY} from './authentication.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {
  CodedErrorResponse, EmptyResponse,
  FailedResponse,
  LoginContext,
  LoginResponse,
  LoginSuccessResponse,
  SignupResponse,
  SignupSuccessResponse
} from '../models/authentication';
import {HttpService, MockAuthenticationService} from '..';
import User from '../models/user';
import Wallet from '../models/wallet';
import {CryptoUtils} from '../../shared/lib/CryptoUtils';
import {mock} from '../helpers/mock';
import {of} from 'rxjs';

const SHARED_MOCKS = {
  token: '123',
  username: 'toto',
  email: 'toto@toto.com',
  password: '123',
  captcha: 'asdf',
  get hashedPassword() {
    return CryptoUtils.calculatePasswordHash(this.email, this.password);
  }
};

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let httpServiceMock: HttpService;

  beforeEach(() => {
    httpServiceMock = mock(HttpService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthenticationService,
        {provide: HttpService, useValue: httpServiceMock}
      ]
    });
    authenticationService = TestBed.get(AuthenticationService);
  });

  afterEach(() => {
    // Cleanup
    localStorage.removeItem(LOCAL_TOKEN_KEY);
  });

  describe('instance', () => {
    it('should have been initialized', () => {
      expect(authenticationService).toBeDefined();
    });
  });

  describe('setToken', () => {
    it('should set service instance token and localStorage', () => {
      // Act
      authenticationService.setToken(SHARED_MOCKS.token);

      // Assert
      expect(authenticationService.getToken()).toBeDefined();
      expect(localStorage.getItem(LOCAL_TOKEN_KEY)).toBe(SHARED_MOCKS.token);
    });
  });

  describe('getToken', () => {
    it('should return the token if token is set in instance', () => {
      // Act
      authenticationService.setToken(SHARED_MOCKS.token);

      // Assert
      expect(authenticationService.getToken()).toBe(SHARED_MOCKS.token);
    });

    it('should return the token if token is NOT set in instance but set in localStorage', () => {
      // Act
      localStorage.setItem(LOCAL_TOKEN_KEY, SHARED_MOCKS.token);

      // Assert
      expect(authenticationService.getToken()).toBe(SHARED_MOCKS.token);
    });
  });

  describe('unsetToken', () => {
    it('should remove token from the instance and the localStorage and set isAuthenticated to false', () => {
      // Act
      authenticationService.setToken(SHARED_MOCKS.token);
      authenticationService.unsetToken();

      // Assert
      expect(authenticationService.getToken()).toBe('');
      expect(authenticationService.hasAuthorization()).toBeFalsy();
    });
  });

  describe('hasAuthorization', () => {
    it('should return true if a token is set', () => {
      // Act
      authenticationService.setToken(SHARED_MOCKS.token);

      // Assert
      expect(authenticationService.hasAuthorization()).toBeTruthy();
    });

    it('should return false if no token is set', () => {
      // Assert
      expect(authenticationService.hasAuthorization()).toBeFalsy();
    });
  });

  describe('init', () => {
    it('should set isAuthenticated and the token if a token is provided', () => {
      // Act
      authenticationService.init(SHARED_MOCKS.token);
      // Assert
      expect(authenticationService.getToken()).toBe(SHARED_MOCKS.token);
      expect(authenticationService.hasAuthorization()).toBeTruthy();
    });

    it('should set isAuthenticated and the token if a token is NOT provided but exists in localStorage', () => {
      // Act
      localStorage.setItem(LOCAL_TOKEN_KEY, SHARED_MOCKS.token);
      authenticationService.init();
      // Assert
      expect(authenticationService.getToken()).toBe(SHARED_MOCKS.token);
      expect(authenticationService.hasAuthorization()).toBeTruthy();
    });

    it('should NOT set isAuthenticated and the token if a token is NOT provided and does NOT exist in localStorage', () => {
      // Act
      authenticationService.init();
      // Assert
      expect(authenticationService.getToken()).toEqual('');
      expect(authenticationService.hasAuthorization()).toBeFalsy();
    });
  });

  describe('logIn', () => {
    const mocks = {
      loginContext: {
        email: SHARED_MOCKS.email,
        password: SHARED_MOCKS.password
      },
      loginSuccess: {
        user: new User(),
        wallet: new Wallet(),
        token: SHARED_MOCKS.token,
      },
      loginFailure: {
        code: 400,
        // PASSWORD_INCORRECT is just an example of failure.
        // we have no tests for each case.
        // if we did that would mean we are kind of testing the backend
        desc: 'PASSWORD_INCORRECT',
        httpCode: 4000,
      },
    };

    it('should make API request to the correct API endpoint and have the correct body on request with hashed password', (done) => {
      (<jasmine.Spy>httpServiceMock.post).and.returnValue(of(mocks.loginSuccess));
      // Act
      authenticationService.logIn(
        mocks.loginContext
      ).subscribe((response: LoginSuccessResponse) => {
        // Assert
        expect(httpServiceMock.post)
          .toHaveBeenCalledWith(API_ENDPOINTS.login, {...mocks.loginContext, password: SHARED_MOCKS.hashedPassword});
        done();
      });
    });

    it('if login is correct, should have the correct body on response with user, wallet, token', (done) => {
      (<jasmine.Spy>httpServiceMock.post).and.returnValue(of(mocks.loginSuccess));
      // Act
      authenticationService.logIn(
        mocks.loginContext
      ).subscribe((response: LoginSuccessResponse) => {
        // Assert
        expect(response.user).toBeDefined();
        expect(response.wallet).toBeDefined();
        expect(response.token).toBeDefined();
        done();
      });
    });

    it('if login is NOT correct, should have CodedErrorResponse as a response', (done) => {
      (<jasmine.Spy>httpServiceMock.post).and.returnValue(of(mocks.loginFailure));
      // Act
      authenticationService.logIn(
        mocks.loginContext
      ).subscribe((response: CodedErrorResponse) => {
        // Assert
        expect(response.code).toBeDefined();
        expect(response.desc).toBeDefined();
        expect(response.httpCode).toBeDefined();
        done();
      });
    });

  });

  describe('logOut', () => {
    const mocks = {
      logoutSuccess: {},
    };

      it('should make API request to the correct API endpoint and have NO body', (done) => {
        (<jasmine.Spy>httpServiceMock.post).and.returnValue(of(mocks.logoutSuccess));
        // Act
        authenticationService.logOut().subscribe((response: EmptyResponse) => {
          // Assert
          expect(httpServiceMock.post).toHaveBeenCalledWith(API_ENDPOINTS.logout, {});
          done();
        });
      });

      it('should have no body on response', (done) => {
        (<jasmine.Spy>httpServiceMock.post).and.returnValue(of(mocks.logoutSuccess));
        // Act
        authenticationService.logOut().subscribe((response: EmptyResponse) => {
          // Assert
          expect(Object.keys(response).length).toEqual(0);
          done();
        });
      });

  });

  describe('signUp', () => {
    const mocks = {
      signupContext: {
        email: SHARED_MOCKS.email,
        username: SHARED_MOCKS.username,
        password: SHARED_MOCKS.password,
        captcha: SHARED_MOCKS.captcha,
      },
      signupSuccess: {
        user: new User(),
        token: SHARED_MOCKS.token,
      },
      signupFailure: {
        code: 400,
        // PASSWORD_INCORRECT is just an example of failure.
        // we have no tests for each case.
        // if we did that would mean we are kind of testing the backend
        desc: 'USERNAME_TAKEN',
        httpCode: 4000,
      },
    };

   it('should make API request to the correct API endpoint and have the correct body on request with hashed password', (done) => {
     (<jasmine.Spy>httpServiceMock.post).and.returnValue(of(mocks.signupSuccess));
     // Act
     authenticationService.signUp(
       mocks.signupContext
     ).subscribe((response: SignupSuccessResponse) => {
       // Assert
       expect(httpServiceMock.post).toHaveBeenCalledWith(API_ENDPOINTS.signup, {...mocks.signupContext, password: SHARED_MOCKS.hashedPassword});
       done();
     });
   });

   it('if signup is correct, should have the correct body on response with user, token', (done) => {
     (<jasmine.Spy>httpServiceMock.post).and.returnValue(of(mocks.signupSuccess));
     // Act
     authenticationService.signUp(
       mocks.signupContext
     ).subscribe((response: SignupSuccessResponse) => {
       // Assert
       expect(response.user).toBeDefined();
       expect(response.token).toBeDefined();
       done();
     });
   });

   it('if signup is NOT correct, should have CodedErrorResponse as a response', (done) => {
     (<jasmine.Spy>httpServiceMock.post).and.returnValue(of(mocks.signupFailure));
     // Act
     authenticationService.signUp(
       mocks.signupContext
     ).subscribe((response: CodedErrorResponse) => {
       // Assert
       expect(response.code).toBeDefined();
       expect(response.desc).toBeDefined();
       expect(response.httpCode).toBeDefined();
       done();
     });
   });
 });

});
