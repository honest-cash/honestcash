import {Component, HostBinding, Input, OnInit} from '@angular/core';
import Story from '../../models/story';

@Component({
  selector: 'story-author',
  templateUrl: './story-author.component.html',
  styleUrls: ['./story-author.component.scss']
})
export class StoryAuthorComponent implements OnInit {
  @HostBinding('class') public class = 'row mt-5';
  @Input() public story: Story;
  constructor() { }

  ngOnInit() {
  }

}
