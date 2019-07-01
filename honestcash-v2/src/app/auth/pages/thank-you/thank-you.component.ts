import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'auth-page-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class AuthThankYouComponent {
  @HostBinding('class') public class = 'card mb-auto mt-auto';
}
