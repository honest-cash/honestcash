import { Action } from '@ngrx/store';
import Post from '../../models/post';

export enum EditorActionTypes {
  EDITOR_LOAD = '[Editor] Editor load',
  EDITOR_UNLOAD = '[Editor] Editor unload',
}

export class EditorLoad implements Action {
  readonly type = EditorActionTypes.EDITOR_LOAD;
  constructor(public payload?: { story: Post}) {}
}

export class EditorUnload implements Action {
  readonly type = EditorActionTypes.EDITOR_UNLOAD;
  constructor() {}
}

export type All =
   | EditorLoad
   | EditorUnload;
