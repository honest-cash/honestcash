import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class AppNotFoundComponent {
  @HostBinding('class') public class = 'align-items-center d-flex justify-content-center';
}
