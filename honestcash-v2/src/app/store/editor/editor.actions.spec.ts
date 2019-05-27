import {
  EditorActionTypes,
  EditorChange,
  EditorLoad,
  EditorStoryPropertyChange,
  EditorStoryPropertySave,
  EditorStoryPublish,
  EditorStoryPublishFailure,
  EditorStoryPublishSuccess,
  EditorStorySave,
  EditorStorySaveAndPublish,
  EditorStorySaveFailure,
  EditorStorySaveSuccess,
  EditorUnload
} from './editor.actions';
import Post from '../../shared/models/post';
import User from '../../shared/models/user';
import Wallet from '../../shared/models/wallet';
import {STORY_PROPERTIES} from '../../modules/editor/services/editor.service';

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
      expect({...action}).toEqual({type: EditorActionTypes.EDITOR_LOAD, payload: undefined});
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
  describe('EditorChange', () => {
    it('should create an action', () => {
      const post = new Post();
      const action = new EditorChange(post);
      expect({...action}).toEqual({type: EditorActionTypes.EDITOR_CHANGE, payload: post});
    });
  });
  describe('EditorStoryPropertyChange', () => {
    it('should create an action with the property and value as payload', () => {
      const payload = {property: STORY_PROPERTIES.Body, value: 'asdf'};
      const action = new EditorStoryPropertyChange(payload);
      expect({...action}).toEqual({type: EditorActionTypes.EDITOR_STORY_PROPERTY_CHANGE, payload});
    });
  });
  describe('EditorStoryPropertySave', () => {
    it('should create an action with the property and value as payload', () => {
      const payload = {story: new Post(), property: STORY_PROPERTIES.Body};
      const action = new EditorStoryPropertySave(payload);
      expect({...action}).toEqual({type: EditorActionTypes.EDITOR_STORY_PROPERTY_SAVE, payload});
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

  describe('EditoryStoryPublish Actions', () => {
    it('EditorStoryPublish should create an action', () => {
      const payload = new Post();
      const action = new EditorStoryPublish(payload);
      expect({...action}).toEqual({type: EditorActionTypes.EDITOR_STORY_PUBLISH, payload});
    });
    it('EditorStoryPublishSuccess should create an action', () => {
      const payload = new Post();
      const action = new EditorStoryPublishSuccess(payload);
      expect({...action}).toEqual({type: EditorActionTypes.EDITOR_STORY_PUBLISH_SUCCESS, payload});
    });
    it('EditorStoryPublishFailure should create an action', () => {
      const action = new EditorStoryPublishFailure(SHARED_MOCKS.codedErrorResponse);
      expect({...action}).toEqual({type: EditorActionTypes.EDITOR_STORY_PUBLISH_FAILURE, payload: SHARED_MOCKS.codedErrorResponse});
    });
  });
  describe('EditoryStorySaveAndPublish Actions', () => {
    it('EditoryStorySaveAndPublish should create an action', () => {
      const payload = new Post();
      const action = new EditorStorySaveAndPublish(payload);
      expect({...action}).toEqual({type: EditorActionTypes.EDITOR_STORY_SAVE_AND_PUBLISH, payload});
    });
  });
});
