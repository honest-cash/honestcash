import Post from '../../shared/models/post';

export enum EDITOR_STATUS {
  Loaded = 'LOADED',
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
  status: EDITOR_STATUS;
  story: Post;
}

export const initialState: State = {
  isLoaded: false,
  status: EDITOR_STATUS.NotInitialized,
  story: new Post(),
};
