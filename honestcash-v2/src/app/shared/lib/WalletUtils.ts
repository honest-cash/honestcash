// @todo shift to simple-bitcoin-wallet package
interface ISimpleBitcoinWallet {
  cashAddress: string;
  mnemonic: string;
  address: string;
  HdPath: string;
  legacyAddress: string;
  mnemonicEncrypted: string;

  getBalance(): any;
  send(): any;
  getWalletInfo(): any;

  download(): any;
  upload(): any;
}

export class WalletUtils {

  static async generateNewWallet(password: string): Promise<ISimpleBitcoinWallet> {
    const SimpleBitcoinWallet = await WalletUtils.lazyLoadSimpleBitcoinWallet();

    const newWallet = new SimpleBitcoinWallet(null, {
      password
    });

    return newWallet;
  }

  static async generateWalletWithEncryptedRecoveryPhrase(encryptedRecoveryPhrase: string, password: string): Promise<ISimpleBitcoinWallet> {
    const SimpleBitcoinWallet = await WalletUtils.lazyLoadSimpleBitcoinWallet();

    const newWallet = new SimpleBitcoinWallet(encryptedRecoveryPhrase, {
      password
    });

    return newWallet;
  }

  // @todo add typings to SimpleBitcoinWallet
  // this loads the simple-bitcoin-wallet in a lazy way when it is needed
  // because the package has over 1MB in size!
  static async lazyLoadSimpleBitcoinWallet() {
    const slw = await import('simple-bitcoin-wallet');

    return slw.default;
  }
}
