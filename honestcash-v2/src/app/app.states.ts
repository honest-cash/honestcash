import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  State
} from '@ngrx/store';
import { environment } from '../environments/environment';

import {State as AppState} from './core/store/app/app.state';
import {reducer as AppReducer} from './core/store/app/app.reducer';

import {State as AuthState} from './core/store/auth/auth.state';
import {reducer as AuthReducer} from './core/store/auth/auth.reducer';


import {State as UserState} from './core/store/user/user.state';
import {reducer as UserReducer} from './core/store/user/user.reducer';

import {State as WalletState} from './core/store/wallet/wallet.state';
import {reducer as WalletReducer} from './core/store/wallet/wallet.reducer';

export interface AppStates {
  app: AppState;
  authorization: AuthState;
  user: UserState;
  wallet: WalletState;
}

export const reducers: ActionReducerMap<AppStates> = {
  app: AppReducer,
  authorization: AuthReducer,
  user: UserReducer,
  wallet: WalletReducer,
};

export const metaReducers: MetaReducer<AppStates>[] = !environment.production ? [] : [];

export const selectAppState = createFeatureSelector<AppState>('app');
export const selectAuthorizationState = createFeatureSelector<AuthState>('authorization');
export const selectWalletState = createFeatureSelector<WalletState>('wallet');
export const selectUserState = createFeatureSelector<UserState>('user');
