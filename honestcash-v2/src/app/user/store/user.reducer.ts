import {All, UserActionTypes} from './user.actions';
import {initialUserState, UserState} from './user.state';
import {Logger} from '../../../core';

const logger = new Logger();

export function reducer(state = initialUserState, action: All): UserState {
  switch (action.type) {
    case UserActionTypes.USER_SETUP: {
      logger.info('User Setup Started');
      return state;
    }
    case UserActionTypes.USER_CLEANUP: {
      logger.info('User Clenaup Success');
      return initialUserState;
    }
    case UserActionTypes.USER_LOADED: {
      logger.info('User StoryLoaded', action.payload.user);
      return {
        ...state,
        user: action.payload.user
      };
    }
    default: {
      return state;
    }
  }
}
