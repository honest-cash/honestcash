import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'main-story-body',
  templateUrl: './story-body.component.html',
  styleUrls: ['./story-body.component.scss']
})
export class MainStoryBodyComponent implements OnInit {
  @Input() public story: Story;
  constructor() { }

  ngOnInit() {
  }

}
