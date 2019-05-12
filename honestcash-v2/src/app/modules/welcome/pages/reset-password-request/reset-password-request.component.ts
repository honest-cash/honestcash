import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs';
import User from '../../../../core/models/user';
import {AppStates, selectAuthorizationState} from '../../../../app.states';
import {State as AuthorizationState} from '../../../../core/store/auth/auth.state';
import { ResetPasswordRequest } from '../../../../core/store/auth/auth.actions';
import { NgForm } from '@angular/forms';
import { WelcomeErrorHandler } from '../../helpers/welcome-error.handler';

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

  public auth$: Observable<AuthorizationState>;
  public isLoading = false;
  public user: User = new User();
  public errorMessage: string;

  constructor(
    private store: Store<AppStates>
  ) {
    this.auth$ = this.store.select(selectAuthorizationState);
  }

  public ngOnInit() {
    this.auth$.subscribe((state) => {
      if (state.newPasswordRequested) {
        delete this.errorMessage;
      } else if (!state.errorMessage) {
        delete this.errorMessage;
      } else {
        this.errorMessage = WelcomeErrorHandler.getErrorDesc(state.errorMessage);
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
