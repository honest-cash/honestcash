import Story from '../../story/models/story';

export enum EDITOR_STATUS {
  NotInitialized = 'NOT_INITIALIZED',
  StoryLoaded = 'STORY_LOADED',
  EditorLoaded = 'EDITOR_LOADED',
  NotSaved = 'NOT_SAVED',
  Saved = 'SAVED',
  Saving = 'SAVING',
  Publishing = 'PUBLISHING',
  Published = 'PUBLISHED',
}

export interface EditorState {
  status: EDITOR_STATUS;
  story: Story;
}

export const initialEditorState: EditorState = {
  status: EDITOR_STATUS.NotInitialized,
  story: new Story(),
};
