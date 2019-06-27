import {reducer} from './main.reducer';
import {MainLoad} from './main.actions';

describe('main.reducer', () => {
  it('MainLoad correctly sets isLoaded to true', () => {
    const newState = reducer(undefined, new MainLoad());

    expect(newState.isLoaded).toBeTruthy();
  });
});
