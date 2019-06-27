import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import * as UserActions from './user.actions';
import {AuthService} from '../../auth/services/auth.service';
import {localStorageProvider, LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import {resetLocalStorage} from '../../../core/shared/helpers/tests.helper';
import {UserEffects} from './user.effects';
import {LoginSuccessResponse} from '../../auth/models/authentication';
import Wallet from '../../wallet/models/wallet';
import User from '../models/user';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../app.states.mock';
import {Router} from '@angular/router';
import {cold} from 'jasmine-marbles';
import {mock} from '../../../../mock';

describe('user.effects', () => {
  let effects: UserEffects;
  let actions: Observable<any>;
  let mockAuthService: AuthService;

  beforeEach(() => {
    mockAuthService = mock(AuthService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        {
          provide: Router, useValue: {
            navigate: () => {
            },
            navigateByUrl: () => {
            }
          }
        },
        UserEffects,
        {provide: AuthService, useValue: mockAuthService},
        provideMockStore({initialState: initialAppStates}),
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.get(UserEffects);
    mockAuthService = TestBed.get(AuthService);
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

  describe('UserSetup', () => {
    it('should correctly call authService.init WITHOUT arguments when there is NO payload', () => {
      actions = cold('a', {a: new UserActions.UserSetup()});

      effects.UserSetup.subscribe(() => {
        expect(mockAuthService.init).toHaveBeenCalledWith();
      });
    });

    it('should correctly call authService.init WITH arguments when there is payload', () => {
      const payload: LoginSuccessResponse = {
        wallet: new Wallet(),
        user: new User(),
        token: 'asdf',
        password: '123',
      };
      payload.user.id = 3;
      actions = cold('a', {a: new UserActions.UserSetup(payload)});

      effects.UserSetup.subscribe(() => {
        expect(mockAuthService.init).toHaveBeenCalledWith(payload.token, payload.user);
      });
    });
  });

  describe('UserCleanup', () => {
    it('should correctly call authService.unsetTokenAndUnAuthenticate', () => {
      actions = cold('a', {a: new UserActions.UserCleanup()});

      effects.UserCleanup.subscribe(() => {
        expect(mockAuthService.unsetTokenAndUnAuthenticate).toHaveBeenCalled();
      });
    });
  });
});
