import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import {ResetPassword} from '../../../../core/store/auth/auth.actions';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Logger } from 'app/core';
import {Observable} from 'rxjs';
import {AppStates, selectAuthorizationState} from '../../../../app.states';
import {State as AuthorizationState} from '../../../../core/store/auth/auth.state';
import { WelcomeErrorHandler } from '../../helpers/welcome-error.handler';
import {ResetPasswordContext} from '../../../../core/models/authentication';

export interface ResetPasswordForm extends NgForm {
  value: ResetPasswordContext;
}

@Component({
  selector: 'app-welcome-page-reset-password-request',
  templateUrl: './reset-password-verify.component.html',
  styleUrls: ['./reset-password-verify.component.scss']
})
export class ResetPasswordVerifyComponent implements OnInit {
  @HostBinding('class') class = 'card mb-auto mt-auto';

  private logger = new Logger('ResetPasswordVerifyComponent');

  public auth$: Observable<AuthorizationState>;
  public errorMessage: string;
  public isLoading = false;
  public values: ResetPasswordContext = {
    email: '',
    code: '',
    newPassword: '',
    repeatNewPassword: '',
  };
  public resetCode: string;

  constructor(
    private store: Store<AppStates>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.auth$ = this.store.select(selectAuthorizationState);
  }

  public ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.resetCode = params.resetCode;

      this.logger.info(`Password reset code: ${this.resetCode}`);
    });

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

  public onSubmit(form: ResetPasswordForm): void {
    const formValues = form.value;

    this.isLoading = true;

    const payload = {
      ...formValues,
      code: this.resetCode
    };

    this.store.dispatch(new ResetPassword(payload));
  }
}
