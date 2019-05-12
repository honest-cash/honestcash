import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-welcome-page-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent {
  @HostBinding('class') class = 'card mb-auto mt-auto';
}
