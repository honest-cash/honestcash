import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of, throwError} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {localStorageProvider, LocalStorageToken} from '../../core/helpers/localStorage';
import {resetLocalStorage} from '../../core/helpers/tests';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../shared/mocks/app.states.mock';
import {Router} from '@angular/router';
import {cold, hot} from 'jasmine-marbles';
import {WalletEffects} from './wallet.effects';
import {WalletService} from '../../shared/services/wallet.service';
import {WalletCleanup, WalletGenerated, WalletSetup, WalletSetupFailed} from './wallet.actions';
import Wallet from '../../shared/models/wallet';
import {mock} from '../../../../mock';
import {LoginSuccessResponse} from '../../shared/models/authentication';
import User from '../../shared/models/user';
import {UserCleanup} from '../user/user.actions';

describe('wallet.effects', () => {
  let effects: WalletEffects;
  let actions: Observable<any>;
  let mockWalletService: WalletService;

  beforeEach(() => {
    mockWalletService = mock(WalletService);
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
        WalletEffects,
        {provide: WalletService, useValue: mockWalletService},
        provideMockStore({initialState: initialAppStates}),
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.get(WalletEffects);
    mockWalletService = TestBed.get(WalletService);
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

  describe('WalletSetup', () => {
    it('should correctly call walletService.setupWallet with NO payload when payload is NOT provided in the action', () => {
      // we don't test the error thrown here but below in another test so we return some random mock
      const wallet = new Wallet();
      (<jasmine.Spy>mockWalletService.setupWallet).and.returnValue(of(wallet));
      actions = hot('a|', {a: new WalletSetup()});
      const expected = cold('b|', {b: new WalletGenerated({wallet})});
      expect(effects.WalletSetup).toBeObservable(expected);
      expect(mockWalletService.setupWallet).toHaveBeenCalledWith(undefined);
    });

    it('should correctly call walletService.setupWallet with payload when payload is provided in the action', () => {
      const wallet = new Wallet();
      (<jasmine.Spy>mockWalletService.setupWallet).and.returnValue(of(wallet));
      const payload: LoginSuccessResponse = {
        wallet,
        user: new User(),
        token: 'asdf',
        password: 'asdf',
      };
      actions = hot('a|', {a: new WalletSetup(payload)});
      const expected = cold('b|', {b: new WalletGenerated({wallet})});
      expect(effects.WalletSetup).toBeObservable(expected);
      expect(mockWalletService.setupWallet).toHaveBeenCalledWith(payload);
    });

    it('should correctly return WalletGenerated action when walletService.setupWallet returns a wallet', () => {
      const wallet = new Wallet();
      (<jasmine.Spy>mockWalletService.setupWallet).and.returnValue(of(wallet));
      const payload: LoginSuccessResponse = {
        wallet,
        user: new User(),
        token: 'asdf',
        password: 'asdf',
      };
      actions = hot('a|', {a: new WalletSetup(payload)});
      const expected = cold('b|', {b: new WalletGenerated({wallet})});
      expect(effects.WalletSetup).toBeObservable(expected);
    });

    it('should correctly return WalletSetupFailed action when walletService.setupWallet returns a new Error', () => {
      (<jasmine.Spy>mockWalletService.setupWallet).and.returnValue(throwError(new Error()));
      actions = hot('a|', {a: new WalletSetup()});
      const expected = cold('b|', {b: new WalletSetupFailed()});
      expect(effects.WalletSetup).toBeObservable(expected);
    });

  });

  describe('WalletSetupFailed', () => {
    it('should correctly dispatch UserCleanup and WalletCleanup actions', () => {
      actions = hot('a---|', {a: new WalletSetupFailed()});
      const expected = cold('(bc)|', {b: new UserCleanup(), c: new WalletCleanup()});
      expect(effects.WalletSetupFailed).toBeObservable(expected);
    });
  });

  describe('WalletCleanup', () => {
    it('should correctly call authService.unsetTokenAndUnAuthenticate', () => {
      actions = cold('a', {a: new WalletCleanup()});

      effects.WalletCleanup.subscribe(() => {
        expect(mockWalletService.unsetWallet).toHaveBeenCalledWith();
      });
    });
  });
});
