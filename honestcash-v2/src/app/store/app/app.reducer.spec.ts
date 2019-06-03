import {reducer} from './app.reducer';
import {AppLoad} from './app.actions';

describe('app.reducer', () => {
  it('AppLoad correctly sets isLoaded to true', () => {
    const newState = reducer(undefined, new AppLoad());

    expect(newState.isLoaded).toBeTruthy();
  });
});
