import {Component, HostBinding, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-comment-card-body',
  templateUrl: './story-comment-card-body.component.html',
  styleUrls: ['./story-comment-card-body.component.scss']
})
export class StoryCommentCardBodyComponent implements OnInit {
  @Input() public comment: Story;
  @HostBinding('class') public class = 'row px-3';
  constructor() { }

  ngOnInit() {
  }

}
