import { reducer } from './editor.reducer';
import { EditorLoad } from './editor.actions';

describe('editor.reducer', () => {
  it('EditorLoad', () => {
    const newState = reducer(undefined, new EditorLoad());

    expect(newState.isLoaded).toBeTruthy();
  });
});
