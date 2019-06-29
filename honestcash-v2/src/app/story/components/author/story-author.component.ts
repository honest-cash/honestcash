import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-author',
  templateUrl: './story-author.component.html',
  styleUrls: ['./story-author.component.scss']
})
export class StoryAuthorComponent implements OnInit {
  @Input() public story: Story;
  constructor() { }

  ngOnInit() {
  }

}
