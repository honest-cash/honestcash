import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Store, StoreModule} from '@ngrx/store';
import {AppStates, metaReducers, reducers} from '../../app.states';
import {initialState as initialEditorState, State as EditorState} from './editor.state';

xdescribe('EditorState', () => {
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
    it('should have app key', () => {
      expect(store.select('editor')).toBeDefined();
    });
  });

  describe('EditorStore', () => {
    it('should have editor key with initialState', (done) => {
      const appStore = store.select('editor');
      appStore.subscribe((state: EditorState) => {
        expect(state).toEqual(initialEditorState);
        done();
      });
    });
  });

});
