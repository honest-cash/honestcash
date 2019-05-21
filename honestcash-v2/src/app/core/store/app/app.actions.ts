import {Action} from '@ngrx/store';

export enum AppActionTypes {
  APP_LOAD = '[App] App load',
}

export class AppLoad implements Action {
  readonly type = AppActionTypes.APP_LOAD;

  constructor() {
  }
}

export type All =
  | AppLoad;
