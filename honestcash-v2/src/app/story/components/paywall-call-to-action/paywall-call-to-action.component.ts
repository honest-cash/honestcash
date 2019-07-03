import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates, selectStoryState} from '../../../app.states';
import Story from '../../models/story';
import {Observable, Subscription} from 'rxjs';
import {StoryState} from '../../store/story.state';
import {TRANSACTION_TYPES} from '../../../wallet/models/transaction';

@Component({
  selector: 'story-paywall-call-to-action',
  templateUrl: './paywall-call-to-action.component.html',
  styleUrls: ['./paywall-call-to-action.component.scss']
})
export class StoryPaywallCallToActionComponent implements OnInit, OnDestroy {
  @HostBinding('class') public class = 'd-flex align-items-center';
  public story: Story;
  public story$: Observable<StoryState>;
  public storySub: Subscription;
  public savingProperty: TRANSACTION_TYPES;
  public isPropertySaving: boolean;
  public TRANSACTION_TYPES = TRANSACTION_TYPES;
  public shouldShowUnlockingSpinner = false;
  constructor(
    private store: Store<AppStates>,
  ) {
    this.story$ = this.store.select(selectStoryState);
  }

  public ngOnInit() {
    this.storySub = this.story$.subscribe((storyState: StoryState) => {
      this.story = storyState.story;
      this.isPropertySaving = storyState.isPropertySaving;
      this.savingProperty = storyState.savingProperty;

      if (this.isPropertySaving && this.savingProperty === TRANSACTION_TYPES.Unlock) {
        this.shouldShowUnlockingSpinner = true;
      }
    });
  }

  public ngOnDestroy() {
    if (this.storySub) {
      this.storySub.unsubscribe();
    }
  }
}
