export interface ISimpleWallet {
  cashAddress: string;
  balance: number;
  unconfirmedBalance: number;
  mnemonic: string;
  address: string;
  HdPath: string;
  privateKey: string;
  legacyAddress: string;
  mnemonicEncrypted: string;
  getBalance(): any;
  send(receivers: any[]): any;
  getWalletInfo(): any;
  download(): any;
  upload(): any;
}

export class SimpleWallet implements ISimpleWallet {
  public cashAddress = '';
  public balance = 0;
  public unconfirmedBalance = 0;
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
