import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../environments/environment';

import {State as AppState} from './app/store/app/app.state';
import {reducer as AppReducer} from './app/store/app/app.reducer';

import {State as AuthState} from './auth/store/auth/auth.state';
import {reducer as AuthReducer} from './auth/store/auth/auth.reducer';

import {State as UserState} from './user/store/user/user.state';
import {reducer as UserReducer} from './user/store/user/user.reducer';

import {State as WalletState} from './wallet/store/wallet/wallet.state';
import {reducer as WalletReducer} from './wallet/store/wallet/wallet.reducer';

import {State as EditorState} from './editor/store/editor/editor.state';
import {reducer as EditorReducer} from './editor/store/editor/editor.reducer';

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
