import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'auth-page-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class AuthWelcomeComponent {
  @HostBinding('class') public class = 'card mb-auto mt-auto text-black';
}
