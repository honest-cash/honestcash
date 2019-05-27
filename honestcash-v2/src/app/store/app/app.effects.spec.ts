import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {cold, hot} from 'jasmine-marbles';
import {Observable} from 'rxjs';
import {AppEffects} from './app.effects';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import * as AppActions from './app.actions';
import * as UserActions from '../../core/store/user/user.actions';
import * as WalletActions from '../../core/store/wallet/wallet.actions';
import {WalletService} from '../../core/services/wallet.service';
import {AuthService, LOCAL_TOKEN_KEY} from '../../core/services/auth.service';
import {localStorageProvider, LocalStorageToken} from '../../core/helpers/localStorage';
import {resetLocalStorage} from '../../core/helpers/tests';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../core/mocks/app.states.mock';

describe('app.effects', () => {
  let effects: AppEffects;
  let actions: Observable<any>;
  let authenticationService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        AppEffects,
        AuthService,
        WalletService,
        provideMockActions(() => actions),
        provideMockStore({initialState: initialAppStates})
      ],
    });

    effects = TestBed.get(AppEffects);
    authenticationService = TestBed.get(AuthService);
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

  describe('AppLoad', () => {
    it('should correctly return an array of WalletSetup and UserSetup actions, with correct parameters if user is logged in', () => {
      localStorage.setItem(LOCAL_TOKEN_KEY, '123');

      const action = new AppActions.AppLoad();

      actions = hot('-a', {a: action});
      const expected = cold('-(bc)', {
        b: new WalletActions.WalletSetup(),
        c: new UserActions.UserSetup()
      });

      expect(effects.AppLoad).toBeObservable(expected);
    });

    it('should correctly return an array of WalletCleanup and AuthCleanup actions, with no parameters if user is NOT logged in ', () => {
      const action = new AppActions.AppLoad();

      actions = hot('-a', {a: action});
      const expected = cold('-(bc)', {
        b: new WalletActions.WalletCleanup(),
        c: new UserActions.UserCleanup(),
      });

      expect(effects.AppLoad).toBeObservable(expected);
    });
  });
});
