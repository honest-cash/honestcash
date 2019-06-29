import {Component, Input, OnInit} from '@angular/core';
import {Upvote} from '../../models/upvote';
import Story from '../../models/story';

@Component({
  selector: 'story-upvotes',
  templateUrl: './story-upvotes.component.html',
  styleUrls: ['./story-upvotes.component.scss']
})
export class StoryUpvotesComponent implements OnInit {
  @Input() public story: Story;
  @Input() public upvotes: Upvote[];

  public isCollapsed = false;

  ngOnInit() {
    this.isCollapsed = this.upvotes.length > 20 ? true : false;
  }
}
