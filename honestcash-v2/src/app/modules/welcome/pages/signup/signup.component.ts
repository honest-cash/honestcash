import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { AppStates } from '../../../../app.states';
import { SignUp } from '../../../../core/store/auth/auth.actions';
import User from '../../../../models/user';

interface SignupForm extends NgForm {
  value: {
    username: string;
    email: string;
    password: string;
    captcha: string;
  };
}

@Component({
  selector: 'app-welcome-page-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @HostBinding('class') class = 'w-full flex flex-wrap content-center items-center justify-center';
  @HostBinding('style.height') height = '75vh';
  @HostBinding('style.minHeight') minHeight = '75vh';

  isLoading = false;
  user: User = new User();

  constructor(
    private store: Store<AppStates>
  ) {}

  ngOnInit() {}

  onSubmit(form: SignupForm): void {
    this.isLoading = true;

    const payload = form.value;

    // this.store.dispatch(new SignUp(payload));
  }
}
