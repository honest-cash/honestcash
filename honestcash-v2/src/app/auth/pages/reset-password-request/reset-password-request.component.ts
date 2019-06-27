import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import User from '../../../user/models/user';
import {AppStates, selectAuthState} from '../../../app.states';
import {State as AuthState} from '../../../../store/auth/auth.state';
import {ResetPasswordRequest} from '../../../../store/auth/auth.actions';
import {NgForm} from '@angular/forms';
import {AuthErrorHelper} from '../../helpers/auth-error.helper';

export interface ResetPasswordRequestForm extends NgForm {
  value: {
    email: string;
  };
}

@Component({
  selector: 'app-welcome-page-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.scss']
})
export class ResetPasswordRequestComponent implements OnInit {
  @HostBinding('class') class = 'card mb-auto mt-auto';

  public authState: Observable<AuthState>;
  public isLoading = false;
  public user: User = new User();
  public errorMessage: string;

  constructor(
    private store: Store<AppStates>
  ) {
    this.authState = this.store.select(selectAuthState);
  }

  public ngOnInit() {
    this.authState.subscribe((state) => {
      if (state.newPasswordRequested || !state.errorMessage) {
        delete this.errorMessage;
      } else {
        this.errorMessage = AuthErrorHelper.getErrorDesc(state.errorMessage);
      }

      this.isLoading = state.isLoading;
    });
  }

  public onSubmit(form: ResetPasswordRequestForm): void {
    const payload = form.value;

    this.isLoading = true;

    this.store.dispatch(new ResetPasswordRequest(payload));
  }
}
