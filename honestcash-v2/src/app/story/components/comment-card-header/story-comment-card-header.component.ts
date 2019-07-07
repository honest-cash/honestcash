import {Component, HostBinding, Inject, Input, OnInit} from '@angular/core';
import Story from '../../models/story';
import {WindowToken} from '../../../../core/shared/helpers/window.helper';

@Component({
  selector: 'story-comment-card-header',
  templateUrl: './story-comment-card-header.component.html',
  styleUrls: ['./story-comment-card-header.component.scss']
})
export class StoryCommentCardHeaderComponent implements OnInit {
  @Input() public comment: Story;
  @HostBinding('class') public class = 'row p-3';
  constructor(
    @Inject(WindowToken) private window,
  ) { }

  public ngOnInit() {
  }

  public goToUserProfile() {
    this.window.location.href = `/profile/${this.comment.user.username}`;
  }

}
