import {UserActionTypes, UserCleanup, UserLoaded, UserSetup} from './user.actions';
import User from '../../models/user';
import {LoginSuccessResponse} from '../../models/authentication';
import Wallet from '../../models/wallet';

describe('user.actions', () => {
  describe('UserSetup', () => {
    it('should create an action WITHOUT payload', () => {
      const action = new UserSetup();
      expect({...action}).toEqual({type: UserActionTypes.USER_SETUP, payload: undefined});
    });
    it('should create an action WITH payload', () => {
      const payload: LoginSuccessResponse = {
        user: new User(),
        wallet: new Wallet(),
        token: 'asdf',
        password: '123',
      };
      const action = new UserSetup(payload);
      expect({...action}).toEqual({type: UserActionTypes.USER_SETUP, payload});
    });
  });
  describe('UserCleanup', () => {
    it('should create an action', () => {
      const action = new UserCleanup();
      expect({...action}).toEqual({type: UserActionTypes.USER_CLEANUP});
    });
  });
  describe('UserLoaded', () => {
    it('should create an action', () => {
      const payload = {
        user: new User(),
      };
      const action = new UserLoaded(payload);
      expect({...action}).toEqual({type: UserActionTypes.USER_LOADED, payload});
    });
  });
});
