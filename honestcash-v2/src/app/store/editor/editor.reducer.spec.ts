import {reducer} from './editor.reducer';
import {EditorLoad, EditorUnload} from './editor.actions';
import {EDITOR_STATUS, State as EditorState} from './editor.state';

describe('editor.reducer', () => {
  describe('EditorLoad', () => {
    it('should load', () => {
      const newState: EditorState = reducer(undefined, new EditorLoad());

      expect(newState.isLoaded).toBeTruthy();
      expect(newState.status).toEqual(EDITOR_STATUS.Initialized);
    });
  });
  it('EditorUnload', () => {
    const newState = reducer(undefined, new EditorUnload());

    expect(newState.isLoaded).toBeFalsy();
  });
});
