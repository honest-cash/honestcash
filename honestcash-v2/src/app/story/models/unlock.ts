import User from '../../user/models/user';
import Story from './story';

export class Unlock {
  public txId: string;
  public userPostId: number;
  public userId: number;
  public user: User;
  public userPost: Story;
  public createdAt: string;
  public createdAtFormatted: string;
}
