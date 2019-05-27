import {Component, OnDestroy, OnInit} from '@angular/core';
import User from '../../../../core/models/user';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState} from '../../../../app.states';
import {Subscription} from 'rxjs';
import {State as UserState} from '../../../../core/store/user/user.state';

@Component({
  selector: 'editor-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class EditorHeaderComponent implements OnInit, OnDestroy {
  private userState$: Subscription;
  private user: User;

  constructor(
    private store: Store<AppStates>,
  ) {
  }

  ngOnInit() {
    this.userState$ = this.store.select(selectUserState).subscribe((userState: UserState) => this.user = userState.user);
  }

  ngOnDestroy() {
    this.userState$.unsubscribe();
  }
}
