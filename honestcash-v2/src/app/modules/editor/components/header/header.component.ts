import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import User from '../../../../shared/models/user';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState} from '../../../../app.states';
import {Subscription} from 'rxjs';
import {State as UserState} from '../../../../store/user/user.state';

export enum EDITOR_EDITING_MODES {
  Write = 'WRITE',
  Edit = 'EDIT'
}

@Component({
  selector: 'editor-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class EditorHeaderComponent implements OnInit, OnDestroy {
  @Input() public editingMode: EDITOR_EDITING_MODES = EDITOR_EDITING_MODES.Write;
  public user: User;
  private EDITOR_EDITING_MODE = EDITOR_EDITING_MODES;
  private userState$: Subscription;

  constructor(
    private store: Store<AppStates>,
  ) {
  }

  ngOnInit() {
    this.userState$ = this.store.select(selectUserState).subscribe((userState: UserState) => this.user = userState.user);
  }

  ngOnDestroy() {
    if (this.userState$) {
      this.userState$.unsubscribe();
    }
  }
}
