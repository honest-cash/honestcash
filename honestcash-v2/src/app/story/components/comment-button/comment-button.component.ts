import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-comment-button',
  templateUrl: './comment-button.component.html',
  styleUrls: ['./comment-button.component.scss']
})
export class StoryCommentButtonComponent implements OnInit {
  @Input() public comment: Story;
  @Output() public hasReplyClicked = new EventEmitter();
  constructor() { }

  public ngOnInit() {
  }

  public onReplyClicked() {
    this.hasReplyClicked.emit(this.comment.id);
  }

}
