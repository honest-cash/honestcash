import { Component, Input } from '@angular/core';

@Component({
  // @todo rename the selector -> its confusing!
  selector: 'app-welcome-form-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FormFooterComponent {
  @Input() text;
  @Input() anchor;
  @Input() to;
}
