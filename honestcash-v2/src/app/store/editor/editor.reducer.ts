import {All, EditorActionTypes} from './editor.actions';
import {EDITOR_STATUS, initialState, State} from './editor.state';
import {STORY_PROPERTIES} from '../../modules/editor/services/editor.service';
import {Logger} from '../../shared/services/logger.service';
import blankBody from './editor.story.body.initial-value';

const logger = new Logger();

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case EditorActionTypes.EDITOR_LOAD: {
      logger.info('Editor Load Success');
      return {
        ...state,
        isLoaded: true,
        status: EDITOR_STATUS.Initialized,
      };
    }
    case EditorActionTypes.EDITOR_UNLOAD: {
      logger.info('Editor Unload Success');
      return initialState;
    }
    case EditorActionTypes.EDITOR_DRAFT_LOAD_SUCCESS: {
      logger.info('Editor Draft Load Success', action.payload);
      return {
        ...state,
        story: {
          ...action.payload,
          // DraftLoadSuccess is only called on write page
          // so we can inject a blankBody to guide user through
          bodyJSON: action.payload.bodyJSON ? action.payload.bodyJSON : blankBody,
        },
        status: EDITOR_STATUS.Loaded
      };
    }
    case EditorActionTypes.EDITOR_STORY_LOAD_SUCCESS: {
      logger.info('Editor Story Load Success', action.payload);
      return {
        ...state,
        story: {
          ...action.payload,
          bodyJSON: action.payload.bodyJSON
        },
        status: EDITOR_STATUS.Loaded
      };
    }
    case EditorActionTypes.EDITOR_STORY_LOCAL_LOAD_SUCCESS: {
      logger.info('Editor Story Local Load Success', action.payload);
      return {
        ...state,
        story: {
          ...action.payload,
          bodyJSON: action.payload.bodyJSON
        },
        status: EDITOR_STATUS.Loaded
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
        case STORY_PROPERTIES.BodyJSON: {
          property = 'bodyJSON';
          break;
        }
        case STORY_PROPERTIES.Hashtags: {
          property = 'userPostHashtags';
          break;
        }
        case STORY_PROPERTIES.PaidSectionCost: {
          property = 'paidSectionCost';
          break;
        }
        case STORY_PROPERTIES.PaidSectionLinebreak: {
          property = 'paidSectionLinebreak';
          break;
        }
        case STORY_PROPERTIES.HasPaidSection: {
          property = 'hasPaidSection';
          break;
        }
      }
      logger.info(`Editor Story Property [${property}] Change`, action.payload.value);
      return {
        ...state,
        story: {
          ...state.story,
          [property]: action.payload.value
        },
        status: property === STORY_PROPERTIES.Body ||
        property === STORY_PROPERTIES.BodyJSON ||
        property === STORY_PROPERTIES.Title ?
          EDITOR_STATUS.NotSaved : state.status,
      };
    }
    case EditorActionTypes.EDITOR_STORY_PROPERTY_SAVE: {
      logger.info(`Editor Story Property [${action.payload.property}] Save`);
      return {
        ...state,
        status: EDITOR_STATUS.Saving,
      };
    }
    case EditorActionTypes.EDITOR_STORY_PROPERTY_SAVE_SUCCESS: {
      logger.info(`Editor Story Property Save Success`);
      return {
        ...state,
        status: EDITOR_STATUS.Saved
      };
    }
    case EditorActionTypes.EDITOR_STORY_PROPERTY_SAVE_FAILURE: {
      logger.info(`Editor Story Property Save Success`);
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
      logger.info('Editor Story Save Success Started', story);
      return {
        ...state,
        story,
        status: EDITOR_STATUS.Saving,
      };
    }
    case EditorActionTypes.EDITOR_STORY_SAVE_SUCCESS: {
      logger.info('Editor Story Save Success');
      return {
        ...state,
        status: EDITOR_STATUS.Saved,
      };
    }
    case EditorActionTypes.EDITOR_STORY_SAVE_AND_PUBLISH: {
      logger.info('Editor Story Publish Started', action.payload);
      return {
        ...state,
        story: action.payload,
        status: EDITOR_STATUS.Publishing,
      };
    }
    case EditorActionTypes.EDITOR_STORY_PUBLISH_SUCCESS: {
      logger.info('Editor Story Publish Success', action.payload);
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
