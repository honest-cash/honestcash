import {reducer} from './core.reducer';
import {CoreLoad} from './core.actions';


describe('core.reducer', () => {
  it('CoreLoad correctly sets isLoaded to true', () => {
    const newState = reducer(undefined, new CoreLoad());

    expect(newState.isLoaded).toBeTruthy();
  });
});
