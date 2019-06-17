import {Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import Post from '../../../../shared/models/post';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {EDITOR_STATUS, State as EditorState} from '../../../../store/editor/editor.state';
import {Block, convertBlockToHtml} from '../../converters/json-to-html';
import {NgForm} from '@angular/forms';
import {EditorStoryPropertyChange} from '../../../../store/editor/editor.actions';
import {STORY_PROPERTIES} from '../../services/editor.service';

export const PAID_SECTION_PRICE_SLIDER_SETTINGS = {
  MIN: 0.5,
  MAX: 5,
  STEP: 0.5,
};

export enum LINEBREAK_ACTION {
  MoveUp = 'MOVE_UP',
  MoveDown = 'MOVE_DOWN',
}

@Component({
  selector: 'editor-paid-section-selection',
  templateUrl: './paid-section-selection.component.html',
  styleUrls: ['./paid-section-selection.component.scss'],
})
export class EditorPaidSectionSelectionComponent implements OnInit, OnDestroy {
  @Input() form: NgForm;
  @ViewChildren('paidSectionElements') paidSectionElements: QueryList<ElementRef>;
  public LINEBREAK_ACTION = LINEBREAK_ACTION;
  public saveStatus: EDITOR_STATUS;
  public EDITOR_SAVE_STATUS = EDITOR_STATUS;
  public paidSectionLineBreakTouched = false;
  public paidSectionLinebreakEnd: number;
  public story: Post;
  public PAID_SECTION_PRICE_SLIDER_SETTINGS = PAID_SECTION_PRICE_SLIDER_SETTINGS;
  private editorStateObservable: Observable<EditorState>;
  private editorState$: Subscription;

  constructor(
    private store: Store<AppStates>,
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable
    .subscribe((editorState: EditorState) => {
      this.saveStatus = editorState.status;
      this.story = editorState.story;

      if (!this.story.paidSectionLinebreak) {
          this.story.paidSectionLinebreak = 0;
        }
        if (!this.story.paidSectionCost) {
          this.story.paidSectionCost = PAID_SECTION_PRICE_SLIDER_SETTINGS.MIN;
        }
      this.paidSectionLinebreakEnd = this.story && this.story.bodyJSON && this.story.bodyJSON.filter(convertBlockToHtml).length - 1 || 1;
    });
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
    this.store.dispatch(
      new EditorStoryPropertyChange(
        {property: STORY_PROPERTIES.PaidSectionLinebreak, value: this.story.paidSectionLinebreak}
      )
    );
  }

  onChangePaidSectionCost() {
    this.store.dispatch(
      new EditorStoryPropertyChange(
        {property: STORY_PROPERTIES.PaidSectionCost, value: this.story.paidSectionCost}
      )
    );
  }

  ngOnDestroy() {
    if (this.editorState$) {
      this.editorState$.unsubscribe();
    }
  }

  private convertBlockToHtml(block: Block) {
    return convertBlockToHtml(block);
  }

  private getPaidSectionBlockElementByLinebreak() {
    return this.paidSectionElements.find((el, index) => index === this.story.paidSectionLinebreak);
  }
}
