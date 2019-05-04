import {FailedResponse} from '../../models/authentication';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  errorMessage: FailedResponse | string;
}

export const initialState: State = {
  isAuthenticated: false,
  isLoading: false,
  token: null,
  errorMessage: null,
};
