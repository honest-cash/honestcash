import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Store, StoreModule} from '@ngrx/store';
import {AppStates, metaReducers, reducers} from '../../app.states';
import {initialState as initialUserState, State as UserState} from './user.state';

describe('UserState', () => {
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
    it('should have user key', () => {
      expect(store.select('user')).toBeDefined();
    });
  });

  describe('UserStore', () => {
    it('should have user key with initialState', (done) => {
      const authStore = store.select('user');
      authStore.subscribe((state: UserState) => {
        expect(state).toEqual(initialUserState);
        done();
      });
    });
  });

});
