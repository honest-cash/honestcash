import UserProp from './user-prop';

export default class User {
  public id?: number;
  public bio?: string;
  public followerCount?: number;
  public followingCount?: number;
  public firstName?: string;
  public lastName?: string;
  public notifCount?: number;
  public postCount?: number;
  public status?: string;
  public website?: string;
  public alreadyFollowing?: boolean;
  public username?: string;
  public imageUrl?: string;
  public token?: string;
  public email?: string;
  public password?: string;
  public addressBCH?: string;
  public addressSLP?: string;
  public userProperties?: UserProp[];
  public wallet?: {
    mnemonicEncrypted: string;
  };

}
