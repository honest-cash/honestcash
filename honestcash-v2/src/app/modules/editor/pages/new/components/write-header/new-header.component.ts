import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import User from '../../../../../../core/models/user';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState, selectUserState} from '../../../../../../app.states';
import { Subscription} from 'rxjs';
import {EDITOR_SAVE_STATUS, State as EditorState} from '../../../../../../core/store/editor/editor.state';
import {State as UserState} from '../../../../../../core/store/user/user.state';
import Post from '../../../../../../core/models/post';

@Component({
   selector: 'app-editor-write-header',
   templateUrl: './new-header.component.html',
   styleUrls: ['./new-header.component.scss']
})
export class NewHeaderComponent implements OnInit, OnDestroy {
  @Input() public saveStatus: EDITOR_SAVE_STATUS = EDITOR_SAVE_STATUS.NotSaved;
  @Input() public saveDraftCallback: Function;
  @Output() onSaveClick = new EventEmitter<void>();
  @Output() onSavePublishClick = new EventEmitter<void>();
  private EDITOR_SAVE_STATUS = EDITOR_SAVE_STATUS;
  private userState$: Subscription;
  private editorState$: Subscription;
  private user: User;
  private story: Post;

  constructor(
    private store: Store<AppStates>,
  ) {}

  ngOnInit() {
    this.userState$ = this.store.select(selectUserState).subscribe((userState: UserState) => this.user = userState.user);
    this.editorState$ = this.store.select(selectEditorState).subscribe((editorState: EditorState) => this.story = editorState.story);
  }

  saveDraftStory() {
    this.onSaveClick.emit();
  }

  publishStory() {
    this.onSavePublishClick.emit();
  }

  ngOnDestroy() {
    this.userState$.unsubscribe();
    this.editorState$.unsubscribe();
  }
}
