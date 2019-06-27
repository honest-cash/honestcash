import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../environments/environment';

import {State as MainState} from './main/store/main.state';
import {reducer as MainReducer} from './main/store/main.reducer';

import {State as AuthState} from './auth/store/auth.state';
import {reducer as AuthReducer} from './auth/store/auth.reducer';

import {State as UserState} from './user/store/user.state';
import {reducer as UserReducer} from './user/store/user.reducer';

import {State as WalletState} from './wallet/store/wallet.state';
import {reducer as WalletReducer} from './wallet/store/wallet.reducer';

import {State as EditorState} from './editor/store/editor.state';
import {reducer as EditorReducer} from './editor/store/editor.reducer';

export interface AppStates {
  main: MainState;
  auth: AuthState;
  user: UserState;
  wallet: WalletState;
  editor: EditorState;
}

export const reducers: ActionReducerMap<AppStates> = {
  main: MainReducer,
  auth: AuthReducer,
  user: UserReducer,
  wallet: WalletReducer,
  editor: EditorReducer,
};

export const metaReducers: MetaReducer<AppStates>[] = !environment.production ? [] : [];

export const selectMainState = createFeatureSelector<MainState>('main');
export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectWalletState = createFeatureSelector<WalletState>('wallet');
export const selectUserState = createFeatureSelector<UserState>('user');
export const selectEditorState = createFeatureSelector<EditorState>('editor');
