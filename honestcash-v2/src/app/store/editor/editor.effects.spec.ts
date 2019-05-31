import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';
import {EditorEffects} from './editor.effects';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {localStorageProvider, LocalStorageToken} from '../../core/helpers/localStorage';
import {RouterTestingModule} from '@angular/router/testing';

describe('editor.effects', () => {
  let effects: EditorEffects;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        EditorEffects,
        {provide: LocalStorageToken, useFactory: localStorageProvider},
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
