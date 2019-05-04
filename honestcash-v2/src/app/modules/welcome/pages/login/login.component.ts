import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import {AppStates, selectAuthorizationState} from '../../../../app.states';
import { State as AuthorizationState } from '../../../../core/store/auth/auth.state';
import User from '../../../../core/models/user';
import {Observable} from 'rxjs';
import {LogIn} from '../../../../core/store/auth/auth.actions';
import {CodedErrorResponse, FailedResponse} from '../../../../core/models/authentication';

interface LoginForm extends NgForm {
  value: {
    email: string;
    password: string;
  };
}

export const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'Incorrect email address and / or password.',
  EMAIL_EXISTS:  'E-Mail already exists',
  USER_BLOCKED: 'USER_BLOCKED',
  NOT_ACTIVATED: 'NOT_ACTIVATED',
  USER_NOT_VERIFIED: 'USER_NOT_VERIFIED',
  INITIAL_PARAMS: 'INITIAL_PARAMS',
  INITIAL_EMAIL: 'INITIAL_EMAIL',
  INITIAL_PASSWORD: 'INITIAL_PASSWORD',
  EMAIL_NOT_FOUND: 'Incorrect email address and / or password.',
  WRONG_PASSWORD: 'Incorrect email address and / or password.',
};

@Component({
  selector: 'app-welcome-page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @HostBinding('class') class = 'w-full flex flex-wrap content-center items-center justify-center';
  @HostBinding('style.height') height = '75vh';
  @HostBinding('style.minHeight') minHeight = '75vh';

  public isLoading: boolean;
  public authState: Observable<AuthorizationState>;
  public errorMessage: FailedResponse;
  public errorMessageType: 'string' | 'class';
  public user = new User();

  constructor(
    private store: Store<AppStates>
  ) {
    this.authState = this.store.select(selectAuthorizationState);
  }

  public ngOnInit() {
    this.authState.subscribe((state) => {
      if (!state.errorMessage) {
        delete this.errorMessage;

        return;
      }

      this.errorMessage = this.getErrorDesc(state.errorMessage);

      this.isLoading = state.isLoading;
    });
  }

  public onSubmit(form: LoginForm): void {
    const payload = form.value;

    this.isLoading = true;
    this.store.dispatch(new LogIn(payload));
  }

  // @todo type deriviation
  private getErrorDesc(errorMessage: any): string {
    if (typeof errorMessage === 'string') {
      return errorMessage;
    } else if (errorMessage instanceof CodedErrorResponse) {
      return ERROR_MESSAGES[errorMessage.code];
    } else if (errorMessage.error) {
      return ERROR_MESSAGES[errorMessage.error.code];
    }

    return 'Unknown error';
  }
}
