import { reducer } from './app.reducer';
import { AppLoad } from './app.actions';

describe('app.reducer', () => {
  it('AppLoad', () => {
    const newState = reducer(undefined, new AppLoad());

    // expect(newState.user).toBeDefined();
  });
});
