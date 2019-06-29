import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {UserSetup} from '../../app/user/store/user.actions';
import {WalletSetup} from '../../app/wallet/store/wallet.actions';
import {CoreActionTypes} from './core.actions';
import {LocalStorageToken} from '../shared/helpers/local-storage.helper';
import {AuthSetup} from '../../app/auth/store/auth.actions';


@Injectable()
export class CoreEffects {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private actions: Actions,
  ) {
  }

  @Effect()
  public CoreLoad: Observable<any> = this.actions.pipe(
    ofType(CoreActionTypes.CORE_LOAD),
    mergeMap(() => [new WalletSetup(), new UserSetup(), new AuthSetup()]
    )
  );
}
