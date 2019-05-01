export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  token: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  token: null,
};
