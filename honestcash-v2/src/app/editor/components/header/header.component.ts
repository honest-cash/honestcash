import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import User from '../../../shared/models/user';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState} from '../../../app.states';
import {Subscription} from 'rxjs';
import {State as UserState} from '../../../user/store/user/user.state';

export enum EDITOR_EDITING_MODES {
  Write = 'WRITE',
  Edit = 'EDIT',
  Comment = 'Comment',
}

@Component({
  selector: 'editor-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class EditorHeaderComponent implements OnInit, OnDestroy {
  @Input() public editingMode: EDITOR_EDITING_MODES = EDITOR_EDITING_MODES.Write;
  @Input() public isAutosaveEnabled = false;
  public user: User;
  private EDITOR_EDITING_MODE = EDITOR_EDITING_MODES;
  private userSub: Subscription;

  constructor(
    private store: Store<AppStates>,
  ) {
  }

  public ngOnInit() {
    this.userSub = this.store.select(selectUserState).subscribe((userState: UserState) => {
      this.user = userState.user;
    });
  }

  public ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
