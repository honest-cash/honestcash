import { reducer } from './editor.reducer';
import {EditorLoad, EditorUnload} from './editor.actions';
import Post from '../../models/post';

describe('editor.reducer', () => {
  describe('EditorLoad', () => {
    it('should load the story provided in payload', () => {
      const payload = {story: new Post()};
      payload.story.title = 'asdf';
      const newState = reducer(undefined, new EditorLoad(payload));

      expect(newState.isLoaded).toBeTruthy();
      expect(newState.story).toEqual(payload.story);
    });
    it('should load the an empty story if not provided in payload', () => {
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
