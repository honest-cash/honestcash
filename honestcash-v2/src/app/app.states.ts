import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../environments/environment';

import {reducer as CoreReducer} from '../core/store/core.reducer';
import {reducer as AuthReducer} from './auth/store/auth.reducer';
import {reducer as StoryReducer} from './story/store/story.reducer';
import {reducer as UserReducer} from './user/store/user.reducer';
import {reducer as WalletReducer} from './wallet/store/wallet.reducer';
import {reducer as EditorReducer} from './editor/store/editor.reducer';
import {WalletState} from './wallet/store/wallet.state';
import {UserState} from './user/store/user.state';
import {AuthState} from './auth/store/auth.state';
import {EditorState} from './editor/store/editor.state';
import {CoreState} from '../core/store/core.state';
import {StoryState} from './story/store/story.state';

export interface AppStates {
  core: CoreState;
  auth: AuthState;
  story: StoryState;
  user: UserState;
  wallet: WalletState;
  editor: EditorState;
}

export const reducers: ActionReducerMap<AppStates> = {
  core: CoreReducer,
  auth: AuthReducer,
  story: StoryReducer,
  user: UserReducer,
  wallet: WalletReducer,
  editor: EditorReducer,
};

export const metaReducers: MetaReducer<AppStates>[] = !environment.production ? [] : [];

export const selectCoreState = createFeatureSelector<AuthState>('core');
export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectWalletState = createFeatureSelector<WalletState>('wallet');
export const selectStoryState = createFeatureSelector<StoryState>('story');
export const selectUserState = createFeatureSelector<UserState>('user');
export const selectEditorState = createFeatureSelector<EditorState>('editor');
