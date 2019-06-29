import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-comments',
  templateUrl: './story-comments.component.html',
  styleUrls: ['./story-comments.component.scss']
})
export class StoryCommentsComponent implements OnInit {
  @Input() public story: Story;
  @Input() public comments: Story[];
  constructor() { }

  ngOnInit() {
  }

}
