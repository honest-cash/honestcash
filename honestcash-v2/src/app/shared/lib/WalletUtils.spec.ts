import { WalletUtils } from './WalletUtils';

describe('WalletUtils', () => {
  it('creates a new wallet with password', () => {
    const wallet = WalletUtils.generateNewWallet('testpassword');

    expect(wallet).toBeDefined();
  });

  it('decrypts a wallet', () => {
    const mnemonicEncrypted =
      // tslint:disable-next-line: max-line-length
      'U2FsdGVkX1/Eo5CUy/rXWwzjmIaBXdCUzwmVZrp7a8pl4QEmKA/WkYn1zNVNC1nI+tEa58OYiMRqqcE3Iwv3RUay4a++F7AjlfhkaHG2PH7kvtjqrLqU1IuwSevZ73o2QcTjuvnmfgP4oDNpovsbNg==';

    const wallet = WalletUtils.generateWalletWithEncryptedRecoveryPhrase(
      mnemonicEncrypted,
      'testpassword'
    );

    expect(wallet).toBeDefined();
    expect(wallet.mnemonic).toBe(
      'yard current warrior merry despair sweet wise round acquire equal hollow mansion'
    );
  });

  it('does not decrypt a wallet because of a wrong password', () => {
    const mnemonicEncrypted =
      // tslint:disable-next-line: max-line-length
      'U2FsdGVkX1/Eo5CUy/rXWwzjmIaBXdCUzwmVZrp7a8pl4QEmKA/WkYn1zNVNC1nI+tEa58OYiMRqqcE3Iwv3RUay4a++F7AjlfhkaHG2PH7kvtjqrLqU1IuwSevZ73o2QcTjuvnmfgP4oDNpovsbNg==';

    let wallet: any, err: any;

    try {
      wallet = WalletUtils.generateWalletWithEncryptedRecoveryPhrase(
        mnemonicEncrypted,
        'wrongpassword'
      );
    } catch (_err) {
      err = _err;
    }

    expect(wallet).toBe(undefined);
    expect(err).toBeDefined();
  });
});
