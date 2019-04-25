import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import User from '@models/user';
import { AppState, selectAuthState } from '@store/app.states';
import { SignUp } from '@store/auth/auth.actions';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-welcome-page-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @HostBinding('class') class = 'w-full';
  @HostBinding('style.height') height = '65vh';
  @HostBinding('style.minHeight') minHeight = '65vh';

  isLoading = false;
  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

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

    this.store.dispatch(new SignUp(payload));
  }
}
