import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of, throwError} from 'rxjs';
import {EditorEffects} from './editor.effects';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {localStorageProvider, LocalStorageToken} from '../../../core/shared/helpers/local-storage.helper';
import {RouterTestingModule} from '@angular/router/testing';
import * as EditorActions from './editor.actions';
import {cold, hot} from 'jasmine-marbles';
import Story from '../../main/models/story';
import {EditorService} from '../services/editor.service';
import {STORY_PROPERTIES} from '../shared/editor.story-properties';
import {mock} from '../../../../mock';

const SHARED_MOCKS = {
  codedErrorResponse: {
    code: 400,
    desc: 'EXAMPLE_FAILURE',
    httpCode: 400,
  },
  emptyResponse: {}
};

describe('editor.effects', () => {
  let effects: EditorEffects;
  let actions: Observable<any>;
  let mockEditorService: EditorService;

  beforeEach(() => {
    mockEditorService = mock(EditorService);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        EditorEffects,
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        {provide: EditorService, useValue: mockEditorService},
        provideMockActions(() => actions),
      ],
    });

    mockEditorService = TestBed.get(EditorService);
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

  describe('EditorStory', () => {
    describe('Load', () => {
      const mocks = {
        commentContext: {
          parentPostId: 1
        },
        postContext: {
          postId: 2
        },
        loadSuccess: new Story(),
        loadFailure: SHARED_MOCKS.codedErrorResponse
      };
      it('should correctly call editorService.loadPostDraft with NO context when context is NOT provided', () => {
        (<jasmine.Spy>mockEditorService.loadPostDraft).and.returnValue(of(new Story()));
        actions = cold('a', {a: new EditorActions.EditorStoryLoad()});

        effects.EditorStoryLoad.subscribe(() => {
          expect(mockEditorService.loadPostDraft).toHaveBeenCalledWith(undefined);
        });
      });
      it('should correctly call editorService.loadPostDraft with context when context is provided with storyId', () => {
        (<jasmine.Spy>mockEditorService.loadPostDraft).and.returnValue(of(new Story()));
        actions = cold('a', {a: new EditorActions.EditorStoryLoad(mocks.postContext)});

        effects.EditorStoryLoad.subscribe(() => {
          expect(mockEditorService.loadPostDraft).toHaveBeenCalledWith(mocks.postContext);
        });
      });
      it('should correctly call editorService.loadPostDraft with context when context is provided with parentPostId', () => {
        (<jasmine.Spy>mockEditorService.loadPostDraft).and.returnValue(of(new Story()));
        actions = cold('a', {a: new EditorActions.EditorStoryLoad(mocks.commentContext)});

        effects.EditorStoryLoad.subscribe(() => {
          expect(mockEditorService.loadPostDraft).toHaveBeenCalledWith(mocks.commentContext);
        });
      });
      it('should correctly return EditorStoryLoadSuccess', () => {
        (<jasmine.Spy>mockEditorService.loadPostDraft).and.returnValue(of(mocks.loadSuccess));
        const action = new EditorActions.EditorStoryLoad(mocks.postContext);

        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new EditorActions.EditorStoryLoadSuccess(mocks.loadSuccess)
        });
        expect(effects.EditorStoryLoad).toBeObservable(expected);
      });
      it('should correctly return EditorStoryLoadFailure', () => {
        (<jasmine.Spy>mockEditorService.loadPostDraft).and.returnValue(throwError(mocks.loadFailure));
        const action = new EditorActions.EditorStoryLoad(mocks.postContext);

        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new EditorActions.EditorStoryLoadFailure(mocks.loadFailure)
        });

        expect(effects.EditorStoryLoad).toBeObservable(expected);
      });
    });

    describe('PropertySave', () => {
      const mocks = {
        story: {
          ...new Story(),
          title: '123'
        },
        property: STORY_PROPERTIES.Title,
        saveSuccess: SHARED_MOCKS.emptyResponse,
        saveFailure: SHARED_MOCKS.codedErrorResponse
      };
      it('should correctly call editorService.savePostProperty with story and property', () => {
        (<jasmine.Spy>mockEditorService.savePostProperty).and.returnValue(of(mocks.saveSuccess));
        actions = cold('a', {a: new EditorActions.EditorStoryPropertySave({story: mocks.story, property: mocks.property})});

        effects.EditorStoryPropertySave.subscribe(() => {
          expect(mockEditorService.savePostProperty).toHaveBeenCalledWith(mocks.story, mocks.property);
        });

      });
      it('should correctly return EditorStoryPropertySaveSuccess', () => {
        (<jasmine.Spy>mockEditorService.savePostProperty).and.returnValue(of(mocks.saveSuccess));
        const action = new EditorActions.EditorStoryPropertySave({story: mocks.story, property: mocks.property});

        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new EditorActions.EditorStoryPropertySaveSuccess()
        });
        expect(effects.EditorStoryPropertySave).toBeObservable(expected);
      });
      it('should correctly return EditorStoryPropertySaveFailure', () => {
        (<jasmine.Spy>mockEditorService.savePostProperty).and.returnValue(throwError(mocks.saveFailure));
        const action = new EditorActions.EditorStoryPropertySave({story: mocks.story, property: mocks.property});

        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new EditorActions.EditorStoryPropertySaveFailure()
        });

        expect(effects.EditorStoryPropertySave).toBeObservable(expected);
      });
    });

    describe('SaveAndPublish', () => {
      const mocks = {
        story: {
          ...new Story(),
          title: '123'
        },
        property: STORY_PROPERTIES.Title,
        properties: [
          STORY_PROPERTIES.Title,
          STORY_PROPERTIES.PaidSection
        ],
        saveSuccess: SHARED_MOCKS.emptyResponse,
        saveFailure: SHARED_MOCKS.codedErrorResponse
      };
      it('should correctly call editorService.savePostProperty as many times of properties.length' +
        'with the property and with the story', () => {
        (<jasmine.Spy>mockEditorService.savePostProperty).and.returnValue(of(mocks.saveSuccess));

        actions = cold('a', {
          a: new EditorActions.EditorStorySaveAndPublish(
            mocks.story,
            mocks.properties
          )
        });

        effects.EditorStorySaveAndPublish.subscribe(() => {
          for (let index = 0; index < mocks.properties.length; index++) {
            expect(mockEditorService.savePostProperty).toHaveBeenCalledWith(mocks.story, mocks.properties[index]);
          }
        });

      });
      it('should correctly dispatch EditorStorySaveSuccess if response is OK', () => {
        (<jasmine.Spy>mockEditorService.savePostProperty).and.returnValue(of(mocks.saveSuccess));

        const action = new EditorActions.EditorStorySaveAndPublish(mocks.story, mocks.properties);

        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new EditorActions.EditorStorySaveSuccess(mocks.story)
        });
        expect(effects.EditorStorySaveAndPublish).toBeObservable(expected);
      });
      it('should correctly dispatch EditorStorySaveSuccess if response is NOT OK', () => {
        (<jasmine.Spy>mockEditorService.savePostProperty).and.returnValue(throwError(mocks.saveFailure));

        const action = new EditorActions.EditorStorySaveAndPublish(mocks.story, mocks.properties);

        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new EditorActions.EditorStorySaveFailure(mocks.saveFailure)
        });
        expect(effects.EditorStorySaveAndPublish).toBeObservable(expected);
      });
    });

    describe('SaveSuccess', () => {
      const mocks: any = {
        story: {
          ...new Story(),
          title: '123'
        },
        property: STORY_PROPERTIES.Title,
        properties: [
          STORY_PROPERTIES.Title,
          STORY_PROPERTIES.PaidSection
        ],
        publishFailure: SHARED_MOCKS.codedErrorResponse
      };
      mocks.publishSuccess = mocks.story;

      it('should correctly be triggered by EditorStorySaveAndPublish action', () => {
        (<jasmine.Spy>mockEditorService.savePostProperty).and.returnValue(of(mocks.saveSuccess));
        (<jasmine.Spy>mockEditorService.publishPost).and.returnValue(of(mocks.publishSuccess));

        const action = new EditorActions.EditorStorySaveAndPublish(mocks.story, mocks.properties);

        actions = hot('-a', {a: action});

        effects.EditorStorySaveSuccess.subscribe(() => {
          expect(mockEditorService.publishPost).toHaveBeenCalledWith(mocks.story);
        });

      });

      it('should correctly call editorService.publishPost with story', () => {
        (<jasmine.Spy>mockEditorService.publishPost).and.returnValue(of(mocks.publishSuccess));
        actions = cold('a', {
          a: new EditorActions.EditorStorySaveSuccess(mocks.story)
        });

        effects.EditorStorySaveSuccess.subscribe(() => {
          expect(mockEditorService.publishPost).toHaveBeenCalledWith(mocks.story);
        });

      });
      it('should correctly dispatch EditorStoryPublishSuccess if response is OK', () => {
        (<jasmine.Spy>mockEditorService.publishPost).and.returnValue(of(mocks.publishSuccess));

        const action = new EditorActions.EditorStorySaveSuccess(mocks.story);

        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new EditorActions.EditorStoryPublishSuccess(mocks.publishSuccess)
        });
        expect(effects.EditorStorySaveSuccess).toBeObservable(expected);
      });
      it('should correctly dispatch EditorStoryPublishFailure if response is NOT OK', () => {
        (<jasmine.Spy>mockEditorService.publishPost).and.returnValue(throwError(mocks.publishFailure));

        const action = new EditorActions.EditorStorySaveSuccess(mocks.story);

        actions = hot('-a', {a: action});
        const expected = cold('-b', {
          b: new EditorActions.EditorStoryPublishFailure(mocks.publishFailure)
        });
        expect(effects.EditorStorySaveSuccess).toBeObservable(expected);
      });
    });
  });
});
