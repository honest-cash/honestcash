import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Store, StoreModule} from '@ngrx/store';
import {AppStates, metaReducers, reducers} from '../../../app.states';
import {initialState as initialAuthState, State as AuthState} from './auth.state';

describe('AuthState', () => {
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
    it('should have auth key', () => {
      expect(store.select('auth')).toBeDefined();
    });
  });

  describe('AuthStore', () => {
    it('should have auth key with initialState', (done) => {
      const authStore = store.select('auth');
      authStore.subscribe((state: AuthState) => {
        expect(state).toEqual(initialAuthState);
        done();
      });
    });
  });

});
