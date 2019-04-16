import SimpleBitcoinWallet from 'simple-bitcoin-wallet';

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

  static generateNewWallet(password: string): ISimpleBitcoinWallet {
    const newWallet = new SimpleBitcoinWallet(null, {
      password
    });

    return newWallet;
  }

  static generateWalletWithEncryptedRecoveryPhrase(encryptedRecoveryPhrase: string, password: string): ISimpleBitcoinWallet {
    const newWallet = new SimpleBitcoinWallet(encryptedRecoveryPhrase, {
      password
    });

    return newWallet;
  }
  // @todo add typings to SimpleBitcoinWallet

  /**
  private getWallet() {
    require.ensure(['simple-bitcoin-wallet'], require => {
      let yourModule = require('simple-bitcoin-wallet');

      yourModule.someFunction();
   });
  }
  */
}
