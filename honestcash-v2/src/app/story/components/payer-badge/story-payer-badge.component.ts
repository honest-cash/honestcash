import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Upvote} from '../../models/upvote';
import {Unlock} from '../../models/unlock';

@Component({
  selector: 'story-payer-badge',
  templateUrl: './story-payer-badge.component.html',
  styleUrls: ['./story-payer-badge.component.scss']
})
export class StoryPayerBadgeComponent {
  @HostBinding('class') public class = 'w-auto d-inline-block mb-2 mr-2';
  @Input() public transaction: Upvote | Unlock;
}
