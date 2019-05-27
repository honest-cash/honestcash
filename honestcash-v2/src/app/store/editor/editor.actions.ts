import {Action} from '@ngrx/store';
import Post from '../../shared/models/post';
import {FailedResponse} from '../../shared/models/authentication';
import {STORY_PROPERTIES} from '../../modules/editor/services/editor.service';
import EditorJS from '@editorjs/editorjs';

export enum EditorActionTypes {
  EDITOR_LOAD = '[Editor] Editor Load',
  EDITOR_UNLOAD = '[Editor] Editor Unload',
  EDITOR_CHANGE = '[Editor] Editor Change',
  EDITOR_STORY_PROPERTY_CHANGE = '[Editor] Story Property Change',
  EDITOR_STORY_PROPERTY_SAVE = '[Editor] Story Property Save',
  EDITOR_STORY_SAVE = '[Editor] Story Save',
  EDITOR_STORY_SAVE_SUCCESS = '[Editor] Story Save Success',
  EDITOR_STORY_SAVE_FAILURE = '[Editor] Story Save Failure',
  EDITOR_STORY_SAVE_AND_PUBLISH = '[Editor] Story Save and Publish',
  EDITOR_STORY_PUBLISH = '[Editor] Story Publish',
  EDITOR_STORY_PUBLISH_SUCCESS = '[Editor] Story Publish Success',
  EDITOR_STORY_PUBLISH_FAILURE = '[Editor] Story Publish Failure',
}

export class EditorLoad implements Action {
  readonly type = EditorActionTypes.EDITOR_LOAD;

  constructor(public payload?: { story?: Post, editor: EditorJS }) {
  }
}

export class EditorUnload implements Action {
  readonly type = EditorActionTypes.EDITOR_UNLOAD;

  constructor() {
  }
}

export class EditorChange implements Action {
  readonly type = EditorActionTypes.EDITOR_CHANGE;

  constructor(public payload: { story: Post, editor: EditorJS }) {
  }
}

export class EditorStoryPropertyChange implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_PROPERTY_CHANGE;

  constructor(public payload: { property: STORY_PROPERTIES; value: any; }) {
  }
}

export class EditorStoryPropertySave implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_PROPERTY_SAVE;

  constructor(public payload: { story: Post, property: STORY_PROPERTIES }) {
  }
}

export class EditorStorySave implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_SAVE;

  constructor(public payload: Post) {
  }
}

export class EditorStorySaveSuccess implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_SAVE_SUCCESS;

  constructor(public payload: Post) {
  }
}

export class EditorStorySaveAndPublish implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_SAVE_AND_PUBLISH;

  constructor(public payload: Post) {
  }
}

export class EditorStorySaveFailure implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_SAVE_FAILURE;

  constructor(public payload: FailedResponse) {
  }
}

export class EditorStoryPublish implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_PUBLISH;

  constructor(public payload: Post) {
  }
}

export class EditorStoryPublishSuccess implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_PUBLISH_SUCCESS;

  constructor(public payload: Post) {
  }
}

export class EditorStoryPublishFailure implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_PUBLISH_FAILURE;

  constructor(public payload: FailedResponse) {
  }
}

export type All =
  | EditorLoad
  | EditorUnload
  | EditorChange
  | EditorStoryPropertyChange
  | EditorStoryPropertySave
  | EditorStorySave
  | EditorStorySaveSuccess
  | EditorStorySaveFailure
  | EditorStorySaveAndPublish
  | EditorStoryPublish
  | EditorStoryPublishSuccess
  | EditorStoryPublishFailure;
