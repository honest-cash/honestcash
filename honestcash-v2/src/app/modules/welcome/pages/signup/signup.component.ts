import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { AppState } from '../../../../store/app.states';
import { SignUp } from '../../../../store/auth/auth.actions';
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
  @HostBinding('class') class = 'w-full';
  @HostBinding('style.height') height = '65vh';
  @HostBinding('style.minHeight') minHeight = '65vh';

  isLoading = false;
  user: User = new User();

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  onSubmit(form: SignupForm): void {
    this.isLoading = true;

    const payload = form.value;

    // this.store.dispatch(new SignUp(payload));
  }
}
