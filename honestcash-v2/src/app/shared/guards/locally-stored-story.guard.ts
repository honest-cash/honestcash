import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Logger} from '../services/logger.service';
import {WindowToken} from '../../core/helpers/window';
import {EnvironmentToken} from '../../core/helpers/environment';
import {Environment} from '../../../environments/environment';
import {EditorService} from '../../modules/editor/services/editor.service';

const log = new Logger('LocallySavedStoryGuard');

@Injectable({providedIn: 'root'})
export class LocallySavedStoryGuard implements CanActivate {
  constructor(
    @Inject(WindowToken) private window: Window,
    @Inject(EnvironmentToken) private environment: Environment,
    private router: Router,
    private editorService: EditorService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.editorService.getLocallySavedPost()) {
      return true;
    }
    this.router.navigate(['/editor/write']);
    return false;
  }

}
