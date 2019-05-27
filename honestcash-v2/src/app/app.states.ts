import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../environments/environment';

import {State as AppState} from './store/app/app.state';
import {reducer as AppReducer} from './store/app/app.reducer';

import {State as AuthState} from './store/auth/auth.state';
import {reducer as AuthReducer} from './store/auth/auth.reducer';

import {State as UserState} from './store/user/user.state';
import {reducer as UserReducer} from './store/user/user.reducer';

import {State as WalletState} from './store/wallet/wallet.state';
import {reducer as WalletReducer} from './store/wallet/wallet.reducer';

import {State as EditorState} from './store/editor/editor.state';
import {reducer as EditorReducer} from './store/editor/editor.reducer';

export interface AppStates {
  app: AppState;
  auth: AuthState;
  user: UserState;
  wallet: WalletState;
  editor: EditorState;
}

export const reducers: ActionReducerMap<AppStates> = {
  app: AppReducer,
  auth: AuthReducer,
  user: UserReducer,
  wallet: WalletReducer,
  editor: EditorReducer,
};

export const metaReducers: MetaReducer<AppStates>[] = !environment.production ? [] : [];

export const selectAppState = createFeatureSelector<AppState>('app');
export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectWalletState = createFeatureSelector<WalletState>('wallet');
export const selectUserState = createFeatureSelector<UserState>('user');
export const selectEditorState = createFeatureSelector<EditorState>('editor');
