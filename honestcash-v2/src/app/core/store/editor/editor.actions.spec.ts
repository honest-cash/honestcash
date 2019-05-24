import {
  EditorActionTypes,
  EditorLoad,
  EditorStorySave,
  EditorStorySaveFailure,
  EditorStorySaveSuccess,
  EditorUnload
} from './editor.actions';
import Post from '../../models/post';
import User from '../../models/user';
import Wallet from '../../models/wallet';

const SHARED_MOCKS = {
  username: 'toto',
  email: 'toto@toto.com',
  password: '123',
  captcha: 'asdfasdf123',
  token: 'asdfasdf',
  user: new User(),
  wallet: new Wallet(),
  codedErrorResponse: {
    code: 400,
    desc: 'EXAMPLE_FAILURE',
    httpCode: 400,
  }
};

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
  describe('EditoryStorySave Actions', () => {
    it('EditorStorySave should create an action', () => {
      const payload = new Post();
      const action = new EditorStorySave(payload);
      expect({...action}).toEqual({type: EditorActionTypes.EDITOR_STORY_SAVE, payload});
    });
    it('EditorStorySaveSuccess should create an action', () => {
      const payload = new Post();
      const action = new EditorStorySaveSuccess(payload);
      expect({...action}).toEqual({type: EditorActionTypes.EDITOR_STORY_SAVE_SUCCESS, payload});
    });
    it('EditorStorySaveFailure should create an action', () => {
      const action = new EditorStorySaveFailure(SHARED_MOCKS.codedErrorResponse);
      expect({...action}).toEqual({type: EditorActionTypes.EDITOR_STORY_SAVE_FAILURE, payload: SHARED_MOCKS.codedErrorResponse});
    });
  });
});
