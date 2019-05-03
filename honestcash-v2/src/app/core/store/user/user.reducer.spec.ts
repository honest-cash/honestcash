import { reducer } from './user.reducer';
import { UserSetup } from './user.actions';

describe('user.reducer', async () => {
  it('UserSetup', async () => {
    const newState = reducer(undefined, new UserSetup({
      user: {
        username: 'test',
      },
    }));

    expect(newState.user).toBeDefined();
  });
});
