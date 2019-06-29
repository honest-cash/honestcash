import {Component, Input, OnInit} from '@angular/core';
import Story from '../../models/story';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'story-comments',
  templateUrl: './story-comments.component.html',
  styleUrls: ['./story-comments.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})
export class StoryCommentsComponent implements OnInit {
  @Input() public story: Story;
  @Input() public comments: Story[];
  constructor() { }

  ngOnInit() {
  }

}
