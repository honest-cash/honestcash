import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'story-container',
  templateUrl: './story-container.component.html',
  styleUrls: ['./story-container.component.scss']
})
export class StoryContainerComponent {
  @HostBinding('class') public class = 'w-100 mb-auto mt-auto';
}
