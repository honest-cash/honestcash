import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  State
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import {State as AuthState} from '../store/auth/auth.state';
import {reducer as AuthReducer} from '../store/auth/auth.reducer';


import {State as UserState} from '../store/user/user.state';
import {reducer as UserReducer} from '../store/user/user.reducer';

export interface AppState {
  auth: AuthState;
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: AuthReducer,
  user: UserReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectUserState = createFeatureSelector<AppState>('user');
