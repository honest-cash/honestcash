import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-unlock-button',
  templateUrl: './unlock-button.component.html',
  styleUrls: ['./unlock-button.component.scss']
})
export class StoryUnlockButtonComponent implements OnInit {
  @Input() public cost: number;
  constructor() { }

  public ngOnInit() {
  }

}
