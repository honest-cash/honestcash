
import { AuthActionTypes, All } from './auth.actions';
import { State, initialState } from './auth.state';

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
