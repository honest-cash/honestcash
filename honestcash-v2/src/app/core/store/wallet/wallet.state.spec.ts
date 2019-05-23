import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Store, StoreModule} from '@ngrx/store';
import {AppStates, metaReducers, reducers} from '../../../app.states';
import {initialState as initialWalletState, State as WalletState} from './wallet.state';

describe('WalletState', () => {
  let store: Store<AppStates>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(reducers, {metaReducers}),
      ],
      providers: []
    });
    store = TestBed.get(Store);
  });

  afterEach(() => {
    // Cleanup
  });

  describe('instance', () => {
    it('should have been initialized', () => {
      expect(store).toBeDefined();
    });
  });

  describe('store', () => {
    it('should have wallet key', () => {
      expect(store.select('wallet')).toBeDefined();
    });
  });

  describe('WalletStore', () => {
    it('should have wallet key with initialState', (done) => {
      const authStore = store.select('wallet');
      authStore.subscribe((state: WalletState) => {
        expect(state).toEqual(initialWalletState);
        done();
      });
    });
  });

});
