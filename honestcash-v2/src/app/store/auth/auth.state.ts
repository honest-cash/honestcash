export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
}

export const initialState: State = {
  isAuthenticated: false,
};
