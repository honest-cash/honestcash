import {WalletUtils} from './WalletUtils';

describe('WalletUtils', () => {
  it('creates a new wallet with password', async () => {
    const wallet = await WalletUtils.generateNewWallet('testpassword');

    expect(wallet).toBeDefined();
  });

  it('decrypts a wallet', async () => {
    const mnemonicEncrypted =
      // tslint:disable-next-line: max-line-length
      'U2FsdGVkX1/Eo5CUy/rXWwzjmIaBXdCUzwmVZrp7a8pl4QEmKA/WkYn1zNVNC1nI+tEa58OYiMRqqcE3Iwv3RUay4a++F7AjlfhkaHG2PH7kvtjqrLqU1IuwSevZ73o2QcTjuvnmfgP4oDNpovsbNg==';

    const wallet = await WalletUtils.generateWalletWithEncryptedRecoveryPhrase(
      mnemonicEncrypted,
      'testpassword'
    );

    expect(wallet).toBeDefined();
    expect(wallet.mnemonic).toBe(
      'yard current warrior merry despair sweet wise round acquire equal hollow mansion'
    );
  });

  it('does not decrypt a wallet because of a wrong password', async () => {
    const mnemonicEncrypted =
      // tslint:disable-next-line: max-line-length
      'U2FsdGVkX1/Eo5CUy/rXWwzjmIaBXdCUzwmVZrp7a8pl4QEmKA/WkYn1zNVNC1nI+tEa58OYiMRqqcE3Iwv3RUay4a++F7AjlfhkaHG2PH7kvtjqrLqU1IuwSevZ73o2QcTjuvnmfgP4oDNpovsbNg==';

    let wallet: any, err: any;

    try {
      wallet = await WalletUtils.generateWalletWithEncryptedRecoveryPhrase(
        mnemonicEncrypted,
        'wrongpassword'
      );
    } catch (_err) {
      err = _err;
    }

    expect(wallet).toBe(undefined);
    expect(err).toBeDefined();
  });

  it('encrypt a wallet (loose test)', async () => {
    const mnemonic = 'yard current warrior merry despair sweet wise round acquire equal hollow mansion';

    const mnemonicEncrypted = await WalletUtils.encrypt(
      mnemonic,
      'testpassword'
    );

    // this cannot be done as the strings do not match
    // tslint:disable
    /*expect(mnemonicEncrypted).toEqual(
      'U2FsdGVkX1+ytJutT+HMqyd0T6wp6xSX9P7QNMLOZPVPi6yR6hSaPM1G7Z5u4LoZ61r0/LGNeh4TzPTnb4LezeM5d2a6+B988JgoU9TYAbvHjAgnUmKCb+Sqmq/ydQOD1uVQFNWmUrC5dk5YkCAJYw=='
    );*/
    // tslint:enable

    // we test it loosely
    expect(typeof mnemonicEncrypted).toEqual('string');
  });
});
