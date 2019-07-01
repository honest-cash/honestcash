import {FailedResponse} from '../models/authentication';

export interface AuthState {
  // is a user authenticated?
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  errorMessage: FailedResponse | string | { error: { code: string } };
  newPasswordRequested: boolean;
  newPasswordSet: boolean;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  token: null,
  errorMessage: null,
  newPasswordRequested: false,
  newPasswordSet: false
};
