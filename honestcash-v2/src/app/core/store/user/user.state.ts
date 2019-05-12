import User from 'app/core/models/user';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null
};
