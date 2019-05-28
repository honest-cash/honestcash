import Post from '../../shared/models/post';
import EditorJS from '@editorjs/editorjs';

export enum EDITOR_STATUS {
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
  editor: EditorJS;
}

export const initialState: State = {
  isLoaded: false,
  status: EDITOR_STATUS.NotInitialized,
  story: new Post(),
  editor: null,
};
