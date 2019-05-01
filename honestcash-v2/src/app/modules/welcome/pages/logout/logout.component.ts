import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStates } from '../../../../app.states';
import { LogOut } from '../../../../core/store/auth/auth.actions';

@Component({
  selector: 'app-welcome-page-logout',
  template: '<p></p>'
})
export class LogoutComponent implements OnInit {

  constructor(
    private store: Store<AppStates>
  ) {}

  ngOnInit() {
    this.store.dispatch(new LogOut());
  }

}
