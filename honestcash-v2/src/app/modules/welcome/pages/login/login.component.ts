import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import User from '@models/user';
import { AppState, selectAuthState } from '@store/app.states';
import { LogIn } from '@store/auth/auth.actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-welcome-page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @HostBinding('class') class = 'w-full items-center justify-center';
  @HostBinding('style.height') height = '65vh';

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

  onSubmit(form: NgForm): void {
    const payload = form.value;

    this.store.dispatch(new LogIn(payload));
  }

}
