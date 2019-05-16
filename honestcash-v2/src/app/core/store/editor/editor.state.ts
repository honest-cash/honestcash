import Post from '../../models/post';

export enum EDITOR_SAVE_STATUS {
  NotSaved = 'NOT_SAVED',
  Saved = 'SAVED',
  Saving = 'SAVING',
  Publishing = 'PUBLISHING',
  Published = 'PUBLISHED',
}

export interface State {
  isLoaded: boolean;
  status: EDITOR_SAVE_STATUS;
  story: Post;
}

export const initialState: State = {
  isLoaded: false,
  status: EDITOR_SAVE_STATUS.NotSaved,
  story: new Post(),
};
