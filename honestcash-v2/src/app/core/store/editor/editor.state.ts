import Post from '../../models/post';

export interface State {
  isLoaded: boolean;
  story: Post;
}

export const initialState: State = {
  isLoaded: false,
  story: new Post(),
};
