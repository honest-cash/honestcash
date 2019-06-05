import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Logger} from '../services/logger.service';
import {WindowToken} from '../../core/helpers/window';
import {EnvironmentToken} from '../../core/helpers/environment';
import {Environment} from '../../../environments/environment';
import {EditorService} from '../../modules/editor/services/editor.service';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

const log = new Logger('LocallySavedStoryGuard');

@Injectable({providedIn: 'root'})
export class LocallySavedStoryGuard implements CanActivate {
  readonly isPlatformBrowser: boolean;
  readonly isPlatformServer: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(WindowToken) private window: Window,
    @Inject(EnvironmentToken) private environment: Environment,
    private router: Router,
    private editorService: EditorService,
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
    this.isPlatformServer = isPlatformServer(this.platformId);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isPlatformBrowser) {
      if (this.editorService.getLocallySavedPost()) {
        return true;
      }
      this.router.navigate(['/editor/write']);
      return false;
    }
    if (this.isPlatformServer) {
      // to cheat SSR until client takes over
      return true;
    }
  }

}
