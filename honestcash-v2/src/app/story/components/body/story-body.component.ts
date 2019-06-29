import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-body',
  templateUrl: './story-body.component.html',
  styleUrls: ['./story-body.component.scss']
})
export class StoryBodyComponent implements OnInit {
  @Input() public story: Story;
  constructor() { }

  ngOnInit() {
  }

}
