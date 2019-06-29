import {Component, HostBinding, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-comment-card-header',
  templateUrl: './story-comment-card-header.component.html',
  styleUrls: ['./story-comment-card-header.component.scss']
})
export class StoryCommentCardHeaderComponent implements OnInit {
  @Input() public comment: Story;
  @HostBinding('class') public class = 'row p-3';
  constructor() { }

  ngOnInit() {
  }

}
