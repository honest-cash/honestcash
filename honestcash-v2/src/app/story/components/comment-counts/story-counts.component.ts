import {Component, Input} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-counts',
  templateUrl: './story-counts.component.html',
  styleUrls: ['./story-counts.component.scss']
})
export class StoryCountsComponent {
  @Input() public story: Story;
  constructor(
  ) {
  }

}
