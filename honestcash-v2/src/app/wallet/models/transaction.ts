import User from '../../user/models/user';

export interface ITransaction {
  postId: number;
  txId?: string;
  receivers?: ITRansactionResult[];
  sender?: User;
}

export interface ITRansactionResult {
  upvoteId?: number;
  user: User;
  amountSat?: number;
  amountDollars?: number;
  address?: string;
}

export enum TRANSACTION_TYPES {
  Upvote = 'UPVOTE',
  Unlock = 'UNLOCK',
  Comment = 'COMMENT',
}
