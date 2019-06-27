import User from '../../user/models/user';

export class Upvote {
  public txId: string;
  public userPostId: number;
  public userId: number;
  public user: User;
}

