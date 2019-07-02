import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import Story from '../../models/story';
import {ITransaction, TRANSACTION_TYPES} from '../../../../core/shared/models/transaction';
import {Store} from '@ngrx/store';
import {AppStates, selectStoryState} from '../../../app.states';
import {Observable, Subscription} from 'rxjs';
import {StoryState} from '../../store/story.state';
import {StoryPropertySave} from '../../store/story.actions';

@Component({
  selector: 'story-upvote-button',
  templateUrl: './story-upvote-button.component.html',
  styleUrls: ['./story-upvote-button.component.scss']
})
export class StoryUpvoteButtonComponent implements OnInit {
  @Input() public isSmallButton: boolean;
  @Input() public story: Story;
  public TRANSACTION_TYPES = TRANSACTION_TYPES;
  constructor(
    private store: Store<AppStates>,
  ) {
  }

  public ngOnInit() {
  }

  public onTransactionComplete(transaction: ITransaction) {
    this.store.dispatch(
      new StoryPropertySave({property: TRANSACTION_TYPES.Upvote, transaction, data: this.story})
    );
  }

}
