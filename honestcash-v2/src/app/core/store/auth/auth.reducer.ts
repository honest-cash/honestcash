import {All, AuthActionTypes} from './auth.actions';
import {initialState, State} from './auth.state';

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      return {
        ...initialState,
        isLoading: true,
      };
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...initialState,
        isLoading: false,
        token: action.payload.token,
        isAuthenticated: true,
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...initialState,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.SIGNUP: {
      return {
        ...initialState,
        isLoading: true,
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...initialState,
        token: action.payload.token,
        isAuthenticated: true,
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...initialState,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        newPasswordSet: true
      };
    }
    case AuthActionTypes.RESET_PASSWORD_FAILURE: {
      return {
        ...initialState,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.RESET_PASSWORD_REQUEST_FAILURE: {
      return {
        ...initialState,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.RESET_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...initialState,
        newPasswordRequested: true
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
