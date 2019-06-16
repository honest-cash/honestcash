import {reducer} from './wallet.reducer';
import {WalletCleanup, WalletGenerated, WalletSetup} from './wallet.actions';
import {initialState as initialWalletState} from './wallet.state';
import Wallet from '../../shared/models/wallet';
import {LoginSuccessResponse} from '../../shared/models/authentication';
import User from '../../shared/models/user';

describe('wallet.reducer', () => {
  it('WalletSetup', () => {
    const payload: LoginSuccessResponse = {
      user: new User(),
      wallet: new Wallet(),
      token: 'asdf',
      password: 'asdf',
    };

    const newState = reducer(initialWalletState, new WalletSetup(payload));

    expect(newState).toEqual(initialWalletState);
  });
  it('WalletSetup', () => {

    const newState = reducer(undefined, new WalletGenerated({wallet: new Wallet()}));

    expect(newState.wallet).toBeDefined();
  });

  it('WalletCleanup', () => {
    const updatedState = {
      ...initialWalletState,
      wallet: new Wallet(),
    };
    updatedState.wallet.mnemonic = 'asdf';

    const newState = reducer(updatedState, new WalletCleanup());

    expect(newState).toEqual(initialWalletState);
  });
});
