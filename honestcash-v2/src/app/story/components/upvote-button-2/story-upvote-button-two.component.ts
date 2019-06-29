import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-upvote-button-two',
  templateUrl: './story-upvote-button-two.component.html',
  styleUrls: ['./story-upvote-button-two.component.scss']
})
export class StoryUpvoteButtonTwoComponent implements OnInit {
  @Input() public story: Story;
  constructor() { }

  ngOnInit() {
  }

}
