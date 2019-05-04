import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs';
import User from '../../../../core/models/user';
import {AppStates, selectAuthorizationState} from '../../../../app.states';
import {State as AuthorizationState} from '../../../../core/store/auth/auth.state';
import { ResetPasswordRequest } from '../../../../core/store/auth/auth.actions';
import { NgForm } from '@angular/forms';
import { WelcomeErrorHandler } from '../../helpers/welcome-error.handler';

interface ResetPasswordForm extends NgForm {
  value: {
    email: string;
  };
}

@Component({
  selector: 'app-welcome-page-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @HostBinding('class') class = 'w-full  flex flex-wrap content-center items-center justify-center';
  @HostBinding('style.height') height = '75vh';
  @HostBinding('style.minHeight') minHeight = '75vh';

  private authState: Observable<AuthorizationState>;
  public isLoading = false;
  public user: User = new User();
  public errorMessage: string;

  constructor(
    private store: Store<AppStates>
  ) {
    this.authState = this.store.select(selectAuthorizationState);
  }

  public ngOnInit() {
    this.authState.subscribe((state) => {
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

  public onSubmit(form: ResetPasswordForm): void {
    const payload = form.value;

    this.isLoading = true;

    this.store.dispatch(new ResetPasswordRequest(payload));
  }
}
