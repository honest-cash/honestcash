import {AppStates} from './app.states';
import {initialState as initialMainState} from './main/store/main.state';
import {initialState as initialWalletState} from './wallet/store/wallet.state';
import {initialState as initialAuthState} from './auth/store/auth.state';
import {initialState as initialEditorState} from './editor/store/editor.state';
import {initialUserState} from './user/store/user.state';

export const initialAppStates: AppStates = {
  main: initialMainState,
  wallet: initialWalletState,
  user: initialUserState,
  auth: initialAuthState,
  editor: initialEditorState,
};
