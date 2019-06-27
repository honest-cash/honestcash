import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../environments/environment';


import {reducer as MainReducer} from './main/store/main.reducer';
import {reducer as AuthReducer} from './auth/store/auth.reducer';
import {reducer as UserReducer} from './user/store/user.reducer';
import {reducer as WalletReducer} from './wallet/store/wallet.reducer';
import {reducer as EditorReducer} from './editor/store/editor.reducer';
import {WalletState} from './wallet/store/wallet.state';
import {UserState} from './user/store/user.state';
import {AuthState} from './auth/store/auth.state';
import {EditorState} from './editor/store/editor.state';
import {MainState} from './main/store/main.state';

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
