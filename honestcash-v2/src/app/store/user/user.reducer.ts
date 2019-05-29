import {All, UserActionTypes} from './user.actions';
import {initialState, State} from './user.state';
import {Logger} from '../../core';

const logger = new Logger();

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case UserActionTypes.USER_SETUP: {
      logger.info('User Setup Started');
      return state;
    }
    case UserActionTypes.USER_CLEANUP: {
      logger.info('User Clenaup Success');
      return initialState;
    }
    case UserActionTypes.USER_LOADED: {
      logger.info('User Loaded', action.payload.user);
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
