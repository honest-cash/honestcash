import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import {AppStates, selectAuthorizationState} from '../../../../app.states';
import { State as AuthorizationState } from '../../../../core/store/auth/auth.state';
import User from '../../../../core/models/user';
import {Observable} from 'rxjs';
import {LogIn} from '../../../../core/store/auth/auth.actions';
import {CodedErrorResponse, FailedResponse} from '../../../../core/models/authentication';
import { WelcomeErrorHandler } from '../../helpers/welcome-error.handler';

interface LoginForm extends NgForm {
  value: {
    email: string;
    password: string;
  };
}

@Component({
  selector: 'app-welcome-page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @HostBinding('class') class = 'card mb-auto mt-auto';

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

      this.errorMessage = WelcomeErrorHandler.getErrorDesc(state.errorMessage);

      this.isLoading = state.isLoading;
    });
  }

  public onSubmit(form: LoginForm): void {
    const payload = form.value;

    this.isLoading = true;
    this.store.dispatch(new LogIn(payload));
  }
}
