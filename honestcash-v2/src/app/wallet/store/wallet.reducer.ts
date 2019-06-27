import {All, WalletActionTypes} from './wallet.actions';
import {initialWalletState, WalletState} from './wallet.state';
import {Logger} from '../../../core';

const logger = new Logger();

export function reducer(state = initialWalletState, action: All): WalletState {
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
      return initialWalletState;
    }
    default: {
      return state;
    }
  }
}
