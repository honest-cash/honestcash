import {All, STORY_PROPERTIES, StoryActionTypes} from './story.actions';
import {Logger} from '../../../core/shared/services/logger.service';
import {initialStoryState, StoryState} from './story.state';
import Story from '../models/story';

const logger = new Logger();

export function reducer(state = initialStoryState, action: All): StoryState {
  switch (action.type) {
    case StoryActionTypes.STORY_LOAD_SUCCESS: {
      logger.info('Story Load Success');
      return {
        ...initialStoryState,
        story: action.payload[0],
        comments: action.payload[1],
        upvotes: action.payload[2],
        unlocks: action.payload[3],
        isLoading: false,
      };
    }
    case StoryActionTypes.STORY_PROPERTY_SAVE: {
      logger.info('Story Load Success');
      return {
        ...state,
        isPropertySaving: true,
        pendingTransaction: {
          type: action.payload.property,
          transaction: action.payload.transaction,
          data: action.payload.data,
          status: 'pending',
        }
      };
    }
    case StoryActionTypes.STORY_PROPERTY_SAVE_SUCCESS: {
      logger.info('Story Property Save Success');
      const story = state.story;

      let property;
      if (action.payload.property === STORY_PROPERTIES.Unlock) {
        story.unlockCount += 1;
        story.body = action.payload.story.body;
        property = 'unlocks';
      } else if (action.payload.property === STORY_PROPERTIES.Upvote) {
        story.upvoteCount += 1;
        property = 'upvotes';
      } else if (action.payload.property === STORY_PROPERTIES.Comment) {
        story.responseCount += 1;
        property = 'comments';
      }

      const propertyData = state.pendingTransaction.data;

      return {
        ...state,
        isPropertySaving: false,
        pendingTransaction: undefined,
        story,
        [property]: [
          propertyData,
          ...state[property],
        ]
      };
    }
    default: {
      return state;
    }
  }
}
