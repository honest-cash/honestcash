import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Upvote} from '../../models/upvote';
import {Unlock} from '../../models/unlock';

@Component({
  selector: 'main-story-payer-badge',
  templateUrl: './story-payer-badge.component.html',
  styleUrls: ['./story-payer-badge.component.scss']
})
export class MainStoryPayerBadgeComponent implements OnInit {
  @HostBinding('class') public class = 'col';
  @Input() public transaction: Upvote | Unlock;
  constructor() { }

  ngOnInit() {
  }

}
