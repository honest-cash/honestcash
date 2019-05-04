import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';

import User from '../../../../core/models/user';
import { AppStates } from '../../../../app.states';
import { ResetPasswordRequest } from '../../../../core/store/auth/auth.actions';
import { NgForm } from '@angular/forms';

interface ResetPasswordForm extends NgForm {
  value: {
    email: string;
  };
}

@Component({
  selector: 'app-welcome-page-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @HostBinding('class') class = 'w-full  flex flex-wrap content-center items-center justify-center';
  @HostBinding('style.height') height = '75vh';
  @HostBinding('style.minHeight') minHeight = '75vh';

  isLoading = false;
  user: User = new User();

  constructor(
    private store: Store<AppStates>
  ) {}

  ngOnInit() {}

  onSubmit(form: ResetPasswordForm): void {
    const payload = form.value;

    this.store.dispatch(new ResetPasswordRequest(payload));
  }

}
