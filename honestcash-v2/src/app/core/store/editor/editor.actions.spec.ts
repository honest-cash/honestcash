import {EditorActionTypes, EditorLoad, EditorUnload} from './editor.actions';
import Post from '../../models/post';

describe('editor.effects', () => {
  describe('EditorLoad', () => {
    it('should create an action when no payload is provided', () => {
      const action = new EditorLoad();
      expect({...action}).toEqual({type: EditorActionTypes.EDITOR_LOAD});
    });
    it('should create an action when payload is provided', () => {
      const payload = {story: new Post()};
      const action = new EditorLoad(payload);
      expect({...action}).toEqual({type: EditorActionTypes.EDITOR_LOAD, payload});
    });
  });
  describe('EditorUnload', () => {
    it('should create an action', () => {
      const action = new EditorUnload();
      expect({...action}).toEqual({type: EditorActionTypes.EDITOR_UNLOAD});
    });
  });
});
