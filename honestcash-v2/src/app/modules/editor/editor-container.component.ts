import { Component, OnInit } from '@angular/core';
import {Logger} from '../../core';
import {environment} from '../../../environments/environment';

const log = new Logger('Editor');

@Component({
  selector: 'app-editor-container',
  templateUrl: './editor-container.component.html',
  styleUrls: ['./editor-container.component.scss'],
})
export class EditorContainerComponent implements OnInit {
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
