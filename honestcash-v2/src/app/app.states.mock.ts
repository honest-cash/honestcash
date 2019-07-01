import {AppStates} from './app.states';
import {initialUserState} from './user/store/user.state';
import {initialEditorState} from './editor/store/editor.state';
import {initialAuthState} from './auth/store/auth.state';
import {initialWalletState} from './wallet/store/wallet.state';
import {initialCoreState} from '../core/store/core.state';
import {initialStoryState} from './story/store/story.state';

export const initialAppStates: AppStates = {
  core: initialCoreState,
  wallet: initialWalletState,
  story: initialStoryState,
  user: initialUserState,
  auth: initialAuthState,
  editor: initialEditorState,
};
