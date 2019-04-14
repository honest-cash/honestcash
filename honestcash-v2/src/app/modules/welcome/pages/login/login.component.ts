import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectAuthState } from '@store/app.states';
import { LogIn } from '@store/auth/auth.actions';
import { NgForm } from '@angular/forms';
import User from '@models/user';

@Component({
  selector: 'app-welcome-page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
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

  // @todo implement loading on buttons
  // @todo extend the types for the form.value
  // @todo tests for the component
  onSubmit(form: NgForm): void {
    const payload = form.value;

    this.store.dispatch(new LogIn(payload));
  }

}
