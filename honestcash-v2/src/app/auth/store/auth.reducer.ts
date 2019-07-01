import {All, AuthActionTypes} from './auth.actions';
import {AuthState, initialAuthState} from './auth.state';

export function reducer(state = initialAuthState, action: All): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      return {
        ...initialAuthState,
        isLoading: true,
      };
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...initialAuthState,
        isLoading: false,
        token: action.payload.token,
        isAuthenticated: true,
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...initialAuthState,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.SIGNUP: {
      return {
        ...initialAuthState,
        isLoading: true,
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...initialAuthState,
        token: action.payload.token,
        isAuthenticated: true,
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...initialAuthState,
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
        ...initialAuthState,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.RESET_PASSWORD_REQUEST_FAILURE: {
      return {
        ...initialAuthState,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.RESET_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...initialAuthState,
        newPasswordRequested: true
      };
    }
    case AuthActionTypes.ROOT_REDIRECT: {
      return state;
    }
    case AuthActionTypes.LOGOUT: {
      return initialAuthState;
    }
    default: {
      return state;
    }
  }
}
