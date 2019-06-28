import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'shared-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class SharedNotFoundComponent {
  @HostBinding('class') public class = 'align-items-center d-flex justify-content-center';
}
