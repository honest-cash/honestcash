import {Component, HostBinding, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'main-story-comment-card',
  templateUrl: './story-comment-card.component.html',
  styleUrls: ['./story-comment-card.component.scss']
})
export class MainStoryCommentCardComponent implements OnInit {
  @Input() public comment: Story;
  @HostBinding('class') public class = 'col-12 mb-2';
  constructor() { }

  ngOnInit() {
  }

}
