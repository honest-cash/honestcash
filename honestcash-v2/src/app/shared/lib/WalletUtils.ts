import SimpleBitcoinWallet from 'simple-bitcoin-wallet';

// @todo shift to simple-bitcoin-wallet package
export interface ISimpleBitcoinWallet {
  cashAddress: string;
  mnemonic: string;
  address: string;
  HdPath: string;
  privateKey: string;
  legacyAddress: string;
  mnemonicEncrypted: string;

  getBalance(): any;
  send(): any;
  getWalletInfo(): any;

  download(): any;
  upload(): any;
}

export class WalletUtils {

  static generateNewWallet = (password: string): ISimpleBitcoinWallet => new SimpleBitcoinWallet(null, { password });
  static encrypt = (mnemonic: string, password: string): string => SimpleBitcoinWallet.encrypt(mnemonic, password);
  static generateWalletWithEncryptedRecoveryPhrase = (
    encryptedRecoveryPhrase: string,
    password: string
  ): ISimpleBitcoinWallet => new SimpleBitcoinWallet(encryptedRecoveryPhrase, { password })
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
