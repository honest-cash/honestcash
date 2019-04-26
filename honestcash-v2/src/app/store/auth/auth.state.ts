import User from '../../models/user';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;

  // if authenticated, there should be a user object
  user: User | null;

  token: string;

  wallet: { mnemonicEncrypted: string; };

  // refactor to use hashed version of the password.
  // it's never sent to the server so the security is ok, but a better practise would be not to store it in a plain version.
  password: string;

  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  password: null,
  errorMessage: null,
  token: null,
  wallet: null,
};
