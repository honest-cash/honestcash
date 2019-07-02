import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpService} from '../../../core/http/http.service';
import {mock} from '../../../../mock';
import {localStorageProvider, LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import User from '../../user/models/user';
import {of} from 'rxjs';
import {
  CheckPasswordResponse,
  CodedErrorResponse,
  EmptyResponse,
  LoginSuccessResponse,
  OkResponse,
  SignupSuccessResponse
} from '../models/authentication';
import {resetLocalStorage} from '../../../core/shared/helpers/tests.helper';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../app.states.mock';
import {SimpleWallet} from '../../wallet/models/simple-wallet';
import {WALLET_LOCALSTORAGE_KEYS, WalletService} from '../../wallet/services/wallet.service';
import {API_ENDPOINTS} from '../shared/auth.endpoints';
import {RouterTestingModule} from '@angular/router/testing';
import {LOCAL_TOKEN_KEY, UserService} from '../../user/services/user.service';


const SHARED_MOCKS = {
  token: '123',
  username: 'toto',
  email: 'toto@toto.com',
  password: '123',
  captcha: 'asdf',
  mnemonicEncrypted: 'test test2 test3 test4',
  hashedPassword: '',
};

SHARED_MOCKS.hashedPassword = WalletService.calculatePasswordHash(SHARED_MOCKS.email, SHARED_MOCKS.password);

describe('AuthService', () => {
  let authService: AuthService;
  let mockWalletService: WalletService;
  let mockHttpService: HttpService;
  let mockUserService: UserService;

  beforeEach(() => {
    mockHttpService = mock(HttpService);
    mockWalletService = mock(WalletService);
    mockUserService = mock(UserService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthService,
        {provide: UserService, useValue: mockUserService},
        {provide: WalletService, useValue: mockWalletService},
        {provide: HttpService, useValue: mockHttpService},
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        provideMockStore({initialState: initialAppStates})
      ]
    });
    authService = TestBed.get(AuthService);
    mockWalletService = TestBed.get(WalletService);
    mockUserService = TestBed.get(UserService);
  });

  afterEach(() => {
    // Cleanup
    resetLocalStorage();
  });

  describe('instance', () => {
    it('should have been initialized', () => {
      expect(authService).toBeDefined();
    });
  });

  describe('unauthenticate should', () => {
    it('set isAuthenticated to false', () => {
      localStorage.setItem(LOCAL_TOKEN_KEY, 'asdf');
      localStorage.setItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC, 'asdfasdf');
      authService.authenticate();
      localStorage.removeItem(LOCAL_TOKEN_KEY);
      localStorage.removeItem(WALLET_LOCALSTORAGE_KEYS.MNEMONIC);
      authService.unauthenticate();
      expect(authService.hasAuthorization()).toBeFalsy();
    });
  });

  describe('authenticate should', () => {
    it('set isAuthenticated to true when mnemonic and token exists in localStorage', () => {
      (<jasmine.Spy>mockWalletService.getWalletMnemonic).and.returnValue('asdf');
      (<jasmine.Spy>mockUserService.getToken).and.returnValue('asdf');

      authService.authenticate();
      expect(authService.hasAuthorization()).toBeTruthy();
    });
    it('NOT set isAuthorization to true if mnemonic and token does not exist in localStorage', () => {
      (<jasmine.Spy>mockWalletService.getWalletMnemonic).and.callThrough();
      (<jasmine.Spy>mockUserService.getToken).and.callThrough();
      authService.authenticate();
      expect(authService.hasAuthorization()).toBeFalsy();
    });
  });

  describe('hasAuthorization should', () => {
    it('return isAuthenticated as false if token and mnemonic does not exist in localStorage', () => {
      (<jasmine.Spy>mockWalletService.getWalletMnemonic).and.callThrough();
      (<jasmine.Spy>mockUserService.getToken).and.callThrough();
      expect(authService.hasAuthorization()).toBeFalsy();
    });
    it('return isAuthenticated as true if token and mnemonic exist in localStorage', () => {
      (<jasmine.Spy>mockWalletService.getWalletMnemonic).and.returnValue('asdf');
      (<jasmine.Spy>mockUserService.getToken).and.returnValue('token');
      expect(authService.hasAuthorization()).toBeTruthy();
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
        wallet: new SimpleWallet(),
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
      authService.logIn(
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
      authService.logIn(
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
      authService.logIn(
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
      authService.logOut().subscribe((response: EmptyResponse) => {
        // Assert
        expect(mockHttpService.post).toHaveBeenCalledWith(API_ENDPOINTS.logout, {});
        done();
      });
    });

    it('should have no body on response', (done) => {
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.logoutSuccess));
      // Act
      authService.logOut().subscribe((response: EmptyResponse) => {
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
      authService.signUp(
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
      authService.signUp(
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
      authService.signUp(
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
      authService.getEmails().subscribe((response: string[]) => {
        // Assert
        expect(mockHttpService.get)
        .toHaveBeenCalledWith(API_ENDPOINTS.getEmails);
        done();
      });
    });

    it('should return emails', (done) => {
      (<jasmine.Spy>mockHttpService.get).and.returnValue(of(mocks.getEmailsSuccess));
      // Act
      authService.getEmails().subscribe((response: string[]) => {
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
      authService.resetPassword(mocks.resetPasswordContext).subscribe((response: EmptyResponse) => {
        // Assert
        expect(mockHttpService.post)
        .toHaveBeenCalledWith(API_ENDPOINTS.resetPassword, {...mocks.resetPasswordContext});
        done();
      });
    });

    it('should return nothing as a response', (done) => {
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.resetPasswordSuccess));
      // Act
      authService.resetPassword(mocks.resetPasswordContext).subscribe((response: EmptyResponse) => {
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
      (<jasmine.Spy>mockWalletService.createWallet).and.returnValue({mnemonic: 'test1 test2 test3'});
      (<jasmine.Spy>mockWalletService.encryptMnemonic).and.returnValue('test1 test2 test3');
      // Act
      authService.changePassword(mocks.changePasswordContext).subscribe((response: OkResponse) => {
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
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.changePasswordSuccess));
      (<jasmine.Spy>mockWalletService.createWallet).and.returnValue({mnemonic: 'test1 test2 test3'});
      // Act
      authService.resetPassword(mocks.changePasswordContext).subscribe((response: EmptyResponse) => {
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
      (<jasmine.Spy>mockWalletService.createWallet).and.returnValue({mnemonic: 'test1 test2 test3'});
      // Act
      authService.checkPassword(mocks.checkPasswordContext).subscribe((response: CheckPasswordResponse) => {
        // Assert
        expect(mockHttpService.post).toHaveBeenCalledWith(API_ENDPOINTS.checkPassword, mocks.checkPasswordContext);
        done();
      });
    });

    it('should have no body on response', (done) => {
      (<jasmine.Spy>mockHttpService.post).and.returnValue(of(mocks.checkPasswordSuccess));
      (<jasmine.Spy>mockWalletService.createWallet).and.returnValue({mnemonic: 'test1 test2 test3'});
      // Act
      authService.checkPassword(mocks.checkPasswordContext).subscribe((response: CheckPasswordResponse) => {
        // Assert
        expect(response).toEqual(mocks.checkPasswordSuccess);
        done();
      });
    });

  });

});
