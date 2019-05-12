import {
  AuthActionTypes,
  LogIn,
  LogInSuccess,
  LogInFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  ResetPassword,
  ResetPasswordSuccess,
  ResetPasswordFailure,
  ResetPasswordRequest,
  ResetPasswordRequestSuccess,
  ResetPasswordRequestFailure,
  LogOut,
  GetStatus,
  AuthCleanup,
} from './auth.actions';
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

describe('auth.effects', () => {
  describe('LogIn Actions', () => {
    it('LogIn should create an action', () => {
      const context = {
        email: SHARED_MOCKS.email,
        password: SHARED_MOCKS.password,
      };
      const action = new LogIn(context);
      expect({...action}).toEqual({
        type: AuthActionTypes.LOGIN,
        payload: context
      });
    });
    it('LogInSuccess should create an action', () => {
      const context = {
        user: SHARED_MOCKS.user,
        wallet: SHARED_MOCKS.wallet,
        token: SHARED_MOCKS.token,
      };
      const action = new LogInSuccess(context);
      expect({...action}).toEqual({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: context
      });
    });
    it('LogInFailure should create an action', () => {
      const action = new LogInFailure(SHARED_MOCKS.codedErrorResponse);
      expect({...action}).toEqual({
        type: AuthActionTypes.LOGIN_FAILURE,
        payload: SHARED_MOCKS.codedErrorResponse
      });
    });
  });

  describe('SignUp Actions', () => {
    it('SignUp should create an action', () => {
      const context = {
        username: SHARED_MOCKS.username,
        email: SHARED_MOCKS.email,
        password: SHARED_MOCKS.password,
        captcha: SHARED_MOCKS.captcha
      };
      const action = new SignUp(context);
      expect({...action}).toEqual({
        type: AuthActionTypes.SIGNUP,
        payload: context
      });
    });
    it('SignUpSuccess should create an action', () => {
      const context = {
        user: SHARED_MOCKS.user,
        token: SHARED_MOCKS.token,
      };
      const action = new SignUpSuccess(context);
      expect({...action}).toEqual({
        type: AuthActionTypes.SIGNUP_SUCCESS,
        payload: context
      });
    });
    it('SignUpFailure should create an action', () => {
      const action = new SignUpFailure(SHARED_MOCKS.codedErrorResponse);
      expect({...action}).toEqual({
        type: AuthActionTypes.SIGNUP_FAILURE,
        payload: SHARED_MOCKS.codedErrorResponse
      });
    });
  });

  describe('ResetPassword Actions', () => {
    it('ResetPassword should create an action', () => {
      const context = {
        email: SHARED_MOCKS.email,
      code: 'verificationcode',
      newPassword: SHARED_MOCKS.password,
      repeatNewPassword: SHARED_MOCKS.password,

      };
      const action = new ResetPassword(context);
      expect({...action}).toEqual({
        type: AuthActionTypes.RESET_PASSWORD,
        payload: context
      });
    });
    it('ResetPasswordSuccess should create an action', () => {
      const action = new ResetPasswordSuccess();
      expect({...action}).toEqual({
        type: AuthActionTypes.RESET_PASSWORD_SUCCESS
      });
    });
    it('ResetPasswordFailure should create an action', () => {
      const action = new ResetPasswordFailure(SHARED_MOCKS.codedErrorResponse);
      expect({...action}).toEqual({
        type: AuthActionTypes.RESET_PASSWORD_FAILURE,
        payload: SHARED_MOCKS.codedErrorResponse
      });
    });
  });

  describe('ResetPasswordRequest Actions', () => {
    it('ResetPasswordRequest should create an action', () => {
      const context = {
        email: SHARED_MOCKS.email,

      };
      const action = new ResetPasswordRequest(context);
      expect({...action}).toEqual({
        type: AuthActionTypes.RESET_PASSWORD_REQUEST,
        payload: context
      });
    });
    it('ResetPasswordRequestSuccess should create an action', () => {
      const action = new ResetPasswordRequestSuccess();
      expect({...action}).toEqual({
        type: AuthActionTypes.RESET_PASSWORD_REQUEST_SUCCESS
      });
    });
    it('ResetPasswordRequestFailure should create an action', () => {
      const action = new ResetPasswordRequestFailure(SHARED_MOCKS.codedErrorResponse);
      expect({...action}).toEqual({
        type: AuthActionTypes.RESET_PASSWORD_REQUEST_FAILURE,
        payload: SHARED_MOCKS.codedErrorResponse
      });
    });
  });

  describe('Logout Actions', () => {
    it('LogOut should create an action', () => {
      const action = new LogOut();
      expect({...action}).toEqual({
        type: AuthActionTypes.LOGOUT
      });
    });
  });

  describe('GetStatus Actions', () => {
    it('GetStatus should create an action', () => {
      const action = new GetStatus();
      expect({...action}).toEqual({
        type: AuthActionTypes.GET_STATUS
      });
    });
  });

  describe('AuthCleanup Actions', () => {
    it('AuthCleanup should create an action', () => {
      const action = new AuthCleanup();
      expect({...action}).toEqual({
        type: AuthActionTypes.AUTH_CLEANUP
      });
    });
  });

});
