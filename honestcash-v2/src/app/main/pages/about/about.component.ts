import { Component, HostBinding } from '@angular/core';


@Component({
  selector: 'main-page-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class MainAboutComponent {
  @HostBinding('class') public class = 'm-auto';
}
