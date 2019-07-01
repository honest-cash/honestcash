import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'auth-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class AuthHeadingComponent {
  @HostBinding('class') public class = 'text-center p-1';

  @Input() public title: string;
  @Input() public title2: string;
  @Input() public description: string;

}
