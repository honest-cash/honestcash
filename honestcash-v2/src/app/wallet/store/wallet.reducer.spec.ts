import {reducer} from './wallet.reducer';
import {WalletCleanup, WalletGenerated, WalletSetup} from './wallet.actions';
import {LoginSuccessResponse} from '../../auth/models/authentication';
import User from '../../user/models/user';
import {initialWalletState} from './wallet.state';
import {SimpleWallet} from '../models/simple-wallet';

describe('wallet.reducer', () => {
  it('WalletSetup', () => {
    const payload: LoginSuccessResponse = {
      user: new User(),
      wallet: new SimpleWallet(),
      token: 'asdf',
      password: 'asdf',
    };

    const newState = reducer(initialWalletState, new WalletSetup(payload));

    expect(newState).toEqual(initialWalletState);
  });
  it('WalletSetup', () => {

    const newState = reducer(undefined, new WalletGenerated({wallet: new SimpleWallet}));

    expect(newState.wallet).toBeDefined();
  });

  it('WalletCleanup', () => {
    const updatedState = {
      ...initialWalletState,
      wallet: new SimpleWallet(),
    };
    updatedState.wallet.mnemonic = 'asdf';

    const newState = reducer(updatedState, new WalletCleanup());

    expect(newState).toEqual(initialWalletState);
  });
});
