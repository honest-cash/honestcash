export interface ISimpleWallet {
  address: string;
  mnemonic: string;
  mnemonicEncrypted: string;
  privateKey: string;
  HdPath: string;

  encrypt: any;
  decrypt: any;
}
export interface IGroupedUpvote {
  userId: number;
  score: number;
  user: {
    imageUrl: string;
    username: string,
    addressBCH: string
  };
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
  HdPath: string;

  encrypt: any;
  decrypt: any;
}


export interface IGlobalScope extends ng.IRootScopeService {
  activeCalls: number;
  user: {
    imageUrl: string;
    id: number;
    username: string;
  },
  simpleWallet: ISimpleWallet;
  noHeader: boolean;
}
