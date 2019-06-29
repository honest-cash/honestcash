import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'main-story-tags',
  templateUrl: './story-tags.component.html',
  styleUrls: ['./story-tags.component.scss']
})
export class MainStoryTagsComponent implements OnInit {
  @Input() public story: Story;
  constructor() { }

  ngOnInit() {
  }

}
