import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Post from '../../../../core/models/post';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {State as EditorState} from '../../../../core/store/editor/editor.state';
import {EditorChange, EditorStoryPropertyChange} from '../../../../core/store/editor/editor.actions';
import {STORY_PROPERTIES} from '../../services/editor.service';
import Hashtag from '../../../../core/models/hashtag';
import {Block, convertBlocksArrayToHtml, convertBlockToHtml} from '../../converters/json-to-html';

export interface INgxChipsTag {
  hashtag: string;
}

export enum LINEBREAK_ACTION {
  MoveUp = 'MOVE_UP',
  MoveDown = 'MOVE_DOWN',
}

export enum PAID_SECTION_CURRENCIES {
  Bch = 'BCH',
  Usd = 'USD',
}

@Component({
  selector: 'app-editor-publish-modal',
  templateUrl: './publish-modal.component.html',
  styleUrls: ['./publish-modal.component.scss'],
})
export class PublishModalComponent implements OnInit, OnDestroy {
  @Output() publishClick = new EventEmitter<void>();
  @ViewChildren('paidSectionElements') paidSectionElements: QueryList<ElementRef>;
  public LINEBREAK_ACTION = LINEBREAK_ACTION;
  public PAID_SECTION_CURRENCIES = PAID_SECTION_CURRENCIES;
  private canCalculateUsdRate = false;
  private paidSectionCostInUsd: number;
  private paidSectionLineBreakTouched = false;
  private paidSectionLinebreakEnd: number;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;
  private story: Post;
  private isPublishing = false;
  private _hashtags: Hashtag[] | INgxChipsTag[] | string;
  constructor(
    private store: Store<AppStates>,
    public activeModal: NgbActiveModal,
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable
      .subscribe((editorState: EditorState) => {
        if (editorState.isLoaded) {
          this.story = editorState.story;
          if (!this._hashtags) {
            this._hashtags = this.story.userPostHashtags;
          }
        }
        this.paidSectionLinebreakEnd = ((<number>(<Block[]>this.story.body).length) - 1);
      });
    this.onHasPaidSectionChange();
  }

  onSubmit() {
    this.isPublishing = true;
    this.publishClick.emit();
  }

  onTitleChange(title: string) {
    this.store.dispatch(new EditorStoryPropertyChange({property: STORY_PROPERTIES.Title, value: title}));
  }

  onTagChange(tags: INgxChipsTag[]) {
    this.store.dispatch(new EditorStoryPropertyChange({property: STORY_PROPERTIES.Hashtags, value: tags}));
  }

  onHasPaidSectionChange() {
    if (this.story.hasPaidSection) {
      if (!this.story.paidSectionLinebreak) {
        this.story.paidSectionLinebreak = 0;
      }
      if (!this.paidSectionCostInUsd) {
        this.paidSectionCostInUsd = 0;
      }
      if (!this.story.paidSectionCost) {
        this.story.paidSectionCost = 0;
      }
    }
  }

  onSwitchLinebreak(action: LINEBREAK_ACTION) {
    this.paidSectionLineBreakTouched = true;
    let element: ElementRef;
    switch (action) {
      case LINEBREAK_ACTION.MoveUp: {
        if (this.story.paidSectionLinebreak > 0) {
          this.story.paidSectionLinebreak--;
          element = this.getPaidSectionBlockElementByLinebreak();
        }
        break;
      }
      case LINEBREAK_ACTION.MoveDown: {
        if (this.story.paidSectionLinebreak < this.paidSectionLinebreakEnd) {
          this.story.paidSectionLinebreak++;
          element = this.getPaidSectionBlockElementByLinebreak();
        }
        break;
      }
    }
    element.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  onChangePaidSectionCost(currency: PAID_SECTION_CURRENCIES) {

  }

  onDismiss() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    this.editorState$.unsubscribe();
  }

  convertBlockToHtml(block: Block) {
    return convertBlockToHtml(block);
  }

  private getPaidSectionBlockElementByLinebreak() {
    return this.paidSectionElements.find((el, index) => index === this.story.paidSectionLinebreak);
  }
}
