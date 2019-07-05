import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState, selectStoryState, selectUserState} from '../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {EditorPopupComponent} from '../../../editor/components/popup-editor/popup.component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import User from '../../../user/models/user';
import {UserState} from '../../../user/store/user.state';
import {EDITOR_STATUS, EditorState} from '../../../editor/store/editor.state';
import {EditorStoryLoad} from '../../../editor/store/editor.actions';
import Story from '../../models/story';
import {StoryState} from '../../store/story.state';
import {EDITOR_EDITING_MODES} from '../../../editor/components/header/header.component';
import {StoryLoad} from '../../store/story.actions';

@Component({
  selector: 'story-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss'],
})
export class StoryEditButtonComponent implements OnInit, OnDestroy {
  @Input() public author: User;
  public user: User;
  public user$: Observable<UserState>;
  public userSub: Subscription;
  public editor$: Observable<EditorState>;
  public editorSub: Subscription;
  public story: Story;
  public story$: Observable<StoryState>;
  public storySub: Subscription;
  public modalRef: NgbModalRef;
  constructor(
    private store: Store<AppStates>,
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.user$ = this.store.select(selectUserState);
    this.story$ = this.store.select(selectStoryState);
    this.editor$ = this.store.select(selectEditorState);
  }

  public ngOnInit() {
    this.userSub = this.user$.subscribe((userState: UserState) => {
      this.user = userState.user;
    });

    this.storySub = this.story$.subscribe((storyState: StoryState) => {
      this.story = storyState.story;
    });

    this.editorSub = this.editor$.subscribe((editorState: EditorState) => {
      if (editorState.status === EDITOR_STATUS.Published) {
        this.modalRef = undefined;
      }
    });
  }

  public onButtonClicked() {
    if (this.user) {
      this.modalRef = undefined;
      this.modalRef = this.modalService.open(EditorPopupComponent, {size: 'lg'});
      this.modalRef.componentInstance.editingMode = EDITOR_EDITING_MODES.Edit;
      this.modalRef.componentInstance.story = this.story;
      this.modalRef.result.then((story: Story) => {
        if (story) {
          this.store.dispatch(new StoryLoad(story.id));
        }
      });
    } else {
      this.router.navigate(['/login']);
    }

  }

  public ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
