import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../app.states';
import {LogOut} from '../../store/auth.actions';

@Component({
  selector: 'auth-page-logout',
  template: '<p></p>'
})
export class AuthLogoutComponent implements OnInit {

  constructor(
    private store: Store<AppStates>
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new LogOut());
  }

}
