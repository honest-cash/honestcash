import {reducer} from './user.reducer';
import {UserCleanup, UserLoaded, UserSetup} from './user.actions';
import {initialState as initialUserState} from './user.state';
import {LoginSuccessResponse} from '../../shared/models/authentication';
import User from '../../shared/models/user';
import Wallet from '../../shared/models/wallet';

describe('user.reducer', () => {
  it('UserLoaded', () => {
    const newState = reducer(undefined, new UserLoaded({
      user: {
        username: 'test',
      },
    }));

    expect(newState.user).toBeDefined();
    expect(newState.user.username).toBe('test');
  });
  it('UserSetup', () => {
    const payload: LoginSuccessResponse = {
      user: new User(),
      wallet: new Wallet(),
      token: 'asdf',
      password: 'asdf',
    };
    const newState = reducer(initialUserState, new UserSetup(payload));

    expect(newState).toEqual(initialUserState);
  });
  it('UserCleanup', () => {
    const updatedState = {
      ...initialUserState,
      user: new User(),
    };
    updatedState.user.username = 'asdf';

    const newState = reducer(updatedState, new UserCleanup());

    expect(newState).toEqual(initialUserState);
  });
});
