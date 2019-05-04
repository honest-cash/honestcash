import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import {AppStates, selectAuthorizationState} from '../../../../app.states';
import { SignUp } from '../../../../core/store/auth/auth.actions';
import User from '../../../../core/models/user';
import {CodedErrorResponse, FailedResponse} from '../../../../core/models/authentication';
import {Observable} from 'rxjs';
import {State as AuthorizationState} from '../../../../core/store/auth/auth.state';

interface SignupForm extends NgForm {
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
  @HostBinding('class') class = 'w-full flex flex-wrap content-center items-center justify-center';
  @HostBinding('style.height') height = '75vh';
  @HostBinding('style.minHeight') minHeight = '75vh';

  isLoading: boolean;
  getState: Observable<AuthorizationState>;
  errorMessage: FailedResponse;
  errorMessageType: 'string' | 'class';
  isCaptchaRendered = false;
  isCaptchaValid = true;
  user: User = new User();

  constructor(
    private store: Store<AppStates>
  ) {
    this.getState = this.store.select(selectAuthorizationState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      if (state.errorMessage instanceof CodedErrorResponse) {
        this.errorMessage = state.errorMessage.desc;
      } else if (typeof state.errorMessage === 'string') {
        this.errorMessage = state.errorMessage;
      }

      this.isLoading = state.isLoading;
    });

    this.renderCaptcha();
  }

  private renderCaptcha() {
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

  onSubmit(form: SignupForm): void {
    const captcha = grecaptcha.getResponse();

    if (!captcha || captcha.length === 0) {
      this.isCaptchaValid = false;

      return grecaptcha.reset();
    }

    const payload = form.value;
    payload.captcha = captcha;

    this.store.dispatch(new SignUp(payload));
  }
}
