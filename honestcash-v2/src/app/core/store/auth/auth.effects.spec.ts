import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {cold, hot} from 'jasmine-marbles';
import {forkJoin, Observable, of, throwError} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import * as AuthActions from './auth.actions';
import {LogInSuccess, RootRedirect} from './auth.actions';
import {AuthService} from '../../services/auth.service';
import {localStorageProvider, LocalStorageToken} from '../../helpers/localStorage';
import {AuthEffects} from './auth.effects';
import {UserService} from '../../services/user.service';
import {Store, StoreModule} from '@ngrx/store';
import {AppStates, metaReducers, reducers} from '../../../app.states';
import User from '../../models/user';
import Wallet from '../../models/wallet';
import {mock} from '../../../../../mock';
import {Router} from '@angular/router';
import {UserActionTypes, UserCleanup, UserLoaded, UserSetup} from '../user/user.actions';
import {WalletActionTypes, WalletCleanup, WalletGenerated, WalletSetup} from '../wallet/wallet.actions';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ResetPasswordContext, ResetPasswordRequestContext, SignupContext} from '../../models/authentication';
import {resetLocalStorage} from '../../helpers/tests';
import {WindowToken} from '../../helpers/window';
import {ofType} from '@ngrx/effects';
import {first} from 'rxjs/operators';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../mocks/app.states.mock';

const MockWindow = {
  location: {
    href: '',
  }
};

const SHARED_MOCKS = {
  username: 'toto',
  email: 'toto@toto.com',
  password: '123',
  captcha: 'asdfasdf123',
  token: 'asdfasdf',
  user: new User(),
  wallet: new Wallet(),
  mnemonic: 'test1 test2 test3',
  codedErrorResponse: {
    code: 400,
    desc: 'EXAMPLE_FAILURE',
    httpCode: 400,
  }
};

