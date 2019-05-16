import {All, EditorActionTypes} from './editor.actions';
import {EDITOR_SAVE_STATUS, initialState, State} from './editor.state';
import blankBody from './editor.story.body.initial-value';
import {STORY_PROPERTIES} from '../../../modules/editor/services/editor.service';

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case EditorActionTypes.EDITOR_LOAD: {
      const story = action.payload ? action.payload.story : initialState.story;
      if (!action.payload) {
        // set a body to the draft
        // to guide the user through the editor features
        story.body = blankBody;
      }
      return {
        ...state,
        isLoaded: true,
        status: EDITOR_SAVE_STATUS.Initialized,
        story,
      };
    }
    case EditorActionTypes.EDITOR_UNLOAD: {
      return initialState;
    }
    case EditorActionTypes.EDITOR_CHANGE: {
      return {
        ...state,
        story: action.payload,
        status: EDITOR_SAVE_STATUS.NotSaved,
      };
    }
    case EditorActionTypes.EDITOR_STORY_PROPERTY_CHANGE: {
      let property: string;
      switch (action.payload.property) {
        case STORY_PROPERTIES.Title: {
          property = 'title';
          break;
        }
        case STORY_PROPERTIES.Body: {
          property = 'body';
          break;
        }
        case STORY_PROPERTIES.Hashtags: {
          property = 'userPostHashtags';
          break;
        }
        case STORY_PROPERTIES.PaidSection: {
          // @ todo
          break;
        }
      }
      return {
        ...state,
        story: {
          ...state.story,
          [property]: action.payload.value
        }
      };
    }
    case EditorActionTypes.EDITOR_STORY_PROPERTY_SAVE: {
      return {
        ...state,
        status: action.payload.property === STORY_PROPERTIES.Body ? EDITOR_SAVE_STATUS.Saved : state.status,
      };
    }
    case EditorActionTypes.EDITOR_STORY_SAVE: {
      return {
        ...state,
        story: {
          ...state.story,
          updatedAt: new Date().toString(),
        },
        status: EDITOR_SAVE_STATUS.Saving,
      };
    }
    case EditorActionTypes.EDITOR_STORY_SAVE_SUCCESS: {
      return {
        ...state,
        status: EDITOR_SAVE_STATUS.Saved,
      };
    }
    case EditorActionTypes.EDITOR_STORY_PUBLISH: {
      return {
        ...state,
        story: action.payload,
        status: EDITOR_SAVE_STATUS.Publishing,
      };
    }
    case EditorActionTypes.EDITOR_STORY_PUBLISH_SUCCESS: {
      return {
        ...state,
        story: action.payload,
        status: EDITOR_SAVE_STATUS.Published,
      };
    }
    default: {
      return state;
    }
  }
}
