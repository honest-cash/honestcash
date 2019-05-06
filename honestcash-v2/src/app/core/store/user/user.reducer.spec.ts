import { reducer } from './user.reducer';
import { UserLoaded } from './user.actions';

describe('user.reducer', async () => {
  it('UserLoaded', async () => {
    const newState = reducer(undefined, new UserLoaded({
      user: {
        username: 'test',
      },
    }));

    expect(newState.user).toBeDefined();
    expect(newState.user.username).toBe('test');
  });
});
