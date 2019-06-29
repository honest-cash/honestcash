import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {cold, hot} from 'jasmine-marbles';
import {Observable} from 'rxjs';
import {CoreEffects} from './core.effects';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {provideMockStore} from '@ngrx/store/testing';

import {CoreLoad} from './core.actions';

import {RouterTestingModule} from '@angular/router/testing';
import {UserCleanup, UserSetup} from '../../app/user/store/user.actions';
import {WalletCleanup, WalletSetup} from '../../app/wallet/store/wallet.actions';
import {localStorageProvider, LocalStorageToken} from '../shared/helpers/local-storage.helper';
import {resetLocalStorage} from '../shared/helpers/tests.helper';
import {initialAppStates} from '../../app/app.states.mock';
import {LOCAL_TOKEN_KEY} from '../../app/user/services/user.service';
import {WalletService} from '../../app/wallet/services/wallet.service';
import {AuthService} from '../../../../src/auth/AuthService';

describe('core.effects', () => {
  let effects: CoreEffects;
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
        CoreEffects,
        AuthService,
        WalletService,
        provideMockActions(() => actions),
        provideMockStore({initialState: initialAppStates})
      ],
    });

    effects = TestBed.get(CoreEffects);
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

  describe('CoreLoad', () => {
    it('should correctly return an array of WalletSetup and UserSetup actions, with correct parameters if user is logged in', () => {
      localStorage.setItem(LOCAL_TOKEN_KEY, '123');

      const action = new CoreLoad();

      actions = hot('-a', {a: action});
      const expected = cold('-(bc)', {
        b: new WalletSetup(),
        c: new UserSetup()
      });

      expect(effects.CoreLoad).toBeObservable(expected);
    });

    it('should correctly return an array of WalletCleanup and AuthCleanup actions, with no parameters if user is NOT logged in ', () => {
      const action = new CoreLoad();

      actions = hot('-a', {a: action});
      const expected = cold('-(bc)', {
        b: new WalletCleanup(),
        c: new UserCleanup(),
      });

      expect(effects.CoreLoad).toBeObservable(expected);
    });
  });
});
