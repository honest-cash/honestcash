import {EditorActionTypes, EditorLoad} from './editor.actions';

describe('editor.effects', () => {
  describe('EditorLoad', () => {
    it('should create an action', () => {
      const action = new EditorLoad();
      expect({...action}).toEqual({type: EditorActionTypes.EDITOR_LOAD});
    });
  });
});
