import {Component, HostBinding, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-paywall-call-to-action',
  templateUrl: './paywall-call-to-action.component.html',
  styleUrls: ['./paywall-call-to-action.component.scss']
})
export class StoryPaywallCallToActionComponent {
  @HostBinding('class') public class = 'd-flex align-items-center';
  @Input() public story: Story;
}
