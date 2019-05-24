import User from '../../models/user';
import {LoginSuccessResponse} from '../../models/authentication';
import Wallet from '../../models/wallet';
import {WalletActionTypes, WalletCleanup, WalletGenerated, WalletSetup} from './wallet.actions';

describe('wallet.actions', () => {
  describe('WalletSetup', () => {
    it('should create an action WITHOUT payload', () => {
      const action = new WalletSetup();
      expect({...action}).toEqual({type: WalletActionTypes.WALLET_SETUP, payload: undefined});
    });
    it('should create an action WITH payload', () => {
      const payload: LoginSuccessResponse = {
        user: new User(),
        wallet: new Wallet(),
        token: 'asdf',
        password: '123',
      };
      const action = new WalletSetup(payload);
      expect({...action}).toEqual({type: WalletActionTypes.WALLET_SETUP, payload});
    });
  });
  describe('WalletCleanup', () => {
    it('should create an action', () => {
      const action = new WalletCleanup();
      expect({...action}).toEqual({type: WalletActionTypes.WALLET_CLEANUP});
    });
  });
  describe('WalletGenerated', () => {
    it('should create an action', () => {
      const payload = {
        wallet: new Wallet(),
      };
      const action = new WalletGenerated(payload);
      expect({...action}).toEqual({type: WalletActionTypes.WALLET_GENERATED, payload});
    });
  });
});
