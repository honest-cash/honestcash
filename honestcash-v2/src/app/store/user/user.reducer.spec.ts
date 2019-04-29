import { reducer } from './user.reducer';
import { UserSetup } from './user.actions';

describe('user.reducer', () => {
  it('UserSetup', () => {
    const newState = reducer(undefined, new UserSetup({
      user: {
        username: 'test',
      },
    }));

    expect(newState.user).toBeDefined();
  });
});
