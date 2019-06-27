import {All, AuthActionTypes} from './auth.actions';
import {Logger} from '../../../core/shared/services/logger.service';
import {AuthState, initialAuthState} from './auth.state';

const logger = new Logger();

export function reducer(state = initialAuthState, action: All): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      logger.info('LogIn Started');
      return {
        ...initialAuthState,
        isLoading: true,
      };
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      logger.info('LogIn Success');
      return {
        ...initialAuthState,
        isLoading: false,
        token: action.payload.token,
        isAuthenticated: true,
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      logger.error('LogIn Failed', action.payload);
      return {
        ...initialAuthState,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.SIGNUP: {
      logger.info('SignUp Started');
      return {
        ...initialAuthState,
        isLoading: true,
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      logger.info('SignUp Success');
      return {
        ...initialAuthState,
        token: action.payload.token,
        isAuthenticated: true,
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      logger.error('SignUp Failed', action.payload);
      return {
        ...initialAuthState,
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
        ...initialAuthState,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.RESET_PASSWORD_REQUEST_FAILURE: {
      logger.error('Reset Password Request Failed', action.payload);
      return {
        ...initialAuthState,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.RESET_PASSWORD_REQUEST_SUCCESS: {
      logger.info('Reset Password Request Success');
      return {
        ...initialAuthState,
        newPasswordRequested: true
      };
    }
    case AuthActionTypes.ROOT_REDIRECT: {
      logger.info('Redirecting to Root');
      return state;
    }
    case AuthActionTypes.LOGOUT: {
      logger.info('LogOut Success');
      return initialAuthState;
    }
    default: {
      return state;
    }
  }
}
