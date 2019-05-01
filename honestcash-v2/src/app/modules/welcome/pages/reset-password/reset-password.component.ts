import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import User from '../../../../models/user';
import { AppState, selectAuthorizationState } from '../../../../app.states';
import { ForgotPassword } from '../../../../core/store/auth/auth.actions';


@Component({
  selector: 'app-welcome-page-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @HostBinding('class') class = 'w-full items-center justify-center';
  @HostBinding('style.height') height = '65vh';
  @HostBinding('style.minHeight') minHeight = '65vh';

  isLoading = false;
  user: User = new User();
  username = '';
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthorizationState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new ForgotPassword(payload));
  }

}
