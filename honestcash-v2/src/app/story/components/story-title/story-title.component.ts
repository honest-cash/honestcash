import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'main-story-title',
  templateUrl: './story-title.component.html',
  styleUrls: ['./story-title.component.scss']
})
export class MainStoryTitleComponent implements OnInit {
  @Input() public story: Story;
  constructor() { }

  ngOnInit() {
  }

}
