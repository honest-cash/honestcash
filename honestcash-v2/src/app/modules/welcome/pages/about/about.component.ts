import { Component, HostBinding } from '@angular/core';


@Component({
  selector: 'app-welcome-page-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  @HostBinding('class') class = 'card mb-auto mt-auto';
}
