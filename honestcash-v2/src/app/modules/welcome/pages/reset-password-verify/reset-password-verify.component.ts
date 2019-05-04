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

interface ResetPasswordVerifyForm extends NgForm {
  value: {
    email: string;
    code: string;
    newPassword: string;
    repeatNewPassword: string;
    mnemonicEncrypted: string;
  };
}

@Component({
  selector: 'app-welcome-page-reset-password',
  templateUrl: './reset-password-verify.component.html',
  styleUrls: ['./reset-password-verify.component.scss']
})
export class ResetPasswordVerifyComponent implements OnInit {
  @HostBinding('class') class = 'w-full  flex flex-wrap content-center items-center justify-center';
  @HostBinding('style.height') height = '75vh';
  @HostBinding('style.minHeight') minHeight = '75vh';

  private logger = new Logger('ResetPasswordVerifyComponent');
  private authState: Observable<AuthorizationState>;
  private resetCode: string;

  public errorMessage: string;
  public isLoading = false;
  public values: any = {
    email: '',
    code: '',
    newPassword: '',
    repeatNewPassword: '',
  };

  constructor(
    private store: Store<AppStates>,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.resetCode = params.resetCode;

      this.logger.info(`Password reset code: ${this.resetCode}`);
    });

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

  public onSubmit(form: ResetPasswordVerifyForm): void {
    const formValues = form.value;

    this.isLoading = true;

    const payload = {
      ...formValues,
      code: this.resetCode
    };

    this.store.dispatch(new ResetPassword(payload));
  }
}
