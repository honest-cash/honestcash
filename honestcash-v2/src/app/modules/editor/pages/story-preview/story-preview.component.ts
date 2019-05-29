import {Component, ElementRef, HostBinding, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Block, convertBlockToHtml} from '../../converters/json-to-html';
import {Store} from '@ngrx/store';
import {AppStates, selectUserState} from '../../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {State as UserState} from '../../../../store/user/user.state';
import Post from '../../../../shared/models/post';
import User from '../../../../shared/models/user';
import {EditorService} from '../../services/editor.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EDITOR_EDITING_MODES} from '../../components/header/header.component';

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
  public story: Post;
  public user: User;
  public isLoading = true;
  public freeBodyJSON: Block[];
  public paidBodyJSON: Block[];
  private userStateObservable: Observable<UserState>;
  private userState$: Subscription;

  constructor(
    private store: Store<AppStates>,
    private modalService: NgbModal,
    private editorService: EditorService,
  ) {
    this.userStateObservable = this.store.select(selectUserState);
  }

  ngOnInit() {
    this.userState$ = this.userStateObservable.subscribe((userState: UserState) => {
      this.user = userState.user;
      this.story = this.editorService.getLocallySavedPost();
      if (this.story.hasPaidSection) {
        this.freeBodyJSON = this.story.bodyJSON.filter((block: Block, index: number) => index <= this.story.paidSectionLinebreak);
        this.paidBodyJSON = this.story.bodyJSON;
      }
      this.isLoading = false;
    });
  }

  private convertBlockToHtml(block: Block) {
    return convertBlockToHtml(block);
  }

  ngOnDestroy() {
    this.userState$.unsubscribe();
    this.editorService.removeLocallySavedPost();
  }
}
