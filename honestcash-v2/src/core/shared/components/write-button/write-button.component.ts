import {StoryState} from '../../../../app/story/store/story.state';
import {AppStates, selectEditorState, selectStoryState, selectUserState} from '../../../../app/app.states';
import {UserState} from '../../../../app/user/store/user.state';
import {EDITOR_STATUS, EditorState} from '../../../../app/editor/store/editor.state';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {EDITOR_EDITING_MODES} from '../../../../app/editor/components/header/header.component';
import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {EditorPopupComponent} from '../../../../app/editor/components/popup-editor/popup.component';
import {StoryLoad} from '../../../../app/story/store/story.actions';
import Story from '../../../../app/story/models/story';
import User from '../../../../app/user/models/user';


@Component({
  selector: 'shared-write-button',
  templateUrl: './write-button.component.html',
  styleUrls: ['./write-button.component.scss'],
})
export class SharedWriteButtonComponent implements OnInit, OnDestroy {
  @Input() public author: User;
  @HostBinding('class') public class = 'd-flex';
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
      this.modalRef.componentInstance.editingMode = EDITOR_EDITING_MODES.Write;
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
