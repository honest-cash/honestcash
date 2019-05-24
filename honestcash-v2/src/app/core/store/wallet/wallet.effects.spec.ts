import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {localStorageProvider, LocalStorageToken} from '../../helpers/localStorage';
import {resetLocalStorage} from '../../helpers/tests';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../mocks/app.states.mock';
import {Router} from '@angular/router';
import {cold, hot} from 'jasmine-marbles';
import {WalletEffects} from './wallet.effects';
import {WalletService} from '../../services/wallet.service';
import {WalletCleanup, WalletGenerated, WalletSetup} from './wallet.actions';
import Wallet from '../../models/wallet';
import {mock} from '../../../../../mock';
import {LoginSuccessResponse} from '../../models/authentication';
import User from '../../models/user';

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
    /*it('should correctly call walletService.setupWallet with NO payload when payload is NOT provided in the action', () => {
      const setupWalletSpy = spyOn(walletService, 'setupWallet');
      actions = cold('a', {a: new WalletSetup()});

      effects.WalletSetup.subscribe(() => {
        expect(setupWalletSpy).toHaveBeenCalledWith();
      });
    });*/

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

    it('should correctly return WalletGenerated action when payload is provided in the action', () => {
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

    it('should correctly call setWallet if payload is provided in the action', () => {
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
      expect(mockWalletService.setWallet).toHaveBeenCalledWith(wallet);
    });

    it('should NOT call setWallet if payload is NOT provided in the action', () => {
      (<jasmine.Spy>mockWalletService.setupWallet).and.returnValue(of(undefined));
      actions = hot('a|', {a: new WalletSetup()});
      const expected = cold('b|', {b: new WalletCleanup()});
      expect(effects.WalletSetup).toBeObservable(expected);
      expect(mockWalletService.setWallet).not.toHaveBeenCalled();
    });

    it('should correctly return WalletCleanup action when payload is NOT provided in the action', () => {
      (<jasmine.Spy>mockWalletService.setupWallet).and.returnValue(of(undefined));
      actions = hot('a|', {a: new WalletSetup()});
      const expected = cold('b|', {b: new WalletCleanup()});
      expect(effects.WalletSetup).toBeObservable(expected);
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
