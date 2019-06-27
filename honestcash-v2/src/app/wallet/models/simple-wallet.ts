export interface ISimpleWallet {
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
