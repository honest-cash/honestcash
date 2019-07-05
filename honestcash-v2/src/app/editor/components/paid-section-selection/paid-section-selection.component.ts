import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import Story from '../../../story/models/story';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {Block, convertBlockToHtml} from '../../shared/json-to-html';
import {EditorStoryPropertyChange} from '../../store/editor.actions';
import {EDITOR_STORY_PROPERTIES} from '../../shared/editor.story-properties';
import {EDITOR_STATUS, EditorState} from '../../store/editor.state';

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
  @ViewChildren('paidSectionElements') public paidSectionElements: QueryList<ElementRef>;
  @ViewChild('paidSectionElementsWrapperElement') public paidSectionElementsWrapperElement: ElementRef;
  public LINEBREAK_ACTION = LINEBREAK_ACTION;
  public shouldHideElements = true;
  public paidSectionLinebreakEnd: number;
  public story: Story;
  public PAID_SECTION_PRICE_SLIDER_SETTINGS = PAID_SECTION_PRICE_SLIDER_SETTINGS;
  public editor$: Observable<EditorState>;
  public editorSub: Subscription;

  constructor(
    private store: Store<AppStates>,
  ) {
    this.editor$ = this.store.select(selectEditorState);
  }

  public ngOnInit() {
    this.editorSub = this.editor$
    .subscribe((editorState: EditorState) => {
      this.story = editorState.story;
      this.setShouldHideElements(editorState.status);
      this.setPaidSectionDefaults();
    });
  }

  public setShouldHideElements(status: EDITOR_STATUS) {
    if (this.story && this.story.hasPaidSection && status !== EDITOR_STATUS.NotInitialized) {
      this.shouldHideElements = false;
    }
  }

  public setPaidSectionDefaults() {
    if (this.story && Object.keys(this.story).length > 0) {
      if (!this.story.paidSectionLinebreak) {
        this.story.paidSectionLinebreak = 1;
      }
      if (!this.story.paidSectionCost) {
        this.story.paidSectionCost = PAID_SECTION_PRICE_SLIDER_SETTINGS.MIN;
      }
    }
    this.paidSectionLinebreakEnd = this.story && this.story.bodyJSON ? this.story.bodyJSON.length - 1 : 1;
  }

  public onSwitchLinebreak(action: LINEBREAK_ACTION) {
    let element: ElementRef;
    switch (action) {
      case LINEBREAK_ACTION.MoveUp: {
        // if paidSectionLinebreak is 0,
        if (this.story.paidSectionLinebreak > 0) {
          this.story.paidSectionLinebreak--;
          element = this.getBlockByLinebreak();
        }
        break;
      }
      case LINEBREAK_ACTION.MoveDown: {
        if (this.story.paidSectionLinebreak < this.paidSectionLinebreakEnd) {
          this.story.paidSectionLinebreak++;
          element = this.getBlockByLinebreak();
        }
        break;
      }
    }

    if (action === LINEBREAK_ACTION.MoveUp || action === LINEBREAK_ACTION.MoveDown) {
      if (this.story.paidSectionLinebreak === 0) {
        this.story.paidSectionLinebreak = 1;
        element = this.getBlockByLinebreak();
      }
      if (element) {
        this.scrollLinebreakIntoView(element);
      }
      this.store.dispatch(
        new EditorStoryPropertyChange(
          {property: EDITOR_STORY_PROPERTIES.PaidSectionLinebreak, value: this.story.paidSectionLinebreak}
        )
      );
    }
  }

  public onChangePaidSectionCost() {
    this.store.dispatch(
      new EditorStoryPropertyChange(
        {property: EDITOR_STORY_PROPERTIES.PaidSectionCost, value: this.story.paidSectionCost}
      )
    );
  }

  public scrollLinebreakIntoView(element: ElementRef) {
    element.nativeElement.scrollIntoView();
    if (this.paidSectionElementsWrapperElement && this.story.paidSectionLinebreak !== this.paidSectionLinebreakEnd) {
      this.paidSectionElementsWrapperElement.nativeElement.scrollTop -= 20;
    }
  }

  public convertBlockToHtml(block: Block) {
    return convertBlockToHtml(block);
  }

  public getBlockByLinebreak() {
    return this.paidSectionElements.find((el, index) => index === this.story.paidSectionLinebreak);
  }

  public ngOnDestroy() {
    if (this.editorSub) {
      this.editorSub.unsubscribe();
    }
  }
}
