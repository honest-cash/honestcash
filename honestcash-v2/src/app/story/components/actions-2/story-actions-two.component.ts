import {Component, HostBinding, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-actions-two',
  templateUrl: './story-actions-two.component.html',
  styleUrls: ['./story-actions-two.component.scss']
})
export class StoryActionsTwoComponent implements OnInit {
  @Input() public story: Story;
  @HostBinding('class') public class = 'row mx-auto p-3 mt-3';
  constructor() { }

  public ngOnInit() {
  }

}
