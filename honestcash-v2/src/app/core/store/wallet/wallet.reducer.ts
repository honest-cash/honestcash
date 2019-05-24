import {All, WalletActionTypes} from './wallet.actions';
import {initialState, State} from './wallet.state';
import {Logger} from '../..';

const logger = new Logger();

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case WalletActionTypes.WALLET_SETUP: {
      logger.info('Wallet Setup Started');
      return {
        ...state,
      };
    }
    case WalletActionTypes.WALLET_GENERATED: {
      logger.info('Wallet Generated', action.payload.wallet);
      return {
        ...state,
        wallet: action.payload.wallet,
      };
    }
    case WalletActionTypes.WALLET_CLEANUP: {
      logger.info('Wallet Cleanup Success');
      return initialState;
    }
    default: {
      return state;
    }
  }
}
