import { TestBed } from '@angular/core/testing';
import {API_ENDPOINTS, AuthenticationService, LOCAL_TOKEN_KEY} from './authentication.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
  CodedErrorResponse, EmptyResponse,
  LoginSuccessResponse, OkResponse,
  SignupSuccessResponse
} from '../models/authentication';
import {HttpService} from '../http/http.service';
import User from '../models/user';
import Wallet from '../models/wallet';
import {CryptoUtils} from '../../shared/lib/CryptoUtils';
import {mock} from '../../../../mock';
import {of} from 'rxjs';
import {resetLocalStorage} from '../helpers/localStorage';

const SHARED_MOCKS = {
  token: '123',
  username: 'toto',
  email: 'toto@toto.com',
  password: '123',
  captcha: 'asdf',
  mnemonicEncrypted: 'test test2 test3 test4',
  hashedPassword: '',
};

SHARED_MOCKS.hashedPassword = CryptoUtils.calculatePasswordHash(SHARED_MOCKS.email, SHARED_MOCKS.password);

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let mockHttpService: HttpService;

  beforeEach(() => {
    mockHttpService = mock(HttpService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthenticationService,
        {provide: HttpService, useValue: mockHttpService}
      ]
    });
    authenticationService = TestBed.get(AuthenticationService);
  });

  afterEach(() => {
    // Cleanup
    resetLocalStorage();
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
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.loginSuccess));
      // Act
      authenticationService.logIn(
        mocks.loginContext
      ).subscribe((response: LoginSuccessResponse) => {
        // Assert
        expect(mockHttpService.post)
          .toHaveBeenCalledWith(API_ENDPOINTS.login, {...mocks.loginContext, password: SHARED_MOCKS.hashedPassword});
        done();
      });
    });

    it('if login is correct, should have the correct body on response with user, wallet, token', (done) => {
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.loginSuccess));
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
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.loginFailure));
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
        (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.logoutSuccess));
        // Act
        authenticationService.logOut().subscribe((response: EmptyResponse) => {
          // Assert
          expect(mockHttpService.post).toHaveBeenCalledWith(API_ENDPOINTS.logout, {});
          done();
        });
      });

      it('should have no body on response', (done) => {
        (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.logoutSuccess));
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
     (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.signupSuccess));
     // Act
     authenticationService.signUp(
       mocks.signupContext
     ).subscribe((response: SignupSuccessResponse) => {
       // Assert
       expect(mockHttpService.post)
         .toHaveBeenCalledWith(API_ENDPOINTS.signup, {...mocks.signupContext, password: SHARED_MOCKS.hashedPassword});
       done();
     });
   });

   it('if signup is correct, should have the correct body on response with user, token', (done) => {
     (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.signupSuccess));
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
     (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.signupFailure));
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

  describe('setWallet', () => {
    const mocks = {
      setWalletContext: {
        mnemonicEncrypted: SHARED_MOCKS.mnemonicEncrypted,
      },
      setWalletSuccess: {
        ok: true
      },
    };

    it('should make API request to the correct API endpoint and have the correct body on request', (done) => {
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.setWalletSuccess));
      // Act
      authenticationService.setWallet(
        mocks.setWalletContext
      ).subscribe((response: OkResponse) => {
        // Assert
        expect(mockHttpService.post)
          .toHaveBeenCalledWith(API_ENDPOINTS.setWallet, SHARED_MOCKS.mnemonicEncrypted);
        done();
      });
    });

  });

  describe('getEmails', () => {
    const mocks = {
      getEmailsContext: {
        mnemonicEncrypted: SHARED_MOCKS.mnemonicEncrypted,
      },
      getEmailsSuccess: ['toto1@toto.com', 'toto2@toto.com'],
    };

    it('should make API request to the correct API endpoint', (done) => {
      (<jasmine.Spy>mockHttpService.get).and.returnValue(of(mocks.getEmailsSuccess));
      // Act
      authenticationService.getEmails().subscribe((response: string[]) => {
        // Assert
        expect(mockHttpService.get)
          .toHaveBeenCalledWith(API_ENDPOINTS.getEmails);
        done();
      });
    });

    it('should return emails', (done) => {
      (<jasmine.Spy>mockHttpService.get).and.returnValue(of(mocks.getEmailsSuccess));
      // Act
      authenticationService.getEmails().subscribe((response: string[]) => {
        // Assert
        expect(response).toBe(mocks.getEmailsSuccess);
        done();
      });
    });

  });

  describe('resetPassword', () => {
    const mocks = {
      resetPasswordContext: {
        email: SHARED_MOCKS.email,
      },
      resetPasswordSuccess: {},
    };

    it('should make API request to the correct API endpoint and have the correct body on request', (done) => {
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.resetPasswordSuccess));
      // Act
      authenticationService.resetPassword(mocks.resetPasswordContext).subscribe((response: EmptyResponse) => {
        // Assert
        expect(mockHttpService.post)
          .toHaveBeenCalledWith(API_ENDPOINTS.resetPassword, {...mocks.resetPasswordContext});
        done();
      });
    });

    it('should return nothing as a response', (done) => {
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.resetPasswordSuccess));
      // Act
      authenticationService.resetPassword(mocks.resetPasswordContext).subscribe((response: EmptyResponse) => {
        // Assert
        expect(response).toBe(mocks.resetPasswordSuccess);
        done();
      });
    });

  });

  describe('changePassword', () => {
    const mocks = {
      changePasswordContext: {
        email: SHARED_MOCKS.email,
        code: 'asdfasdfasdfasdf',
        newPassword: SHARED_MOCKS.password,
        repeatNewPassword: SHARED_MOCKS.password,
      },
      changePasswordSuccess: {},
    };

    it('should make API request to the correct API endpoint and'
    + ' have the correct body on request with hashed passwords and newly generated mnemonicEncrypted', async (done) => {
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.changePasswordSuccess));
      // Act
      authenticationService.changePassword(mocks.changePasswordContext).subscribe(async (response: OkResponse) => {
        // Assert
        const newPassword = SHARED_MOCKS.hashedPassword;
        const repeatNewPassword = SHARED_MOCKS.hashedPassword;
        expect(mockHttpService.post)
          .toHaveBeenCalledWith(
            API_ENDPOINTS.changePassword,
            {...mocks.changePasswordContext, newPassword, repeatNewPassword, mnemonicEncrypted: jasmine.any(String)}
          );
        done();
      });
    });

    it('should return nothing as a response', (done) => {
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.changePasswordSuccess));
      // Act
      authenticationService.resetPassword(mocks.changePasswordContext).subscribe((response: EmptyResponse) => {
        // Assert
        expect(response).toBe(mocks.changePasswordSuccess);
        done();
      });
    });

  });

  describe('getStatus', () => {
    const mocks = {
      getStatusSuccess: new User(),
    };

    it('should make API request to the correct API endpoint', (done) => {
      (<jasmine.Spy>mockHttpService.get).and.returnValue(of(mocks.getStatusSuccess));
      // Act
      authenticationService.getStatus().subscribe((response: User) => {
        // Assert
        expect(mockHttpService.get)
          .toHaveBeenCalledWith(API_ENDPOINTS.status);
        done();
      });
    });

    it('should return a User as a response', (done) => {
      (<jasmine.Spy>mockHttpService.get).and.returnValue(of(mocks.getStatusSuccess));
      // Act
      authenticationService.getStatus().subscribe((response: User) => {
        // Assert
        expect(response).toBe(mocks.getStatusSuccess);
        done();
      });
    });

  });

});
