import {Component, Input, OnInit} from '@angular/core';
import {Upvote} from '../../models/upvote';
import Story from '../../models/story';

@Component({
  selector: 'main-story-upvotes',
  templateUrl: './story-upvotes.component.html',
  styleUrls: ['./story-upvotes.component.scss']
})
export class MainStoryUpvotesComponent implements OnInit {
  @Input() public story: Story;
  @Input() public upvotes: Upvote[];
  constructor() { }

  ngOnInit() {
  }

}
