
import { WalletActionTypes, All } from './wallet.actions';
import { State, initialState } from './wallet.state';
import { WalletUtils } from '../../shared/lib/WalletUtils';

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case WalletActionTypes.WALLET_SETUP: {
      const simpleWallet = WalletUtils.generateWalletWithEncryptedRecoveryPhrase(action.payload.mnemonicEncrypted, action.payload.password);

      return {
        ...state,
        wallet: {
          mnemonic: simpleWallet.mnemonic,
          HdPath: simpleWallet.HdPath
        }
      };
    }
    case WalletActionTypes.WALLET_CLEANUP: {
      return {
        ...state,
        wallet: null
      };
    }
    default: {
      return state;
    }
  }
}
