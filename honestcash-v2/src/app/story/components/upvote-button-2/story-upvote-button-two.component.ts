import {Component, OnDestroy, OnInit} from '@angular/core';
import Story from '../../models/story';
import {ITransaction, TRANSACTION_TYPES} from '../../../../core/shared/models/transaction';
import {Observable, Subscription} from 'rxjs';
import {AppStates, selectStoryState} from '../../../app.states';
import {Store} from '@ngrx/store';
import User from '../../../user/models/user';
import {StoryState} from '../../store/story.state';
import {StoryPropertySave} from '../../store/story.actions';

@Component({
  selector: 'story-upvote-button-two',
  templateUrl: './story-upvote-button-two.component.html',
  styleUrls: ['./story-upvote-button-two.component.scss']
})
export class StoryUpvoteButtonTwoComponent implements OnInit, OnDestroy {
  public TRANSACTION_TYPES = TRANSACTION_TYPES;
  public user: User;
  public story: Story;
  public story$: Observable<StoryState>;
  public storySub: Subscription;

  constructor(
    private store: Store<AppStates>,
  ) {
    this.story$ = this.store.select(selectStoryState);
  }

  public ngOnInit() {
    this.storySub = this.story$.subscribe((storyState: StoryState) => {
      this.story = storyState.story;
    });
  }

  public onTransactionComplete(transaction: ITransaction) {
    this.store.dispatch(
      new StoryPropertySave({property: TRANSACTION_TYPES.Upvote, transaction, data: this.story})
    );
  }

  public ngOnDestroy() {
    if (this.storySub) {
      this.storySub.unsubscribe();
    }
  }

}
