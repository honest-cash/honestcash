import {Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import Post from '../../../../core/models/post';
import {Store} from '@ngrx/store';
import {AppStates, selectEditorState} from '../../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {State as EditorState} from '../../../../core/store/editor/editor.state';
import {Block, convertBlockToHtml} from '../../converters/json-to-html';
import {Form} from '@angular/forms';

export enum LINEBREAK_ACTION {
  MoveUp = 'MOVE_UP',
  MoveDown = 'MOVE_DOWN',
}

export enum PAID_SECTION_CURRENCIES {
  Bch = 'BCH',
  Usd = 'USD',
}

@Component({
  selector: 'app-editor-publish-modal-paid-section-selection',
  templateUrl: './paid-section-selection.component.html',
  styleUrls: ['./paid-section-selection.component.scss'],
})
export class PaidSectionSelectionComponent implements OnInit, OnDestroy {
  @Input() form: Form;
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

  constructor(
    private store: Store<AppStates>,
  ) {
    this.editorStateObservable = this.store.select(selectEditorState);
  }

  ngOnInit() {
    this.editorState$ = this.editorStateObservable
    .subscribe((editorState: EditorState) => {
      if (editorState.isLoaded) {
        this.story = editorState.story;
        if (!this.story.paidSectionLinebreak) {
          this.story.paidSectionLinebreak = 0;
        }
        if (!this.paidSectionCostInUsd) {
          this.paidSectionCostInUsd = 0;
        }
        if (!this.story.paidSectionCost) {
          this.story.paidSectionCost = 0;
        }
        this.paidSectionLinebreakEnd = ((<number>(<Block[]>this.story.body).length) - 1);
      }
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
        console.log('a', this.story.paidSectionLinebreak, this.paidSectionLinebreakEnd);
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
