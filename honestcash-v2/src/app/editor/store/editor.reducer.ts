import {All, EditorActionTypes} from './editor.actions';
import {EDITOR_STORY_PROPERTIES} from '../shared/editor.story-properties';
import {EDITOR_STATUS, EditorState, initialEditorState} from './editor.state';

export function reducer(state = initialEditorState, action: All): EditorState {
  switch (action.type) {
    case EditorActionTypes.EDITOR_LOAD: {
      return {
        ...state,
        status: EDITOR_STATUS.EditorLoaded,
      };
    }
    case EditorActionTypes.EDITOR_UNLOAD: {
      return initialEditorState;
    }
    case EditorActionTypes.EDITOR_STORY_LOAD_SUCCESS: {
      return {
        ...state,
        story: action.payload,
        status: EDITOR_STATUS.StoryLoaded
      };
    }
    case EditorActionTypes.EDITOR_STORY_PROPERTY_CHANGE: {
      let property: string;
      switch (action.payload.property) {
        case EDITOR_STORY_PROPERTIES.Title: {
          property = 'title';
          break;
        }
        case EDITOR_STORY_PROPERTIES.Body: {
          property = 'body';
          break;
        }
        case EDITOR_STORY_PROPERTIES.BodyJSON: {
          property = 'bodyJSON';
          break;
        }
        case EDITOR_STORY_PROPERTIES.Hashtags: {
          property = 'userPostHashtags';
          break;
        }
        case EDITOR_STORY_PROPERTIES.PaidSectionCost: {
          property = 'paidSectionCost';
          break;
        }
        case EDITOR_STORY_PROPERTIES.PaidSectionLinebreak: {
          property = 'paidSectionLinebreak';
          break;
        }
        case EDITOR_STORY_PROPERTIES.HasPaidSection: {
          property = 'hasPaidSection';
          break;
        }
      }
      return {
        ...state,
        story: {
          ...state.story,
          [property]: action.payload.value
        },
        status: property === EDITOR_STORY_PROPERTIES.BodyJSON ||
        property === EDITOR_STORY_PROPERTIES.Title ?
          EDITOR_STATUS.NotSaved : state.status,
      };
    }
    case EditorActionTypes.EDITOR_STORY_PROPERTY_SAVE: {
      return {
        ...state,
        status: EDITOR_STATUS.Saving,
      };
    }
    case EditorActionTypes.EDITOR_STORY_PROPERTY_SAVE_SUCCESS: {
      return {
        ...state,
        status: EDITOR_STATUS.Saved
      };
    }
    case EditorActionTypes.EDITOR_STORY_PROPERTY_SAVE_FAILURE: {
      return {
        ...state,
        status: EDITOR_STATUS.NotSaved
      };
    }
    case EditorActionTypes.EDITOR_STORY_SAVE: {
      const story = {
        ...state.story,
        updatedAt: new Date().toString(),
      };
      return {
        ...state,
        story,
        status: EDITOR_STATUS.Saving,
      };
    }
    case EditorActionTypes.EDITOR_STORY_SAVE_SUCCESS: {
      return {
        ...state,
        status: EDITOR_STATUS.Saved,
      };
    }
    case EditorActionTypes.EDITOR_STORY_SAVE_FAILURE: {
      return {
        ...state,
        status: EDITOR_STATUS.NotSaved,
      };
    }
    case EditorActionTypes.EDITOR_STORY_SAVE_AND_PUBLISH: {
      return {
        ...state,
        story: action.payload,
        status: EDITOR_STATUS.Publishing,
      };
    }
    case EditorActionTypes.EDITOR_STORY_PUBLISH_SUCCESS: {
      return {
        ...state,
        story: action.payload,
        status: EDITOR_STATUS.Published,
      };
    }
    default: {
      return state;
    }
  }
}
