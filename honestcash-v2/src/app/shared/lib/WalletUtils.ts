import { Logger } from 'app/core';

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

interface WebpackRequire {
  ensure(
    dependencies: string[],
    callback: (loadPackage: (packageName: string) => any) => void,
    errorCallback?: (error: Error) => void,
    chunkName?: string
  ): void;
}

declare var require: WebpackRequire;

const logger = new Logger('WalletUtils');

export class WalletUtils {
  static generateNewWallet = async (password: string): Promise<ISimpleBitcoinWallet> => {
    const SimpleBitcoinWallet: any = await WalletUtils.getWallet();

    return new SimpleBitcoinWallet(null, { password });
  }

  static encrypt = async (mnemonic: string, password: string): Promise<string> => {
    const SimpleBitcoinWallet: any = await WalletUtils.getWallet();

    return SimpleBitcoinWallet.encrypt(mnemonic, password);
  }

  static generateWalletWithEncryptedRecoveryPhrase = async (
    encryptedRecoveryPhrase: string,
    password: string
  ): Promise<ISimpleBitcoinWallet> => {
    const SimpleBitcoinWallet: any = await WalletUtils.getWallet();

    return new SimpleBitcoinWallet(encryptedRecoveryPhrase, { password });
  }

  // @todo add typings to SimpleBitcoinWallet
  // @todo these typings below are a little bit off
  // simple-bitcoin-wallet is lazy loaded as it is a >1MB package and it is not needed for server side rendering.
  static getWallet(): Promise<ISimpleBitcoinWallet> {
    return new Promise((resolve => {
      // tslint:disable-next-line: no-shadowed-variable
      require.ensure(['simple-bitcoin-wallet'], (require: any) => {
        const sbw = require('simple-bitcoin-wallet');

        logger.info('Lazy-loaded simple-bitcoin-wallet.');

        resolve(sbw.default);
      });
    }));
  }
}
