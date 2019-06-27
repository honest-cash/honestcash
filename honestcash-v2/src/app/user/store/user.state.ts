import User from 'app/user/models/user';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null
};
