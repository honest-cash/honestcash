import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  State
} from '@ngrx/store';
import { environment } from '../environments/environment';

import {State as AuthState} from './core/store/auth/auth.state';
import {reducer as AuthReducer} from './core/store/auth/auth.reducer';


import {State as UserState} from './core/store/user/user.state';
import {reducer as UserReducer} from './core/store/user/user.reducer';

export interface AppState {
  authorization: AuthState;
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  authorization: AuthReducer,
  user: UserReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectAuthorizationState = createFeatureSelector<AppState>('authorization');
export const selectUserState = createFeatureSelector<AppState>('user');
