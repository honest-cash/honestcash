import { reducer } from './wallet.reducer';
import { WalletSetup } from './wallet.actions';

describe('wallet.reducer', async () => {
  it('WalletSetup', async () => {
    const newState = reducer(undefined, new WalletSetup({
      mnemonic:
        // tslint:disable-next-line: max-line-length
        'U2FsdGVkX1/Eo5CUy/rXWwzjmIaBXdCUzwmVZrp7a8pl4QEmKA/WkYn1zNVNC1nI+tEa58OYiMRqqcE3Iwv3RUay4a++F7AjlfhkaHG2PH7kvtjqrLqU1IuwSevZ73o2QcTjuvnmfgP4oDNpovsbNg==',
      password: 'testpassword'
    }));

    expect(newState.wallet).toBeDefined();
    expect(newState.wallet.mnemonic).toBeDefined();
    expect(newState.wallet.HdPath).toBeDefined();

    expect(newState.wallet.mnemonic).toBe('yard current warrior merry despair sweet wise round acquire equal hollow mansion');
    expect(newState.wallet.HdPath).toBe('m/44\'/0\'/0\'/0/0');
  });
});
