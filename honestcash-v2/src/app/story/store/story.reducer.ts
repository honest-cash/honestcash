import {All, StoryActionTypes} from './story.actions';
import {Logger} from '../../../core/shared/services/logger.service';
import {initialStoryState, StoryState} from './story.state';
import {TRANSACTION_TYPES} from '../../../core/shared/models/transaction';

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
      let propertyData;
      if (action.payload.property === TRANSACTION_TYPES.Unlock) {
        story.unlockCount += 1;
        story.body = action.payload.story.body;
        property = 'unlocks';
        propertyData = [
          ...state[property],
          {user: state.pendingTransaction.transaction.sender},
        ];
      } else if (action.payload.property === TRANSACTION_TYPES.Upvote) {
        story.upvoteCount += 1;
        property = 'upvotes';
        propertyData = [
          ...state[property],
          {user: state.pendingTransaction.transaction.sender},
        ];
      } else if (action.payload.property === TRANSACTION_TYPES.Comment) {
        story.responseCount += 1;
        property = 'comments';
        propertyData = state.pendingTransaction.data;
        propertyData = [
          state.pendingTransaction.data, // add comment to top to make it look recent
          ...state[property],
        ];
      }

      const nextState = {
        ...state,
        isPropertySaving: false,
        pendingTransaction: undefined,
        story,
        [property]: propertyData,
      };

      return nextState;
    }
    default: {
      return state;
    }
  }
}
