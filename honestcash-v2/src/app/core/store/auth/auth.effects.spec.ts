import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {cold, hot} from 'jasmine-marbles';
import {Observable, of, throwError} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import * as AuthActions from './auth.actions';
import {AuthenticationService} from '../../services/authentication.service';
import {localStorageProvider, LocalStorageToken, resetLocalStorage} from '../../helpers/localStorage';
import {AuthEffects} from './auth.effects';
import {UserService} from '../../services/user.service';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '../../../app.states';
import User from '../../models/user';
import Wallet from '../../models/wallet';
import {mock} from '../../../../../mock';
import {Router} from '@angular/router';
import {UserSetup} from '../user/user.actions';
import {WalletSetup} from '../wallet/wallet.actions';
import {NO_ERRORS_SCHEMA} from '@angular/core';

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
  let mockAuthenticationService: AuthenticationService;
  let router: Router;

  beforeEach(() => {
    mockAuthenticationService = mock(AuthenticationService);
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
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        AuthEffects,
        {provide: AuthenticationService, useValue: mockAuthenticationService},
        UserService,
        provideMockActions(() => actions),
      ],
    });
    router = TestBed.get(Router);
    effects = TestBed.get(AuthEffects);

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
      it('should correctly redirect to root', (done) => {

        const action = new AuthActions.LogInSuccess(mocks.logInSuccess);
        actions = of(action);

        effects.LogInSuccess.subscribe(() => {
          expect(router.navigateByUrl).toHaveBeenCalledWith('/');
          done();
        });
      });
    });
  });
});
