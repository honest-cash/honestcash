import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Upvote} from '../../models/upvote';
import {Unlock} from '../../models/unlock';

@Component({
  selector: 'main-story-payer-badge',
  templateUrl: './story-payer-badge.component.html',
  styleUrls: ['./story-payer-badge.component.scss']
})
export class MainStoryPayerBadgeComponent {
  @HostBinding('class') public class = 'col-1 mb-2 p-2';
  @Input() public transaction: Upvote | Unlock;
}
