
import { UserActionTypes, All } from './user.actions';
import { State, initialState } from './user.state';

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case UserActionTypes.USER_SETUP: {
      return {
        user: action.payload.user,
      };
    }
    case UserActionTypes.USER_CLEANUP: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
