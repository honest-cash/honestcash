export interface ISimpleWallet {
  address: string;
  mnemonic: string;
  mnemonicEncrypted: string;
  privateKey: string;
  HdPath: string;
}

export interface IGlobalScope extends ng.IRootScopeService {
  user: {
    imageUrl: string;
    id: number;
    username: string;
  },
  simpleWallet: ISimpleWallet
}
