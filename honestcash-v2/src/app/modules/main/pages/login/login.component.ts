import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {NgForm} from '@angular/forms';
import {AppStates, selectAuthState} from '../../../../app.states';
import {State as AuthorizationState} from '../../../../store/auth/auth.state';
import User from '../../../../shared/models/user';
import {Observable} from 'rxjs';
import {LogIn} from '../../../../store/auth/auth.actions';
import {FailedResponse} from '../../../../shared/models/authentication';
import {WelcomeErrorHandler} from '../../shared/helpers/welcome-error.handler';

export interface LoginForm extends NgForm {
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

  public isLoading = false;
  public authState: Observable<AuthorizationState>;
  public errorMessage: FailedResponse;
  public user = new User();

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
  }

  public onSubmit(form: LoginForm): void {
    const payload = form.value;

    this.isLoading = true;
    this.store.dispatch(new LogIn(payload));
  }
}
