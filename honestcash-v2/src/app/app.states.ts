import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../environments/environment';


import {reducer as AuthReducer} from './auth/store/auth.reducer';
import {reducer as UserReducer} from './user/store/user.reducer';
import {reducer as WalletReducer} from './wallet/store/wallet.reducer';
import {reducer as EditorReducer} from './editor/store/editor.reducer';
import {WalletState} from './wallet/store/wallet.state';
import {UserState} from './user/store/user.state';
import {AuthState} from './auth/store/auth.state';
import {EditorState} from './editor/store/editor.state';

export interface AppStates {
  auth: AuthState;
  user: UserState;
  wallet: WalletState;
  editor: EditorState;
}

export const reducers: ActionReducerMap<AppStates> = {
  auth: AuthReducer,
  user: UserReducer,
  wallet: WalletReducer,
  editor: EditorReducer,
};

export const metaReducers: MetaReducer<AppStates>[] = !environment.production ? [] : [];

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectWalletState = createFeatureSelector<WalletState>('wallet');
export const selectUserState = createFeatureSelector<UserState>('user');
export const selectEditorState = createFeatureSelector<EditorState>('editor');
