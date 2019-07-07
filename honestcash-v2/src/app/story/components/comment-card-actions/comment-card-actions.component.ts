import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-comment-card-actions',
  templateUrl: './comment-card-actions.component.html',
  styleUrls: ['./comment-card-actions.component.scss']
})
export class StoryCommentCardActionsComponent implements OnInit {
  @Input() public comment: Story;
  @Input() public nestingLevel: number;
  @HostBinding('class') public class = 'row p-3';
  constructor() { }

  public ngOnInit() {
  }

}
