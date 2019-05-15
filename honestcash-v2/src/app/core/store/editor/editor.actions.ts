import { Action } from '@ngrx/store';
import Post, {PostSaveSuccessResponse} from '../../models/post';
import {FailedResponse} from '../../models/authentication';

export enum EditorActionTypes {
  EDITOR_LOAD = '[Editor] Editor load',
  EDITOR_UNLOAD = '[Editor] Editor unload',
  EDITOR_STORY_SAVE = '[Editor] Story Save',
  EDITOR_STORY_SAVE_SUCCESS = '[Editor] Story Save Success',
  EDITOR_STORY_SAVE_FAILURE = '[Editor] Story Save Failure',
}

export class EditorLoad implements Action {
  readonly type = EditorActionTypes.EDITOR_LOAD;
  constructor(public payload?: { story: Post}) {}
}

export class EditorUnload implements Action {
  readonly type = EditorActionTypes.EDITOR_UNLOAD;
  constructor() {}
}

export class EditorStorySave implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_SAVE;
  constructor(public payload: Post) {}
}

export class EditorStorySaveSuccess implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_SAVE_SUCCESS;
  constructor(public payload: PostSaveSuccessResponse) {}
}

export class EditorStorySaveFailure implements Action {
  readonly type = EditorActionTypes.EDITOR_STORY_SAVE_FAILURE;
  constructor(public payload: FailedResponse) {}
}

export type All =
   | EditorLoad
   | EditorUnload
   | EditorStorySave
   | EditorStorySaveSuccess
   | EditorStorySaveFailure;
