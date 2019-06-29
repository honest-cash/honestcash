import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-title',
  templateUrl: './story-title.component.html',
  styleUrls: ['./story-title.component.scss']
})
export class StoryTitleComponent implements OnInit {
  @Input() public story: Story;
  constructor() { }

  ngOnInit() {
  }

}
