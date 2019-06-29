import {reducer} from './editor.reducer';
import {
  EditorLoad,
  EditorStoryLoadSuccess,
  EditorStoryPropertyChange,
  EditorStoryPropertySave,
  EditorStoryPropertySaveFailure,
  EditorStoryPropertySaveSuccess, EditorStoryPublishSuccess,
  EditorStorySave,
  EditorStorySaveAndPublish,
  EditorStorySaveFailure,
  EditorStorySaveSuccess,
  EditorUnload
} from './editor.actions';
import Story from '../../story/models/story';
import {STORY_PROPERTIES} from '../shared/editor.story-properties';
import {ELEMENT_TYPES} from '../shared/json-to-html';
import {EDITOR_STATUS, EditorState, initialEditorState} from './editor.state';

const SHARED_MOCKS = {
  story: new Story(),
  codedErrorResponse: {
    code: 400,
    desc: 'EXAMPLE_FAILURE',
    httpCode: 400,
  },
};

describe('editor.reducer', () => {
  describe('initialEditorState', () => {
    it('should have isLoaded: false, status: NotInitialized, story: new Story()', () => {
      const state: EditorState = reducer(undefined, {} as EditorLoad);

      expect(state).toBe(initialEditorState);
    });
  });
  describe('EditorLoad', () => {
    it('should return state with status EditorLoaded', () => {
      const state: EditorState = reducer(undefined, new EditorLoad());

      expect(state.status).toBe(EDITOR_STATUS.EditorLoaded);
    });
  });
  describe('EditorUnload', () => {
    it('should return state with status NotInitialized', () => {
      const state: EditorState = reducer(undefined, new EditorUnload());

      expect(state.status).toBe(EDITOR_STATUS.NotInitialized);
    });
  });
  describe('EditorStoryLoadSuccess', () => {
    it('should return state with status StoryLoaded and with story', () => {
      const state: EditorState = reducer(undefined, new EditorStoryLoadSuccess(SHARED_MOCKS.story));

      expect(state.status).toBe(EDITOR_STATUS.StoryLoaded);
      expect(state.story).toEqual(SHARED_MOCKS.story);
    });
  });
  describe('EditorStoryPropertyChange', () => {
    describe('should return state with updated', function () {
      it('title and status NotSaved', () => {
        const payload = {
          property: STORY_PROPERTIES.Title,
          value: 'test'
        };
        const state: EditorState = reducer(undefined, new EditorStoryPropertyChange(payload));

        expect(state.status).toBe(EDITOR_STATUS.NotSaved);
        expect(state.story.title).toEqual(payload.value);
      });
      it('title and status NotSaved', () => {
        const payload = {
          property: STORY_PROPERTIES.Title,
          value: 'test'
        };
        const state: EditorState = reducer(undefined, new EditorStoryPropertyChange(payload));

        expect(state.status).toBe(EDITOR_STATUS.NotSaved);
        expect(state.story.title).toEqual(payload.value);
      });
      it('bodyJSON and status NotSaved', () => {
        const payload = {
          property: STORY_PROPERTIES.BodyJSON,
          value: [
            {
              type: ELEMENT_TYPES.Paragraph,
              data: {
                text: 'asdf',
              }
            }
          ]
        };
        const state: EditorState = reducer(undefined, new EditorStoryPropertyChange(payload));

        expect(state.status).toBe(EDITOR_STATUS.NotSaved);
        expect(state.story.bodyJSON).toEqual(payload.value);
      });
      it('hashtags', () => {
        const payload = {
          property: STORY_PROPERTIES.Hashtags,
          value: [
            {
              id: 1,
              hashtag: 'test',
              createdAt: (new Date()).toISOString(),
              updatedAt: (new Date()).toISOString(),
              userPostId: 43,
            }
          ]
        };
        const state: EditorState = reducer(undefined, new EditorStoryPropertyChange(payload));

        expect(state.story.userPostHashtags).toEqual(payload.value);
      });
      it('paidSectionCost', () => {
        const payload = {
          property: STORY_PROPERTIES.PaidSectionCost,
          value: 1
        };
        const state: EditorState = reducer(undefined, new EditorStoryPropertyChange(payload));

        expect(state.story.paidSectionCost).toEqual(payload.value);
      });
      it('paidSectionLinebreak', () => {
        const payload = {
          property: STORY_PROPERTIES.PaidSectionLinebreak,
          value: 2
        };
        const state: EditorState = reducer(undefined, new EditorStoryPropertyChange(payload));

        expect(state.story.paidSectionLinebreak).toEqual(payload.value);
      });
      it('hasPaidSection', () => {
        const payload = {
          property: STORY_PROPERTIES.HasPaidSection,
          value: true
        };
        const state: EditorState = reducer(undefined, new EditorStoryPropertyChange(payload));

        expect(state.story.hasPaidSection).toEqual(payload.value);
      });
    });
  });

  describe('EditorStoryPropertySave', () => {
    it('should return Saving status', () => {
      const state: EditorState = reducer(
        undefined,
        new EditorStoryPropertySave({story: new Story(), property: STORY_PROPERTIES.Title}));

      expect(state.status).toBe(EDITOR_STATUS.Saving);
    });
  });

  describe('EditorStoryPropertySaveSuccess', () => {
    it('should return Saved status', () => {
      const state: EditorState = reducer(
        undefined,
        new EditorStoryPropertySaveSuccess()
      );

      expect(state.status).toBe(EDITOR_STATUS.Saved);
    });
  });
  describe('EditorStoryPropertySaveFailure', () => {
    it('should return NotSaved status', () => {
      const state: EditorState = reducer(
        undefined,
        new EditorStoryPropertySaveFailure()
      );

      expect(state.status).toBe(EDITOR_STATUS.NotSaved);
    });
  });

  describe('EditorStorySave', () => {
    it('should return Saving status and updatedAt equal to NOW', () => {
      const state: EditorState = reducer(
        undefined,
        new EditorStorySave()
      );

      expect(state.status).toBe(EDITOR_STATUS.Saving);
      expect(state.story.updatedAt).toBeDefined();
    });
  });

  describe('EditorStorySaveSuccess', () => {
    it('should return Saved status', () => {
      const state: EditorState = reducer(
        undefined,
        new EditorStorySaveSuccess(new Story())
      );

      expect(state.status).toBe(EDITOR_STATUS.Saved);
    });
  });

  describe('EditorStorySaveFailure', () => {
    it('should return NotSaved status', () => {
      const state: EditorState = reducer(
        undefined,
        new EditorStorySaveFailure(SHARED_MOCKS.codedErrorResponse)
      );

      expect(state.status).toBe(EDITOR_STATUS.NotSaved);
    });
  });

  describe('EditorStorySaveAndPublish', () => {
    it('should return Publishing status', () => {
      const state: EditorState = reducer(
        undefined,
        new EditorStorySaveAndPublish(new Story(), [STORY_PROPERTIES.Title])
      );

      expect(state.status).toBe(EDITOR_STATUS.Publishing);
    });
  });
  describe('EditorStoryPublishSuccess', () => {
    it('should return Published status with the updated story', () => {
      const state: EditorState = reducer(
        undefined,
        new EditorStoryPublishSuccess({...new Story(), title: 'test'})
      );

      expect(state.status).toBe(EDITOR_STATUS.Published);
      expect(state.story.title).toBe('test');
    });
  });
});
