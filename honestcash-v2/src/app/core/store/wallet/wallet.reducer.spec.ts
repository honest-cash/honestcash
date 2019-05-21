import {reducer} from './wallet.reducer';
import {WalletGenerated} from './wallet.actions';
import Wallet from '../../models/wallet';

describe('wallet.reducer', () => {
  it('WalletSetup', () => {
    let wallet = new Wallet();
    wallet = {
      ...wallet,
      mnemonic: 'yard current warrior merry despair sweet wise round acquire equal hollow mansion',
      privateKey: 'asd',
      HdPath: 'm/44\'/0\'/0\'/0/0'
    };

    const newState = reducer(undefined, new WalletGenerated({
      wallet
    }));

    expect(newState.wallet).toBeDefined();
    expect(newState.wallet.mnemonic).toBeDefined();
    expect(newState.wallet.HdPath).toBeDefined();
    expect(newState.wallet.privateKey).toBeDefined();
  });
});
