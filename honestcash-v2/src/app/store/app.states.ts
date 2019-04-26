import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  State
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import {State as AuthState} from '../store/auth/auth.state';
import {reducer as AuthReducer} from '../store/auth/auth.reducer';

import {State as WalletState} from '../store/wallet/wallet.state';
import {reducer as WalletReducer} from '../store/wallet/wallet.reducer';

export interface AppState {
  auth: AuthState;
  wallet: WalletState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: AuthReducer,
  wallet: WalletReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectWalletState = createFeatureSelector<AppState>('wallet');
