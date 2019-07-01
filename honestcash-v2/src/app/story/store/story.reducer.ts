import {All, StoryActionTypes} from './story.actions';
import {initialStoryState, StoryState} from './story.state';
import {TRANSACTION_TYPES} from '../../../core/shared/models/transaction';

export function reducer(state = initialStoryState, action: All): StoryState {
  switch (action.type) {
    case StoryActionTypes.STORY_LOAD_SUCCESS: {
      return {
        ...initialStoryState,
        story: action.payload,
        isLoading: false,
      };
    }
    case StoryActionTypes.STORY_PROPERIES_LOAD_SUCCESS: {
      return {
        ...state,
        comments: action.payload[0],
        upvotes: action.payload[1],
        unlocks: action.payload[2],
      };
    }
    case StoryActionTypes.STORY_PROPERTY_UPDATE: {

      let property = '';
      if (action.payload.property === TRANSACTION_TYPES.Upvote) {
        property = 'upvotes';
      }
      if (action.payload.property === TRANSACTION_TYPES.Unlock) {
        property = 'unlocks';
      }
      if (action.payload.property === TRANSACTION_TYPES.Comment) {
        property = 'comments';
      }

      return {
        ...state,
        [property]: action.payload.value,
        isPropertySaving: false,
        hasCommentDraftLoaded: false,
        commentDraft: undefined,
        commentParent: undefined,
      };
    }
    case StoryActionTypes.STORY_PROPERTY_SAVE: {
      return {
        ...state,
        isPropertySaving: true,
      };
    }
    case StoryActionTypes.STORY_COMMENT_DRAFT_BODY_CHANGE: {
      return {
        ...state,
        commentDraft: {
          ...state.commentDraft,
          body: action.payload
        }
      };
    }
    case StoryActionTypes.STORY_COMMENT_DRAFT_LOAD_SUCCESS: {
      return {
        ...state,
        commentDraft: action.payload,
        hasCommentDraftLoaded: true,
      };
    }
    case StoryActionTypes.STORY_COMMENT_CLICKED: {
      return {
        ...state,
        commentParent: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
