import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-locked-body',
  templateUrl: './locked-body.component.html',
  styleUrls: ['./locked-body.component.scss']
})
export class StoryLockedBodyComponent implements OnInit {
  @Input() public story: Story;
  constructor() { }

  ngOnInit() {
  }

}
