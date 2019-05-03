import { reducer } from './app.reducer';
import { AppLoad } from './app.actions';

describe('app.reducer', async () => {
  it('AppLoad', async () => {
    const newState = reducer(undefined, new AppLoad());

    // expect(newState.user).toBeDefined();
  });
});
