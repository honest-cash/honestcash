import {Component, HostBinding, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-actions',
  templateUrl: './story-actions.component.html',
  styleUrls: ['./story-actions.component.scss']
})
export class StoryActionsComponent implements OnInit {
  @Input() public story: Story;
  @HostBinding('class') public class = 'd-flex w-100';
  constructor() { }

  ngOnInit() {
  }

}
