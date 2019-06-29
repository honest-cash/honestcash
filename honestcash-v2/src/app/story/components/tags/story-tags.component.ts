import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-tags',
  templateUrl: './story-tags.component.html',
  styleUrls: ['./story-tags.component.scss']
})
export class StoryTagsComponent implements OnInit {
  @Input() public story: Story;
  constructor() { }

  ngOnInit() {
  }

}
