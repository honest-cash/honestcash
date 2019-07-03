import {All, StoryActionTypes} from './story.actions';
import {initialStoryState, StoryState} from './story.state';
import {TRANSACTION_TYPES} from '../../wallet/models/transaction';
import Story from '../models/story';
import {Unlock} from '../models/unlock';
import {ENVIRONMENT_DEFAULTS} from '../../../environments/environment';
import Hashtag from '../../editor/models/hashtag';

const appendShareUrls = (story: Story) => {
  story.shareURLs = {
    reddit: `https://reddit.com/submit?url=${ENVIRONMENT_DEFAULTS.clientUrl}${story.user.username}/` +
      `${story.alias}&title=${story.title}`,
    twitter: `https://twitter.com/intent/tweet?url=${ENVIRONMENT_DEFAULTS.clientUrl}${story.user.username}/${story.alias}` +
      `&text=${story.title}&via=honest_cash&hashtags=${(story.userPostHashtags as Hashtag[]).map((hashtag: Hashtag) => hashtag.hashtag).join(',')}`,
  };
  return story;
};

export function reducer(state = initialStoryState, action: All): StoryState {
  switch (action.type) {
    case StoryActionTypes.STORY_LOAD_SUCCESS: {
      const story = appendShareUrls(action.payload);
      return {
        ...initialStoryState,
        story,
        isLoading: false,
      };
    }
    case StoryActionTypes.STORY_PROPERIES_LOAD_SUCCESS: {
      return {
        ...state,
        comments: action.payload[0],
        upvotes: action.payload[1],
        unlocks: action.payload[2],
        isLoadingProperties: {
          [TRANSACTION_TYPES.Upvote]: false,
          [TRANSACTION_TYPES.Unlock]: false,
          [TRANSACTION_TYPES.Comment]: false,
        }
      };
    }
    case StoryActionTypes.STORY_PROPERTY_UPDATE: {

      let property = '';
      let propertyValue;
      const story = state.story;
      if (action.payload.property === TRANSACTION_TYPES.Upvote) {
        property = 'upvotes';
        propertyValue = action.payload.value;
      }
      if (action.payload.property === TRANSACTION_TYPES.Unlock) {
        property = 'unlocks';
        propertyValue = action.payload.value[0] as Unlock[];
        story.body = (action.payload.value[1] as Story).body;
        story.hasBeenPaidFor = true;
      }
      if (action.payload.property === TRANSACTION_TYPES.Comment) {
        property = 'comments';
        propertyValue = action.payload.value;
      }

      return {
        ...state,
        story,
        [property]: propertyValue,
        isLoadingProperties: {
          ...state.isLoadingProperties,
          [action.payload.property]: false,
        },
        isPropertySaving: false,
        savingProperty: undefined,
        hasCommentDraftLoaded: false,
        commentDraft: undefined,
        commentParent: undefined,
      };
    }
    case StoryActionTypes.STORY_PROPERTY_SAVE: {
      return {
        ...state,
        isLoadingProperties: {
          ...state.isLoadingProperties,
          [action.payload.property]: true,
        },
        isPropertySaving: true,
        savingProperty: action.payload.property
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
