import SimpleBitcoinWallet from 'simple-bitcoin-wallet';

interface IWallet {
  cashAddress: string;
  mnemonic: string;
  address: string;
  HDPath: string;
  legacyAddress: string;
  mnemonicEncrypted: string;
}

export class WalletUtils {
  // @todo add typings to SimpleBitcoinWallet

  static generateNewWallet(password: string): IWallet {
    const newWallet = new SimpleBitcoinWallet(null, {
      password
    });

    return newWallet;
  }

  static generateWalletWithEncryptedRecoveryPhrase(encryptedRecoveryPhrase: string, password: string): IWallet {
    const newWallet = new SimpleBitcoinWallet(encryptedRecoveryPhrase, {
      password
    });

    return newWallet;
  }
}
