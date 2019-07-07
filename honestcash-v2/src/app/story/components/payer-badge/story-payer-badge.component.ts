import {Component, HostBinding, Inject, Input, OnInit} from '@angular/core';
import {Upvote} from '../../models/upvote';
import {Unlock} from '../../models/unlock';
import {WindowToken} from '../../../../core/shared/helpers/window.helper';

@Component({
  selector: 'story-payer-badge',
  templateUrl: './story-payer-badge.component.html',
  styleUrls: ['./story-payer-badge.component.scss']
})
export class StoryPayerBadgeComponent {
  @HostBinding('class') public class = 'col-1 mb-2 p-2';
  @Input() public transaction: Upvote | Unlock;

  constructor(
    @Inject(WindowToken) private window,
  ) {
  }

  public goToUserProfile() {
    if (this.transaction && this.transaction.user && this.transaction.user.username) {
      this.window.location.href = `/profile/${this.transaction.user.username}`;
    }
  }
}
