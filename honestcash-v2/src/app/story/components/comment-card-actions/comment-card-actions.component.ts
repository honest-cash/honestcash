import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-comment-card-actions',
  templateUrl: './comment-card-actions.component.html',
  styleUrls: ['./comment-card-actions.component.scss']
})
export class StoryCommentCardActionsComponent implements OnInit {
  @Input() public comment: Story;
  @HostBinding('class') public class = 'row p-3';
  @Output() public hasReplyClicked = new EventEmitter();
  constructor() { }

  public ngOnInit() {
  }

  public replyClicked(commentId: number) {
    this.hasReplyClicked.next(commentId);
  }

}
