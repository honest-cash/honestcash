import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectAuthState } from '../../../../store/app.states';
import { LogIn } from '../../../../store/auth/auth.actions';
import { NgForm } from '@angular/forms';
import User from '../../../../models/user';

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
  @HostBinding('class') class = 'w-full';
  @HostBinding('style.height') height = '65vh';
  @HostBinding('style.minHeight') minHeight = '65vh';

  isLoading = false;
  isSubmitted = false;
  getState: Observable<any>;
  errorMessage: string | null;
  user = new User();

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  // @todo tests for the component
  onSubmit(form: LoginForm): void {
    this.isLoading = true;
    this.isSubmitted = true;

    const payload = form.value;

    this.store.dispatch(new LogIn(payload));
  }

}
