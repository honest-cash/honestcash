import {reducer} from './auth.reducer';
import {
  LogIn,
  LogInFailure,
  LogInSuccess,
  LogOut,
  ResetPasswordFailure,
  ResetPasswordRequestFailure,
  ResetPasswordRequestSuccess,
  ResetPasswordSuccess,
  RootRedirect,
  SignUp,
  SignUpFailure,
  SignUpSuccess
} from './auth.actions';
import {initialState as initialAuthState} from './auth.state';
import User from '../../shared/models/user';
import Wallet from '../../shared/models/wallet';

const SHARED_MOCKS = {
  email: 'toto@toto.com',
  password: '123',
  username: 'toto',
  user: new User(),
  wallet: new Wallet(),
  token: 'asdf',
  captcha: '123asdf',
  codedErrorResponse: {
    code: 400,
    desc: 'EXAMPLE_FAILURE',
    httpCode: 400,
  },
  fakeState: {
    isLoading: true,
    isAuthenticated: true,
    token: 'asdf',
    errorMessage: 'asdf',
    newPasswordRequested: false,
    newPasswordSet: false
  }
};

describe('auth.reducer', () => {
  describe('LogIn Actions', () => {
    it('LogIn should return initialState with isLoading true', () => {
      const newState = reducer(SHARED_MOCKS.fakeState, new LogIn({
        email: SHARED_MOCKS.email,
        password: SHARED_MOCKS.password,
      }));

      // to test that it resets to initialState
      expect(newState.errorMessage).toEqual(initialAuthState.errorMessage);
      // to test the actual case
      expect(newState.isLoading).toBeTruthy();
    });
    it('LogInSuccess should return initialState with isLoading false, token defined and isAuthenticated true', () => {
      const newState = reducer(SHARED_MOCKS.fakeState, new LogInSuccess({
        user: SHARED_MOCKS.user,
        wallet: SHARED_MOCKS.wallet,
        token: SHARED_MOCKS.token,
        password: SHARED_MOCKS.password,
      }));

      // to test that it resets to initialState
      expect(newState.errorMessage).toEqual(initialAuthState.errorMessage);
      // to test the actual case
      expect(newState.isLoading).toBeFalsy();
      expect(newState.token).toBeDefined();
      expect(newState.isAuthenticated).toBeTruthy();
    });
    it('LogInFailure should reset to initialState and return an errorMessage', () => {
      const newState = reducer(SHARED_MOCKS.fakeState, new LogInFailure(SHARED_MOCKS.codedErrorResponse));

      // to test that it resets to initialState
      expect(newState.token).toEqual(initialAuthState.token);
      // to test the actual case
      expect(newState.errorMessage).toBeDefined();
    });
  });

  describe('SignUp Actions', () => {
    it('SignUp should return initialState with isLoading true', () => {
      const newState = reducer(SHARED_MOCKS.fakeState, new SignUp({
        username: SHARED_MOCKS.username,
        email: SHARED_MOCKS.email,
        password: SHARED_MOCKS.password,
        captcha: SHARED_MOCKS.captcha,
      }));

      // to test that it resets to initialState
      expect(newState.errorMessage).toEqual(initialAuthState.errorMessage);
      // to test the actual case
      expect(newState.isLoading).toBeTruthy();
    });
    it('SignUpSuccess should return initialState with isLoading false, token defined and isAuthenticated true', () => {
      const newState = reducer(SHARED_MOCKS.fakeState, new SignUpSuccess({
        user: SHARED_MOCKS.user,
        token: SHARED_MOCKS.token,
        password: SHARED_MOCKS.password,
      }));

      // to test that it resets to initialState
      expect(newState.errorMessage).toEqual(initialAuthState.errorMessage);
      // to test the actual case
      expect(newState.isLoading).toBeFalsy();
      expect(newState.token).toBeDefined();
      expect(newState.isAuthenticated).toBeTruthy();
    });
    it('SignUpFailure should reset to initialState and return an errorMessage', () => {
      const newState = reducer(SHARED_MOCKS.fakeState, new SignUpFailure(SHARED_MOCKS.codedErrorResponse));

      // to test that it resets to initialState
      expect(newState.token).toEqual(initialAuthState.token);
      // to test the actual case
      expect(newState.errorMessage).toBeDefined();
    });
  });
  describe('ResetPassword Actions', () => {
    it('ResetPasswordSuccess should take the previous state and return newPasswordSet true', () => {
      const newState = reducer(SHARED_MOCKS.fakeState, new ResetPasswordSuccess());

      // to test that it takes previous state into account
      // and does not reset it to initialState
      expect(newState.isLoading).toEqual(SHARED_MOCKS.fakeState.isLoading);
      expect(newState.isAuthenticated).toEqual(SHARED_MOCKS.fakeState.isLoading);
      // the actual case to test
      expect(newState.newPasswordSet).toBeTruthy();
    });
    it('ResetPasswordFailure should reset to initialState', () => {
      const newState = reducer(SHARED_MOCKS.fakeState, new ResetPasswordFailure(SHARED_MOCKS.codedErrorResponse));

      // to test that it resets to initialState
      expect(newState.isLoading).toEqual(initialAuthState.isLoading);
      expect(newState.isAuthenticated).toEqual(initialAuthState.isAuthenticated);
      expect(newState.errorMessage).toBeDefined();
    });
  });

  describe('ResetPasswordRequest Actions', () => {
    it('ResetPasswordRequestSuccess should take the previous state and return newPasswordRequested true', () => {
      const newState = reducer(SHARED_MOCKS.fakeState, new ResetPasswordRequestSuccess());

      // to test that it resets to initialState
      expect(newState.isLoading).toEqual(initialAuthState.isLoading);
      expect(newState.isAuthenticated).toEqual(initialAuthState.isAuthenticated);
      // the actual case to test
      expect(newState.newPasswordRequested).toBeTruthy();
    });
    it('ResetPasswordRequestFailure should reset to initalState', () => {
      const newState = reducer(SHARED_MOCKS.fakeState, new ResetPasswordRequestFailure(SHARED_MOCKS.codedErrorResponse));

      // to test that it resets to initialState
      expect(newState.isLoading).toEqual(initialAuthState.isLoading);
      expect(newState.isAuthenticated).toEqual(initialAuthState.isAuthenticated);
      expect(newState.errorMessage).toBeDefined();
    });
  });

  describe('LogOut Actions', () => {
    it('LogOut should reset to initialState', () => {
      const newState = reducer(SHARED_MOCKS.fakeState, new LogOut());

      expect(newState).toEqual(initialAuthState);
    });
  });

  describe('RootRedirect Actions', () => {
    it('RootRedirect should keep the state', () => {
      const newState = reducer(SHARED_MOCKS.fakeState, new RootRedirect());

      expect(newState).toEqual(SHARED_MOCKS.fakeState);
    });
  });
});
