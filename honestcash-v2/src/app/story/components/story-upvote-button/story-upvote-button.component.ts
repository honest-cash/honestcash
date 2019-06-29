import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'main-story-upvote-button',
  templateUrl: './story-upvote-button.component.html',
  styleUrls: ['./story-upvote-button.component.scss']
})
export class MainStoryUpvoteButtonComponent implements OnInit {
  @Input() public story: Story;
  constructor() { }

  ngOnInit() {
  }

}
