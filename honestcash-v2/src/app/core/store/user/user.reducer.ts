
import { UserActionTypes, All } from './user.actions';
import { State, initialState } from './user.state';

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case UserActionTypes.USER_SETUP: {
      return state;
    }
    case UserActionTypes.USER_CLEANUP: {
      return initialState;
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
