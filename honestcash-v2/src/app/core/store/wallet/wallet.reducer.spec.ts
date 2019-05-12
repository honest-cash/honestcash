import { reducer } from './wallet.reducer';
import { WalletGenerated } from './wallet.actions';

describe('wallet.reducer', () => {
  it('WalletSetup', () => {
    const newState = reducer(undefined, new WalletGenerated({
      wallet: {
        mnemonic: 'yard current warrior merry despair sweet wise round acquire equal hollow mansion',
        privateKey: 'asd',
        HdPath: 'm/44\'/0\'/0\'/0/0'
      }
    }));

    expect(newState.wallet).toBeDefined();
    expect(newState.wallet.mnemonic).toBeDefined();
    expect(newState.wallet.HdPath).toBeDefined();
    expect(newState.wallet.privateKey).toBeDefined();
  });
});