describe('auth.effects', () => {
  let effects: AuthEffects;
  let actions: Observable<any>;
  let mockAuthenticationService: AuthService;
  let router: Router;
  let store: Store<AppStates>;

  beforeEach(() => {
    mockAuthenticationService = mock(AuthService);
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(reducers, {metaReducers}),
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      providers: [
        {
          provide: Router, useValue: {
            navigate: () => {
            },
            navigateByUrl: () => {
            }
          }
        },
        {provide: WindowToken, useValue: MockWindow},
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        AuthEffects,
        {provide: AuthService, useValue: mockAuthenticationService},
        UserService,
        provideMockActions(() => actions),
        provideMockStore({initialState: initialAppStates})
      ],
    });
    router = TestBed.get(Router);
    effects = TestBed.get(AuthEffects);
    mockAuthenticationService = TestBed.get(AuthService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();
    spyOn(router, 'navigateByUrl').and.callThrough();
  });

  afterEach(() => {
    // Cleanup
    resetLocalStorage();
  });

  describe('instance', () => {
    it('should have been initialized', () => {
      expect(effects).toBeDefined();
    });
  });

  describe('LogIn Effects', () => {
    const mocks = {
      logInSuccess: {
        user: SHARED_MOCKS.user,
        wallet: SHARED_MOCKS.wallet,
        token: SHARED_MOCKS.token,
        password: SHARED_MOCKS.password
      },
      loginFailure: {
        ...SHARED_MOCKS.codedErrorResponse
      }
    };
    describe('LogIn', () => {
      it('should correctly return LogInSuccess if the credentials are correct', () => {
        (<jasmine.Spy>mockAuthenticationService.logIn).and.returnValue(of(mocks.logInSuccess));
        const context = {
          email: SHARED_MOCKS.email,
          password: SHARED_MOCKS.password,
        };
        const action = new AuthActions.LogIn(context);
        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new AuthActions.LogInSuccess(mocks.logInSuccess)
        });
        expect(effects.LogIn).toBeObservable(expected);
      });
      it('should correctly return LogInFailure if the credentials are NOT correct', () => {
        (<jasmine.Spy>mockAuthenticationService.logIn).and.returnValue(throwError(mocks.loginFailure));
        const context = {
          email: SHARED_MOCKS.email,
          password: SHARED_MOCKS.password,
        };
        const action = new AuthActions.LogIn(context);

        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new AuthActions.LogInFailure(mocks.loginFailure)
        });

        expect(effects.LogIn).toBeObservable(expected);
      });
    });
    describe('LogInSuccess', () => {
      it('should correctly return UserSetup and WalletSetup with mnemonicEncrypted and password', () => {
        const action = new AuthActions.LogInSuccess(mocks.logInSuccess);

        actions = hot('-a', {a: action});
        const expected = cold('-(bc)', {
          b: new UserSetup(mocks.logInSuccess),
          c: new WalletSetup(mocks.logInSuccess),
        });

        expect(effects.LogInSuccess).toBeObservable(expected);

      });
      it('should correctly redirect to root after UserLoaded and WalletGenerated are completed', () => {
        (<jasmine.Spy>mockAuthenticationService.getStatus).and.returnValue(of(new User()));
        actions = cold('a(bc)', {
          a: new LogInSuccess(mocks.logInSuccess),
          b: new UserLoaded({user: new User()}),
          c: new WalletGenerated({wallet: new Wallet()}),
        });

        const firstActionSuccess$ = actions.pipe(
          ofType(UserActionTypes.USER_LOADED),
          first(),
        );

        const secondActionsSuccess$ = actions.pipe(
          ofType(WalletActionTypes.WALLET_GENERATED),
          first(),
        );

        effects.LogInSuccess.subscribe(() => {
          console.log('SUBSCRIBE');
          forkJoin(firstActionSuccess$, secondActionsSuccess$)
          .pipe(first())
          .subscribe(() => {
            expect(store.dispatch).toHaveBeenCalledWith(new RootRedirect());
          });
        });
      });
    });
  });

  describe('SignUp Effects', () => {
    const mocks = {
      signUpSuccess: {
        user: SHARED_MOCKS.user,
        token: SHARED_MOCKS.token,
        password: SHARED_MOCKS.password
      },
      signUpFailure: {
        ...SHARED_MOCKS.codedErrorResponse
      }
    };
    describe('SignUp', () => {
      it('should correctly return SignUpSuccess if the credentials are correct', () => {
        (<jasmine.Spy>mockAuthenticationService.signUp).and.returnValue(of(mocks.signUpSuccess));
        const context: SignupContext = {
          username: SHARED_MOCKS.username,
          email: SHARED_MOCKS.email,
          password: SHARED_MOCKS.password,
          captcha: SHARED_MOCKS.captcha,
        };
        const action = new AuthActions.SignUp(context);
        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new AuthActions.SignUpSuccess(mocks.signUpSuccess)
        });
        expect(effects.SignUp).toBeObservable(expected);
      });
      it('should correctly return SignUpFailure if the credentials are NOT correct', () => {
        (<jasmine.Spy>mockAuthenticationService.signUp).and.returnValue(throwError(mocks.signUpFailure));
        const context: SignupContext = {
          username: SHARED_MOCKS.username,
          email: SHARED_MOCKS.email,
          password: SHARED_MOCKS.password,
          captcha: SHARED_MOCKS.captcha,
        };
        const action = new AuthActions.SignUp(context);

        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new AuthActions.SignUpFailure(mocks.signUpFailure)
        });

        expect(effects.SignUp).toBeObservable(expected);
      });
    });
    describe('SignUpSuccess', () => {
      it('should correctly return UserSetup with and password', () => {
        const action = new AuthActions.SignUpSuccess(mocks.signUpSuccess);

        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new UserSetup(mocks.signUpSuccess),
        });

        expect(effects.SignUpSuccess).toBeObservable(expected);

      });
      it('should correctly redirect to thank-you route', (done) => {

        const action = new AuthActions.SignUpSuccess(mocks.signUpSuccess);
        actions = of(action);

        effects.SignUpSuccess.subscribe(() => {
          expect(router.navigateByUrl).toHaveBeenCalledWith('/thank-you');
          done();
        });
      });
    });
  });

  describe('ResetPassword Effects', () => {
    const mocks = {
      resetPasswordSuccess: {
        user: SHARED_MOCKS.user,
        token: SHARED_MOCKS.token,
        password: SHARED_MOCKS.password
      },
      resetPasswordFailure: {
        ...SHARED_MOCKS.codedErrorResponse
      }
    };
    describe('ResetPassword', () => {
      it('should correctly return ResetPasswordSuccess if the credentials are correct', () => {
        (<jasmine.Spy>mockAuthenticationService.changePassword).and.returnValue(of(mocks.resetPasswordSuccess));
        const context: ResetPasswordContext = {
          email: SHARED_MOCKS.email,
          code: '123',
          newPassword: '123',
          repeatNewPassword: '123',
        };
        const action = new AuthActions.ResetPassword(context);
        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new AuthActions.ResetPasswordSuccess()
        });
        expect(effects.ResetPassword).toBeObservable(expected);
      });
      it('should correctly return ResetPasswordFailure if the credentials are NOT correct', () => {
        (<jasmine.Spy>mockAuthenticationService.changePassword).and.returnValue(throwError(mocks.resetPasswordFailure));
        const context: ResetPasswordContext = {
          email: SHARED_MOCKS.email,
          code: '123',
          newPassword: '123',
          repeatNewPassword: '123',
        };
        const action = new AuthActions.ResetPassword(context);

        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new AuthActions.ResetPasswordFailure(mocks.resetPasswordFailure)
        });

        expect(effects.ResetPassword).toBeObservable(expected);
      });
    });
  });

  describe('ResetPasswordRequest Effects', () => {
    const mocks = {
      resetPasswordRequestSuccess: {
        user: SHARED_MOCKS.user,
        token: SHARED_MOCKS.token,
        password: SHARED_MOCKS.password
      },
      resetPasswordRequestFailure: {
        ...SHARED_MOCKS.codedErrorResponse
      }
    };
    describe('ResetPasswordRequest', () => {
      it('should correctly return ResetPasswordSuccess if the credentials are correct', () => {
        (<jasmine.Spy>mockAuthenticationService.resetPassword).and.returnValue(of(mocks.resetPasswordRequestSuccess));
        const context: ResetPasswordRequestContext = {
          email: SHARED_MOCKS.email,
        };
        const action = new AuthActions.ResetPasswordRequest(context);
        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new AuthActions.ResetPasswordRequestSuccess()
        });
        expect(effects.ResetPasswordRequest).toBeObservable(expected);
      });
      it('should correctly return ResetPasswordFailure if the credentials are NOT correct', () => {
        (<jasmine.Spy>mockAuthenticationService.resetPassword).and.returnValue(throwError(mocks.resetPasswordRequestFailure));
        const context: ResetPasswordRequestContext = {
          email: SHARED_MOCKS.email,
        };
        const action = new AuthActions.ResetPasswordRequest(context);

        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new AuthActions.ResetPasswordRequestFailure(mocks.resetPasswordRequestFailure)
        });

        expect(effects.ResetPasswordRequest).toBeObservable(expected);
      });
    });
  });

  describe('LogOut Effects', () => {
    describe('LogOut', () => {
      it('should correctly return return UserCleanup, WalletCleanup and RootRedirect', () => {
        (<jasmine.Spy>mockAuthenticationService.logOut).and.returnValue(of({}));
        const action = new AuthActions.LogOut();
        actions = hot('-a', {a: action});
        const expected = cold('-(bcd)', {
          b: new UserCleanup(),
          c: new WalletCleanup(),
          d: new RootRedirect(),
        });
        expect(effects.LogOut).toBeObservable(expected);
      });
    });
  });
  describe('GetStatus Effects', () => {
    describe('GetStatus', () => {
      it('should correctly call getStatus on authenticationService', () => {
        (<jasmine.Spy>mockAuthenticationService.getStatus).and.returnValue(of(new User()));
        actions = cold('a', {a: new AuthActions.GetStatus()});

        effects.GetStatus.subscribe(() => {
          expect(mockAuthenticationService.getStatus).toHaveBeenCalled();
        });
      });
    });
  });

  describe('RootRedirect Effects', () => {
    describe('RootRedirect', () => {
      it('should correctly call getStatus on authenticationService', () => {
        actions = cold('a', {a: new AuthActions.RootRedirect()});

        effects.RootRedirect.subscribe(() => {
          expect(router.navigateByUrl).toHaveBeenCalledWith('/');
        });
      });
    });
  });
});
