import {TestBed} from '@angular/core/testing';
import {API_ENDPOINTS, AuthService, LOCAL_TOKEN_KEY, LOCAL_USER_ID_KEY} from './auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpService} from '../../http/http.service';
import {CryptoUtils} from '../lib/CryptoUtils';
import {mock} from '../../../../mock';
import {localStorageProvider, LocalStorageToken} from '../../helpers/localStorage';
import User from '../../../app/user/models/user';
import Wallet from '../../../app/wallet/models/wallet';
import {of} from 'rxjs';
import {
  CheckPasswordResponse,
  CodedErrorResponse,
  EmptyResponse,
  LoginSuccessResponse,
  OkResponse,
  SignupSuccessResponse
} from '../../../app/auth/models/authentication';
import {resetLocalStorage} from '../../helpers/tests';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../mocks/app.states.mock';

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

describe('AuthService', () => {
  let authenticationService: AuthService;
  let mockHttpService: HttpService;

  beforeEach(() => {
    mockHttpService = mock(HttpService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
        {provide: HttpService, useValue: mockHttpService},
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        provideMockStore({initialState: initialAppStates})
      ]
    });
    authenticationService = TestBed.get(AuthService);
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

  describe('setUserId', () => {
    it('should set the userId correctly to the instance and the localstorage', () => {
      const userId = 2;
      authenticationService.setUserId(userId);
      expect(authenticationService.getUserId()).toEqual(userId);
      expect(localStorage.getItem(LOCAL_USER_ID_KEY)).toEqual(String(userId));
    });
  });

  describe('getUserId', () => {
    it('should return the userId correctly if it is defined in the instance', () => {
      const userId = 2;
      authenticationService.setUserId(userId);
      expect(authenticationService.getUserId()).toEqual(userId);
    });
    it('should return the userId correctly if it is NOT defined in the instance but defined in localStorage', () => {
      const userId = 2;
      localStorage.setItem(LOCAL_USER_ID_KEY, String(userId));
      expect(authenticationService.getUserId()).toEqual(userId);
    });
  });

  describe('unsetTokenAndUnAuthenticate', () => {
    it('should remove token from the instance and the localStorage and set isAuthenticated to false', () => {
      // Act
      authenticationService.setToken(SHARED_MOCKS.token);
      authenticationService.unsetTokenAndUnAuthenticate();

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
    // the actual saving to localStorage is tested with setToken tests
    it('should set isAuthenticated and the token if a token is provided', () => {
      // Act
      authenticationService.init(SHARED_MOCKS.token);
      // Assert
      expect(authenticationService.getToken()).toBe(SHARED_MOCKS.token);
      expect(authenticationService.hasAuthorization()).toBeTruthy();
    });

    it('should set isAuthenticated and the token via getStatus if a token is NOT provided but exists in localStorage', () => {
      const mocks = {
        getStatusSuccess: new User(),
      };
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.getStatusSuccess));
      (<jasmine.Spy>spyOn(authenticationService, 'getStatus')).and.returnValue(of(new User()));
      // Act
      localStorage.setItem(LOCAL_TOKEN_KEY, SHARED_MOCKS.token);
      authenticationService.init();
      // Assert
      expect(authenticationService.getToken()).toBe(SHARED_MOCKS.token);
      expect(authenticationService.getStatus).toHaveBeenCalled();
      expect(authenticationService.hasAuthorization()).toBeTruthy();
    });

    it('should NOT set isAuthenticated and the token if a token is NOT provided and does NOT exist in localStorage', () => {
      (<jasmine.Spy>spyOn(authenticationService, 'getStatus')).and.returnValue(of(new User()));
      localStorage.removeItem(LOCAL_TOKEN_KEY);
      // Act
      authenticationService.init();
      // Assert
      expect(authenticationService.getToken()).toEqual('');
      expect(authenticationService.hasAuthorization()).toBeFalsy();
    });
    it('should set userId if a token and userId is provided', () => {
      const user = new User();
      user.id = 2;
      // Act
      authenticationService.init('token', user);
      // Assert
      expect(authenticationService.getUserId()).toBe(user.id);
    });
    it('should set userId via getStatus if NO token is provided but a local token exists', () => {
      const user = new User();
      user.id = 2;
      localStorage.setItem(LOCAL_TOKEN_KEY, SHARED_MOCKS.token);
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of({}));
      (<jasmine.Spy>spyOn(authenticationService, 'getStatus')).and.returnValue(of(user));
      // Act
      authenticationService.init();
      // Assert
      expect(authenticationService.getUserId()).toBe(user.id);
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
      + ' have the correct body on request with hashed passwords and newly generated mnemonicEncrypted', (done) => {
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.changePasswordSuccess));
      // Act
      authenticationService.changePassword(mocks.changePasswordContext).subscribe((response: OkResponse) => {
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

  describe('checkPassword', () => {
    const mocks = {
      checkPasswordContext: {
        email: 'toto@toto.com',
        code: 'asdf',
        newPassword: 'asdf123',
        repeatNewPassword: 'asdf123',
        mnemonicEncrypted: 'asdf asdf asdf',
      },
      checkPasswordSuccess: {
        isValid: true
      },
    };

    it('should make API request to the correct API endpoint with the correct body', (done) => {
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.checkPasswordSuccess));
      // Act
      authenticationService.checkPassword(mocks.checkPasswordContext).subscribe((response: CheckPasswordResponse) => {
        // Assert
        expect(mockHttpService.post).toHaveBeenCalledWith(API_ENDPOINTS.checkPassword, mocks.checkPasswordContext);
        done();
      });
    });

    it('should have no body on response', (done) => {
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.checkPasswordSuccess));
      // Act
      authenticationService.checkPassword(mocks.checkPasswordContext).subscribe((response: CheckPasswordResponse) => {
        // Assert
        expect(response).toEqual(mocks.checkPasswordSuccess);
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
