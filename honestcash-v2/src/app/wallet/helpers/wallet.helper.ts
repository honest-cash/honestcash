// @todo shift to simple-bitcoin-wallet package
import {Logger} from '../../../core/shared/services/logger.service';

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

declare var SimpleWallet: ISimpleBitcoinWallet;

const logger = new Logger('WalletUtils');

const loadJS = function (url: string, implementationCode: () => void, location: HTMLElement) {
  // url is URL of external file, implementationCode is the code
  // to be called from the file, location is the location to
  // insert the <script> element

  const scriptTag = document.createElement('script');
  scriptTag.src = url;

  scriptTag.onload = implementationCode;
  (scriptTag as any).onreadystatechange = implementationCode;

  location.appendChild(scriptTag);
};

/* istanbul ignore next */
export class WalletHelper {
  static generateNewWallet = async (password: string): Promise<ISimpleBitcoinWallet> => {
    const SimpleBitcoinWallet: any = await WalletHelper.getWallet();

    return new SimpleBitcoinWallet(null, {password});
  };

  static encrypt = async (mnemonic: string, password: string): Promise<string> => {
    const SimpleBitcoinWallet: any = await WalletHelper.getWallet();

    return SimpleBitcoinWallet.encrypt(mnemonic, password);
  };

  static generateWalletWithEncryptedRecoveryPhrase = async (
    encryptedRecoveryPhrase: string,
    password: string
  ): Promise<ISimpleBitcoinWallet> => {
    const SimpleBitcoinWallet: any = await WalletHelper.getWallet();

    return new SimpleBitcoinWallet(encryptedRecoveryPhrase, {password});
  };

  static generateWalletWithDecryptedRecoveryPhrase = async (
    recoveryPhrase: string,
  ): Promise<ISimpleBitcoinWallet> => {
    const SimpleBitcoinWallet: any = await WalletHelper.getWallet();

    return new SimpleBitcoinWallet(recoveryPhrase, {password: null});
  };

  // @todo add typings to SimpleBitcoinWallet
  // @todo these typings below are a little bit off
  // simple-bitcoin-wallet is lazy loaded as it is a >1MB package and it is not needed for server side rendering.
  static getWallet(): Promise<ISimpleBitcoinWallet> {
    return new Promise(((resolve, reject) => {

      if (typeof (window as any).SimpleWallet !== 'undefined') {
        return resolve((window as any).SimpleWallet);
      }

      /**
       * We load it here from an external source as it experiences problems with webpack builds.
       * The package is quite big so it is necessary to load it only if it is really needed.
       */

      // tslint:disable-next-line: no-shadowed-variable
      loadJS(
        '/assets/libs/simple-bitcoin-wallet.min.js', // https://unpkg.com/simple-bitcoin-wallet@0.0.7/dist/simplewallet.min.js
        () => {
          logger.info('Lazy-loaded simple-bitcoin-wallet.');

          if (typeof (window as any).SimpleWallet !== 'undefined') {
            return resolve((window as any).SimpleWallet);
          } else {
            logger.error('Could not resolve SimpleBitcoinWallet.');

            return reject('Could not resolve SimpleBitcoinWallet');
          }
        },
        document.body);
    }));
  }
}
