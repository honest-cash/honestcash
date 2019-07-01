import {reducer} from './user.reducer';
import {UserCleanup, UserLoaded, UserSetup} from './user.actions';
import {LoginSuccessResponse} from '../../auth/models/authentication';
import User from '../models/user';
import {initialUserState} from './user.state';
import {SimpleWallet} from '../../wallet/models/simple-wallet';

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
      wallet: new SimpleWallet(),
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
