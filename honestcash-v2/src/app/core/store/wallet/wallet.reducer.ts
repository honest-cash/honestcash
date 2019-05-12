
import { WalletActionTypes, All } from './wallet.actions';
import { State, initialState } from './wallet.state';
import { WalletUtils } from '../../../shared/lib/WalletUtils';

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case WalletActionTypes.WALLET_SETUP: {
      return {
        ...state,
      };
    }
    case WalletActionTypes.WALLET_GENERATED: {
      return {
        ...state,
        wallet: action.payload.wallet
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
