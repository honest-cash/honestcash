import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-share-buttons',
  templateUrl: './story-share-buttons.component.html',
  styleUrls: ['./story-share-buttons.component.scss']
})
export class StoryShareButtonsComponent implements OnInit {
  @Input() public story: Story;
  constructor() { }

  ngOnInit() {
  }

}
