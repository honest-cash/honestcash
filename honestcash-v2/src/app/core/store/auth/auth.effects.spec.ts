import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {cold, hot} from 'jasmine-marbles';
import {Observable, of, throwError} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import * as AuthActions from './auth.actions';
import {AuthenticationService} from '../../services/authentication.service';
import {resetLocalStorage} from '../../helpers/localStorage';
import {AuthEffects} from './auth.effects';
import {UserService} from '../../services/user.service';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from '../../../app.states';
import User from '../../models/user';
import Wallet from '../../models/wallet';
import {mock} from '../../../../../mock';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {UserSetup} from '../user/user.actions';
import {WalletSetup} from '../wallet/wallet.actions';
import {ThankYouComponent} from '../../../modules/welcome/pages/thank-you/thank-you.component';
import {HeadingComponent} from '../../../modules/welcome/components/heading/heading.component';
import {HeaderComponent} from '../../../modules/welcome/components/header/header.component';
import {FooterComponent} from '../../../modules/welcome/components/footer/footer.component';

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

xdescribe('auth.effects', () => {
  let effects: AuthEffects;
  let actions: Observable<any>;
  let mockAuthenticationService: AuthenticationService;
  let router: Router;

  beforeEach(() => {
    mockAuthenticationService = mock(AuthenticationService);
    TestBed.configureTestingModule({
      declarations: [
        ThankYouComponent,
        HeadingComponent,
        HeaderComponent,
        FooterComponent,
      ],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        RouterTestingModule.withRoutes([
          {path: 'thank-you', component: ThankYouComponent}
        ]),
      ],
      providers: [
        AuthEffects,
        {provide: AuthenticationService, useValue: mockAuthenticationService},
        UserService,
        provideMockActions(() => actions),
      ],
    });
    router = TestBed.get(Router);
    effects = TestBed.get(AuthEffects);
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
      it('should init on AuthenticationService with the token', () => {

        (<jasmine.Spy>mockAuthenticationService.init).and.callThrough();
        const context = {
          mnemonic: SHARED_MOCKS.mnemonic,
          password: SHARED_MOCKS.password,
        };
        const wallet = {
          ...SHARED_MOCKS.wallet,
          mnemonicEncrypted: SHARED_MOCKS.mnemonic
        };
        const action = new AuthActions.LogInSuccess({...mocks.logInSuccess, wallet});

        actions = hot('-a', {a: action});
        const expected = cold('-(bc)', {
          b: new UserSetup(),
          c: new WalletSetup(context),
        });

        // @todo this one fails, several combinations I tried
        expect(mockAuthenticationService.init).toHaveBeenCalledWith(SHARED_MOCKS.token);
        // this one runs as expected
        expect(effects.LogInSuccess).toBeObservable(expected);

      });
      /*it('should correctly return UserSetup and WalletSetup with mnemonicEncrypted and password', () => {
        const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

        const action = new AuthActions.LogInSuccess(mocks.logInSuccess);
        actions = hot('-a', { a: action });
        const expected = cold('-b', {
          b: new AuthActions.LogInSuccess(mocks.logInSuccess)
        });
        expect(effects.LogInSuccess).toBeObservable(expected);
      });*/
    });
  });
});
