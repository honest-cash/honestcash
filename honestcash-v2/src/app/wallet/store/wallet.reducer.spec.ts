import {reducer} from './wallet.reducer';
import {WalletBalanceUpdated, WalletCleanup, WalletGenerated, WalletSetup, WalletStatusUpdated} from './wallet.actions';
import {initialWalletState} from './wallet.state';
import {SimpleWallet} from '../models/simple-wallet';
import {WALLET_STATUS} from '../models/status';

describe('wallet.reducer', () => {
  it('WalletSetup', () => {
    const newState = reducer(initialWalletState, new WalletSetup());
    expect(newState).toEqual(initialWalletState);
  });
  it('WalletGenerated', () => {
    const newState = reducer(undefined, new WalletGenerated({wallet: new SimpleWallet}));

    expect(newState.wallet).toBeDefined();
  });
  it('WalletBalanceUpdated', () => {
    const balance = 2;
    const newState = reducer(undefined, new WalletBalanceUpdated(balance));

    expect(newState.balance).toEqual(balance);
  });
  it('WalletStatusUpdated', () => {
    const status = WALLET_STATUS.Generated;
    const newState = reducer(undefined, new WalletStatusUpdated(status));

    expect(newState.status).toEqual(status);
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
