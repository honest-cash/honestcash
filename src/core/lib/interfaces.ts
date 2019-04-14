export interface ISimpleWallet {
  address: string;
  mnemonic: string;
  mnemonicEncrypted: string;
  privateKey: string;
  HdPath: string;

  encrypt: any;
  decrypt: any;
}

export interface IHashtagStat {
  hashtag: string;
  count: number;
}

export class SimpleWalletClass implements ISimpleWallet {
  address: string;
  mnemonic: string;
  mnemonicEncrypted: string;
  privateKey: string;
  // tslint:disable-next-line
  HdPath: string;

  encrypt: any;
  decrypt: any;
}

export interface IUserProp {
  propKey: string;
  propValue: string;
}

export interface IGlobalScope extends ng.IRootScopeService {
  activeCalls: number;
  user: {
    imageUrl: string;
    id: number;
    username: string;
    userProperties: IUserProp[];
  };
  walletBalance: {
    bch: number;
    usd: number;
    isLoading: boolean;
  };
  simpleWallet: ISimpleWallet;
  noHeader: boolean;
  logoutMe: any;
}
