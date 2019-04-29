import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Logger } from '../../core';

const log = new Logger('Editor');

@Component({
  selector: 'app-editor-wrapper',
  templateUrl: './editor-wrapper.component.html',
  styleUrls: ['./editor-wrapper.component.scss']
})
export class EditorWrapperComponent implements OnInit {
  constructor(
  ) {}

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init debugger');
  }
}
