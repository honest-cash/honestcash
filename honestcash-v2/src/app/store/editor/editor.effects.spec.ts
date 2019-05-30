import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';
import {EditorEffects} from './editor.effects';
import {HttpClientTestingModule} from '@angular/common/http/testing';

xdescribe('editor.effects', () => {
  let effects: EditorEffects;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        EditorEffects,
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.get(EditorEffects);
  });

  afterEach(() => {
    // Cleanup
  });

  describe('instance', () => {
    it('should have been initialized', () => {
      expect(effects).toBeDefined();
    });
  });

  describe('EditorLoad', () => {
  });

  describe('EditorUnload', () => {
  });
});
