import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppStates, selectAuthorizationState } from '../../../../app.states';
import { LogOut } from '../../../../core/store/auth/auth.actions';

@Component({
  selector: 'app-welcome-pages-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  @HostBinding('class') class = 'w-full  flex flex-wrap content-center items-center justify-center';
  @HostBinding('style.height') height = '75vh';

  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  errorMessage = null;

  constructor(
    private store: Store<AppStates>
  ) {
    this.getState = this.store.select(selectAuthorizationState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }

}
