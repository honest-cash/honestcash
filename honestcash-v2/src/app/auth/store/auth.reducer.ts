import {All, AuthActionTypes} from './auth.actions';
import {initialState, State} from './auth.state';
import {Logger} from '../../../core/shared/services/logger.service';

const logger = new Logger();

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      logger.info('LogIn Started');
      return {
        ...initialState,
        isLoading: true,
      };
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      logger.info('LogIn Success');
      return {
        ...initialState,
        isLoading: false,
        token: action.payload.token,
        isAuthenticated: true,
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      logger.error('LogIn Failed', action.payload);
      return {
        ...initialState,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.SIGNUP: {
      logger.info('SignUp Started');
      return {
        ...initialState,
        isLoading: true,
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      logger.info('SignUp Success');
      return {
        ...initialState,
        token: action.payload.token,
        isAuthenticated: true,
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      logger.error('SignUp Failed', action.payload);
      return {
        ...initialState,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.RESET_PASSWORD_SUCCESS: {
      logger.info('Reset Password Success');
      return {
        ...state,
        newPasswordSet: true
      };
    }
    case AuthActionTypes.RESET_PASSWORD_FAILURE: {
      logger.error('Reset Password Failed', action.payload);
      return {
        ...initialState,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.RESET_PASSWORD_REQUEST_FAILURE: {
      logger.error('Reset Password Request Failed', action.payload);
      return {
        ...initialState,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.RESET_PASSWORD_REQUEST_SUCCESS: {
      logger.info('Reset Password Request Success');
      return {
        ...initialState,
        newPasswordRequested: true
      };
    }
    case AuthActionTypes.ROOT_REDIRECT: {
      logger.info('Redirecting to Root');
      return state;
    }
    case AuthActionTypes.LOGOUT: {
      logger.info('LogOut Success');
      return initialState;
    }
    default: {
      return state;
    }
  }
}
