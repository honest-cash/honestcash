import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStates } from '../../../../app.states';
import {ResetPassword} from '../../../../core/store/auth/auth.actions';
import { NgForm } from '@angular/forms';

interface ResetPasswordVerifyForm extends NgForm {
  value: {
    email: string;
    code: string;
    newPassword: string;
    repeatNewPassword: string;
    mnemonicEncrypted: string;
  };
}

@Component({
  selector: 'app-welcome-page-reset-password',
  templateUrl: './reset-password-verify.component.html',
  styleUrls: ['./reset-password-verify.component.scss']
})
export class ResetPasswordVerifyComponent implements OnInit {
  @HostBinding('class') class = 'w-full  flex flex-wrap content-center items-center justify-center';
  @HostBinding('style.height') height = '75vh';
  @HostBinding('style.minHeight') minHeight = '75vh';

  isLoading = false;
  values: any = {
    email: '',
    code: '',
    newPassword: '',
    repeatNewPassword: '',
    mnemonicEncrypted: '',
  };

  constructor(
    private store: Store<AppStates>
  ) {}

  ngOnInit() {}

  onSubmit(form: ResetPasswordVerifyForm): void {
    const payload = form.value;

    this.store.dispatch(new ResetPassword(payload));
  }

}
