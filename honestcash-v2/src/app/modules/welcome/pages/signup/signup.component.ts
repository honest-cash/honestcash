import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {NgForm} from '@angular/forms';
import {AppStates, selectAuthState} from '../../../../app.states';
import {SignUp} from '../../../../core/store/auth/auth.actions';
import User from '../../../../core/models/user';
import {Observable} from 'rxjs';
import {State as AuthorizationState} from '../../../../core/store/auth/auth.state';
import {WelcomeErrorHandler} from '../../helpers/welcome-error.handler';

export interface SignupForm extends NgForm {
  value: {
    username: string;
    email: string;
    password: string;
    captcha: string;
  };
}

declare let grecaptcha: any;

@Component({
  selector: 'app-welcome-page-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @HostBinding('class') class = 'card mb-auto mt-auto';

  isLoading = false;
  authState: Observable<AuthorizationState>;
  errorMessage: string;
  isCaptchaRendered = false;
  isCaptchaValid = true;
  user: User = new User();

  constructor(
    private store: Store<AppStates>
  ) {
    this.authState = this.store.select(selectAuthState);
  }

  public ngOnInit() {
    this.authState.subscribe((state) => {
      if (!state.errorMessage) {
        delete this.errorMessage;

        return;
      }

      this.errorMessage = WelcomeErrorHandler.getErrorDesc(state.errorMessage);
      this.isLoading = state.isLoading;
    });

    this.renderCaptcha();
  }

  public onSubmit(form: SignupForm): void {
    const captcha = grecaptcha.getResponse();

    if (!captcha || captcha.length === 0) {
      this.isCaptchaValid = false;

      return grecaptcha.reset();
    }

    this.isLoading = true;
    const payload = form.value;

    payload.captcha = captcha;

    this.store.dispatch(new SignUp(payload));
  }

  public renderCaptcha() {
    if (this.isCaptchaRendered) {
      return;
    }

    try {
      grecaptcha.render('hc-captcha');

      this.isCaptchaRendered = true;
    } catch (err) {
      setTimeout(() => this.renderCaptcha(), 1000);
    }
  }
}
