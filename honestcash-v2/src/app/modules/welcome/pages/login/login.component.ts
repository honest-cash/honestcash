import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import {AppStates, selectAuthorizationState} from '../../../../app.states';
import { State as AuthorizationState } from '../../../../core/store/auth/auth.state';
import User from '../../../../models/user';
import {Observable} from 'rxjs';
import {LogIn} from '../../../../core/store/auth/auth.actions';
import {CodedErrorResponse, FailedResponse} from '../../../../core/services/authentication.interfaces';

interface LoginForm extends NgForm {
  value: {
    email: string;
    password: string;
  };
}

export const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_BLOCKED: 'USER_BLOCKED',
  NOT_ACTIVATED: 'NOT_ACTIVATED',
  USER_NOT_VERIFIED: 'USER_NOT_VERIFIED',
  INITIAL_PARAMS: 'INITIAL_PARAMS',
  INITIAL_EMAIL: 'INITIAL_EMAIL',
  INITIAL_PASSWORD: 'INITIAL_PASSWORD',
  EMAIL_NOT_FOUND: 'EMAIL_NOT_FOUND',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
}

@Component({
  selector: 'app-welcome-page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @HostBinding('class') class = 'w-full flex flex-wrap content-center items-center justify-center';
  @HostBinding('style.height') height = '75vh';
  @HostBinding('style.minHeight') minHeight = '75vh';

  isLoading: boolean;
  getState: Observable<AuthorizationState>;
  errorMessage: FailedResponse;
  errorMessageType: 'string' | 'class';
  user = new User();

  constructor(
    private store: Store<AuthorizationState>
  ) {
    this.getState = this.store.select(selectAuthorizationState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      if (state.errorMessage instanceof CodedErrorResponse) {
        this.errorMessageType = 'class';
      } else if (typeof state.errorMessage === 'string') {
        this.errorMessageType = 'string';
      }
      this.isLoading = state.isLoading;
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(form: LoginForm): void {
    this.isLoading = true;

    const payload = form.value;

    this.store.dispatch(new LogIn(payload));
  }

}
