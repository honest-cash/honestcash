import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.scss']
})
export class StoryDetailsComponent implements OnInit {
  @Input() public story: Story;
  constructor() { }

  ngOnInit() {
  }

}
