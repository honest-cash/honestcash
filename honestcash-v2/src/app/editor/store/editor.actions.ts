import {Action} from '@ngrx/store';
import Story from '../../main/models/story';
import {FailedResponse} from '../../auth/models/authentication';
import {STORY_PROPERTIES} from '../shared/editor.story-properties';
import {StoryLoadContext} from '../shared/interfaces';

export enum EditorActionTypes {
  EDITOR_LOAD = '[Editor] Editor Load',
  EDITOR_UNLOAD = '[Editor] Editor Unload',
  EDITOR_STORY_LOAD = '[Editor] Editor Story Load',
  EDITOR_STORY_LOAD_SUCCESS = '[Editor] Editor Story Load Success',
  EDITOR_STORY_LOAD_FAILURE = '[Editor] Editor Story Load Failure',
  EDITOR_STORY_PROPERTY_CHANGE = '[Editor] Story Property Change',
  EDITOR_STORY_PROPERTY_SAVE = '[Editor] Story Property Save',
  EDITOR_STORY_PROPERTY_SAVE_SUCCESS = '[Editor] Story Property Save Success',
  EDITOR_STORY_PROPERTY_SAVE_FAILURE = '[Editor] Story Property Save Failure',
  EDITOR_STORY_SAVE = '[Editor] Story Save',
  EDITOR_STORY_SAVE_SUCCESS = '[Editor] Story Save Success',
  EDITOR_STORY_SAVE_FAILURE = '[Editor] Story Save Failure',
  EDITOR_STORY_SAVE_AND_PUBLISH = '[Editor] Story Save and Publish',
  EDITOR_STORY_PUBLISH_SUCCESS = '[Editor] Story Publish Success',
  EDITOR_STORY_PUBLISH_FAILURE = '[Editor] Story Publish Failure',
}

export class EditorLoad implements Action {
  public readonly type = EditorActionTypes.EDITOR_LOAD;
}

export class EditorUnload implements Action {
  public readonly type = EditorActionTypes.EDITOR_UNLOAD;
}

export class EditorStoryLoad implements Action {
  public readonly type = EditorActionTypes.EDITOR_STORY_LOAD;

  constructor(public payload?: StoryLoadContext) {
  }
}

export class EditorStoryLoadSuccess implements Action {
  public readonly type = EditorActionTypes.EDITOR_STORY_LOAD_SUCCESS;

  constructor(public payload: Story) {
  }
}

export class EditorStoryLoadFailure implements Action {
  public readonly type = EditorActionTypes.EDITOR_STORY_LOAD_FAILURE;

  constructor(public payload: FailedResponse) {
  }
}

export class EditorStoryPropertyChange implements Action {
  public readonly type = EditorActionTypes.EDITOR_STORY_PROPERTY_CHANGE;

  constructor(public payload: { property: STORY_PROPERTIES; value: any; }) {
  }
}

export class EditorStoryPropertySave implements Action {
  public readonly type = EditorActionTypes.EDITOR_STORY_PROPERTY_SAVE;

  constructor(public payload: { story: Story, property: STORY_PROPERTIES }) {
  }
}

export class EditorStoryPropertySaveSuccess implements Action {
  public readonly type = EditorActionTypes.EDITOR_STORY_PROPERTY_SAVE_SUCCESS;
}

export class EditorStoryPropertySaveFailure implements Action {
  public readonly type = EditorActionTypes.EDITOR_STORY_PROPERTY_SAVE_FAILURE;
}

export class EditorStorySave implements Action {
  public readonly type = EditorActionTypes.EDITOR_STORY_SAVE;
}

export class EditorStorySaveSuccess implements Action {
  public readonly type = EditorActionTypes.EDITOR_STORY_SAVE_SUCCESS;

  constructor(public payload: Story) {
  }
}

export class EditorStorySaveAndPublish implements Action {
  public readonly type = EditorActionTypes.EDITOR_STORY_SAVE_AND_PUBLISH;

  constructor(public payload: Story, public properties: STORY_PROPERTIES[]) {
  }
}

export class EditorStorySaveFailure implements Action {
  public readonly type = EditorActionTypes.EDITOR_STORY_SAVE_FAILURE;

  constructor(public payload: FailedResponse) {
  }
}

export class EditorStoryPublishSuccess implements Action {
  public readonly type = EditorActionTypes.EDITOR_STORY_PUBLISH_SUCCESS;

  constructor(public payload: Story) {
  }
}

export class EditorStoryPublishFailure implements Action {
  public readonly type = EditorActionTypes.EDITOR_STORY_PUBLISH_FAILURE;

  constructor(public payload: FailedResponse) {
  }
}

export type All =
  | EditorLoad
  | EditorUnload
  | EditorStoryLoad
  | EditorStoryLoadSuccess
  | EditorStoryLoadFailure
  | EditorStoryPropertyChange
  | EditorStoryPropertySave
  | EditorStoryPropertySaveSuccess
  | EditorStoryPropertySaveFailure
  | EditorStorySave
  | EditorStorySaveSuccess
  | EditorStorySaveFailure
  | EditorStorySaveAndPublish
  | EditorStoryPublishSuccess
  | EditorStoryPublishFailure;
