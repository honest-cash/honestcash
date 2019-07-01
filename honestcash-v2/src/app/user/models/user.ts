import UserProp from './user-prop';

export default class User {
  id?: number;
  username?: string;
  imageUrl?: string;
  token?: string;
  email?: string;
  password?: string;
  addressBCH?: string;
  addressSLP?: string;
  userProperties?: UserProp[];
  wallet?: {
    mnemonicEncrypted: string;
  };
}
