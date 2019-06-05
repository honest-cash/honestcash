import {Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Block, convertBlockToHtml} from '../../converters/json-to-html';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState} from '../../../../app.states';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {State as UserState} from '../../../../store/user/user.state';
import Post from '../../../../shared/models/post';
import User from '../../../../shared/models/user';
import {EDITOR_EDITING_MODES} from '../../components/header/header.component';
import {WindowToken} from '../../../../core/helpers/window';
import {EditorService} from '../../services/editor.service';

@Component({
  selector: 'editor-story-preview',
  templateUrl: './story-preview.component.html',
  styleUrls: ['./story-preview.component.scss']
})
export class EditorStoryPreviewComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'mb-auto mt-auto';
  @ViewChildren('bodyJSON') bodyJSON: QueryList<ElementRef>;
  @ViewChildren('bodyJSONFree') bodyJSONFree: QueryList<ElementRef>;
  @ViewChildren('bodyJSONPaid') bodyJSONPaid: QueryList<ElementRef>;
  public EDITOR_EDITING_MODES = EDITOR_EDITING_MODES;
  public story: Post = new Post();
  public user: User;
  public freeBodyJSON: Block[];
  public paidBodyJSON: Block[];
  private user$: Observable<UserState>;
  private userSub: Subscription;

  constructor(
    @Inject(WindowToken) private window,
    private store: Store<AppStates>,
    private editorService: EditorService,
  ) {
    this.user$ = this.store.select(selectUserState);
  }

  ngOnInit() {
    this.userSub = this.user$.subscribe((userState: UserState) => {
      this.user = userState.user;
    });
    this.setStoryProperties();
    fromEvent<StorageEvent>(this.window, 'storage').subscribe(() => {
      this.setStoryProperties();
    });
  }

  private convertBlockToHtml(block: Block) {
    return convertBlockToHtml(block);
  }

  private setStoryProperties() {
    this.story = this.editorService.getLocallySavedPost();
    this.story.user = this.user;
    if (this.story.hasPaidSection) {
      this.freeBodyJSON = this.story.bodyJSON.filter((block: Block, index: number) => index <= this.story.paidSectionLinebreak);
      this.paidBodyJSON = this.story.bodyJSON;
    }
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
