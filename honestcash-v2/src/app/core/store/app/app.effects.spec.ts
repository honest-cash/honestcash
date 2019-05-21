import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {cold, hot} from 'jasmine-marbles';
import {Observable} from 'rxjs';
import {AppEffects} from './app.effects';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import * as AppActions from './app.actions';
import * as UserActions from '../user/user.actions';
import * as WalletActions from '../wallet/wallet.actions';
import {WalletService} from '../../services/wallet.service';
import {AuthenticationService, LOCAL_TOKEN_KEY} from '../../services/authentication.service';
import {getLocalStorage, resetLocalStorage} from '../../helpers/localStorage';

describe('app.effects', () => {
  let effects: AppEffects;
  let actions: Observable<any>;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: 'LOCALSTORAGE', useFactory: getLocalStorage},
        AppEffects,
        AuthenticationService,
        WalletService,
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.get(AppEffects);
    authenticationService = TestBed.get(AuthenticationService);
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
