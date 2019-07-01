import {All, UserActionTypes} from './user.actions';
import {initialUserState, UserState} from './user.state';

export function reducer(state = initialUserState, action: All): UserState {
  switch (action.type) {
    case UserActionTypes.USER_SETUP: {
      return state;
    }
    case UserActionTypes.USER_CLEANUP: {
      return initialUserState;
    }
    case UserActionTypes.USER_LOADED: {
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
