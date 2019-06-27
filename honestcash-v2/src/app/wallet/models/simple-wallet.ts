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

export class SimpleWallet implements ISimpleWallet {
  public cashAddress = '';
  public mnemonic = '';
  public address = '';
  public HdPath = '';
  public privateKey = '';
  public legacyAddress = '';
  public mnemonicEncrypted = '';
  public getBalance() {}
  public send() {}
  public getWalletInfo() {}
  public download() {}
  public upload() {}
}
