import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {NgForm} from '@angular/forms';
import {AppStates, selectAuthState} from '../../../app.states';
import User from '../../../user/models/user';
import {Observable} from 'rxjs';
import {FailedResponse} from '../../models/authentication';
import {AuthState} from '../../store/auth.state';
import {AuthErrorHelper} from '../../helpers/auth-error.helper';
import {LogIn} from '../../store/auth.actions';

export interface LoginForm extends NgForm {
  value: {
    email: string;
    password: string;
  };
}

@Component({
  selector: 'auth-page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  @HostBinding('class') public class = 'card mb-auto mt-auto';

  public isLoading = false;
  public authState: Observable<AuthState>;
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

      this.errorMessage = AuthErrorHelper.getErrorDesc(state.errorMessage);

      this.isLoading = state.isLoading;
    });
  }

  public onSubmit(form: LoginForm): void {
    const payload = form.value;

    this.isLoading = true;
    this.store.dispatch(new LogIn(payload));
  }
}
