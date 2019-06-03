import {reducer} from './editor.reducer';
import {EditorLoad, EditorUnload} from './editor.actions';
import Post from '../../shared/models/post';

describe('editor.reducer', () => {
  describe('EditorLoad', () => {
    it('should load', () => {
      const newState = reducer(undefined, new EditorLoad());

      expect(newState.isLoaded).toBeTruthy();
      expect(newState.story).toEqual(new Post());
    });
  });
  it('EditorUnload', () => {
    const newState = reducer(undefined, new EditorUnload());

    expect(newState.isLoaded).toBeFalsy();
  });
});
