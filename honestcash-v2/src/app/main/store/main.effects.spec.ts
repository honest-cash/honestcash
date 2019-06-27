import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {cold, hot} from 'jasmine-marbles';
import {Observable} from 'rxjs';
import {MainEffects} from './main.effects';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {WalletService} from '../../wallet/services/wallet.service';
import {AuthService, LOCAL_TOKEN_KEY} from '../../auth/services/auth.service';
import {localStorageProvider, LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import {resetLocalStorage} from '../../../core/shared/helpers/tests.helper';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../app.states.mock';
import {MainLoad} from './main.actions';
import {UserCleanup, UserSetup} from '../../user/store/user.actions';
import {WalletCleanup, WalletSetup} from '../../wallet/store/wallet.actions';
import {RouterTestingModule} from '@angular/router/testing';

describe('main.effects', () => {
  let effects: MainEffects;
  let actions: Observable<any>;
  let authenticationService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        MainEffects,
        AuthService,
        WalletService,
        provideMockActions(() => actions),
        provideMockStore({initialState: initialAppStates})
      ],
    });

    effects = TestBed.get(MainEffects);
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

  describe('MainLoad', () => {
    it('should correctly return an array of WalletSetup and UserSetup actions, with correct parameters if user is logged in', () => {
      localStorage.setItem(LOCAL_TOKEN_KEY, '123');

      const action = new MainLoad();

      actions = hot('-a', {a: action});
      const expected = cold('-(bc)', {
        b: new WalletSetup(),
        c: new UserSetup()
      });

      expect(effects.MainLoad).toBeObservable(expected);
    });

    it('should correctly return an array of WalletCleanup and AuthCleanup actions, with no parameters if user is NOT logged in ', () => {
      const action = new MainLoad();

      actions = hot('-a', {a: action});
      const expected = cold('-(bc)', {
        b: new WalletCleanup(),
        c: new UserCleanup(),
      });

      expect(effects.MainLoad).toBeObservable(expected);
    });
  });
});
