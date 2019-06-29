import { Component, HostBinding } from '@angular/core';
import {StoryService} from '../../../story/services/story.service';
import Story from '../../../story/models/story';


@Component({
  selector: 'main-page-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss']
})
export class MainTermsOfServiceComponent {
  @HostBinding('class') public class = 'card m-auto';
  public story: Story;

  constructor(
    private storyService: StoryService
  ) {
    this.storyService.getStoryWithoutDetails(124).subscribe((story: Story) => {
      this.story = story;
    });
  }
}
