import {AppStates} from './app.states';
import {initialUserState} from './user/store/user.state';
import {initialMainState} from './main/store/main.state';
import {initialEditorState} from './editor/store/editor.state';
import {initialAuthState} from './auth/store/auth.state';
import {initialWalletState} from './wallet/store/wallet.state';

export const initialAppStates: AppStates = {
  main: initialMainState,
  wallet: initialWalletState,
  user: initialUserState,
  auth: initialAuthState,
  editor: initialEditorState,
};
