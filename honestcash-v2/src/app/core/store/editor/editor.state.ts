import Post from '../../models/post';

export enum EDITOR_SAVE_STATUS {
  NotSaved = 'NOT_SAVED',
  Saved = 'SAVED',
  Saving = 'SAVING',
  Publishing = 'PUBLISHING',
  Published = 'PUBLISHED',
  Initialized = 'INITIALIZED',
  NotInitialized = 'NOT_INITIALIZED',
}

export interface State {
  isLoaded: boolean;
  status: EDITOR_SAVE_STATUS;
  story: Post;
}

export const initialState: State = {
  isLoaded: false,
  status: EDITOR_SAVE_STATUS.NotInitialized,
  story: new Post(),
};
