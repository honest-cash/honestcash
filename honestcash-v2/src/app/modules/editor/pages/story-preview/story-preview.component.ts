import {Component, ElementRef, HostBinding, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {convertBlockToHtml} from '../../converters/json-to-html';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState, selectUserState} from '../../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {State as EditorState} from '../../../../store/editor/editor.state';
import {State as UserState} from '../../../../store/user/user.state';
import Post from '../../../../shared/models/post';
import User from '../../../../shared/models/user';

@Component({
  selector: 'editor-story-preview',
  templateUrl: './story-preview.component.html',
  styleUrls: ['./story-preview.component.scss']
})
export class EditorStoryPreviewComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'mb-auto mt-auto';
  @ViewChildren('body') body: QueryList<ElementRef>;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;
  private userStateObservable: Observable<UserState>;
  private userState$: Subscription;
  private story: Post;
  private user: User;
  private convertBlockToHtml = convertBlockToHtml;

  constructor(
    private store: Store<AppStates>
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
    this.userStateObservable = this.store.select(selectUserState);
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable.subscribe((editorState: EditorState) => {
      this.story = editorState.story;
    });
    this.userState$ = this.userStateObservable.subscribe((userState: UserState) => {
      this.user = userState.user;
    });
  }

  ngOnDestroy() {
    if (this.editorState$) {
      this.editorState$.unsubscribe();
    }
  }
}
