import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-share-buttons-two',
  templateUrl: './story-share-buttons-two.component.html',
  styleUrls: ['./story-share-buttons-two.component.scss']
})
export class StoryShareButtonsTwoComponent implements OnInit {
  @Input() public story: Story;
  constructor() { }

  ngOnInit() {
  }

}
