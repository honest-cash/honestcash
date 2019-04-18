
import { AuthActionTypes, All } from '@store/auth/auth.actions';
import { State, initialState } from '@store/auth/auth.state';

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        password: action.payload.password,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        wallet: action.payload.wallet,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.USER_SETUP: {
      return {
        ...state,
        user: action.payload.user
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        password: action.payload.password,
        token: action.payload.token,
        user: action.payload.user,
        errorMessage: null
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: 'That email is already in use.'
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
