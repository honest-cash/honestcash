import { Action } from '@ngrx/store';
import Post, {PostSaveSuccessResponse} from '../../models/post';
import {FailedResponse} from '../../models/authentication';

export enum EditorActionTypes {
  EDITOR_LOAD = '[Editor] Editor Load',
  EDITOR_UNLOAD = '[Editor] Editor Unload',
  EDITOR_CHANGE = '[Editor] Editor Change',
  EDITOR_STORY_PROPERTY_CHANGE = '[Editor] Story Property <v>hange',
  EDITOR_STORY_SAVE = '[Editor] Story Save',
  EDITOR_STORY_SAVE_SUCCESS = '[Editor] Story Save Success',
  EDITOR_STORY_SAVE_FAILURE = '[Editor] Story Save Failure',
}

export class EditorLoad implements Action {
  readonly type = EditorActionTypes.EDITOR_LOAD;
  constructor(public payload?: { story: Post }) {}
}

export class EditorUnload implements Action {
  readonly type = EditorActionTypes.EDITOR_UNLOAD;
  constructor() {}
}

export class EditorChange implements Action {
  readonly type = EditorActionTypes.EDITOR_CHANGE;
  constructor(public payload: Post) {}
}

export class EditorPropertyChange implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_PROPERTY_CHANGE;
  constructor(public payload: { property: string; value: string; }) {}
}

export class EditorStorySave implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_SAVE;
  constructor(public payload: Post) {}
}

export class EditorStorySaveSuccess implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_SAVE_SUCCESS;
  constructor(public payload: Post) {}
}

export class EditorStorySaveFailure implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_SAVE_FAILURE;
  constructor(public payload: FailedResponse) {}
}

export type All =
   | EditorLoad
   | EditorUnload
   | EditorChange
   | EditorPropertyChange
   | EditorStorySave
   | EditorStorySaveSuccess
   | EditorStorySaveFailure;
