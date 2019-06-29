import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {
  STORY_PROPERTIES,
  StoryActionTypes,
  StoryLoad,
  StoryLoadFailure,
  StoryLoadSuccess,
  StoryPropertySave,
  StoryPropertySaveContext,
  StoryPropertySaveFailure,
  StoryPropertySaveSuccess,
} from './story.actions';
import {WalletService} from 'app/wallet/services/wallet.service';
import {WindowToken} from '../../../core/shared/helpers/window.helper';
import {Store} from '@ngrx/store';
import {AppStates} from '../../app.states';
import {StoryService} from '../services/story.service';
import Story from '../models/story';

@Injectable()
export class StoryEffects {

  constructor(
    @Inject(WindowToken) private window: Window,
    private store: Store<AppStates>,
    private actions: Actions,
    private storyService: StoryService,
    private walletService: WalletService,

    private router: Router,
  ) {
  }

  @Effect()
  public StoryLoad: Observable<any> = this.actions.pipe(
    ofType(StoryActionTypes.STORY_LOAD),
    map((action: StoryLoad) => action.payload),
    switchMap((storyId: number) =>
      this.storyService.getStoryWithDetails(storyId)
      .pipe(
        map((storyResponse: any[]) => new StoryLoadSuccess(storyResponse)),
        catchError((error) => of(new StoryLoadFailure(error))),
      )
    )
  );

  @Effect()
  public StoryPropertySave: Observable<any> = this.actions.pipe(
    ofType(StoryActionTypes.STORY_PROPERTY_SAVE),
    map((action: StoryPropertySave) => action.payload),
    switchMap((payload: StoryPropertySaveContext) =>
      this.storyService.saveProperty(payload)
      .pipe(
        map((savePropertyResponse: Story) => new StoryPropertySaveSuccess({story: savePropertyResponse, property: payload.property})),
        catchError((error) => of(new StoryPropertySaveFailure(error))),
      )
    )
  );

  @Effect({dispatch: false})
  public StoryPropertySaveSuccess: Observable<any> = this.actions.pipe(
    ofType(StoryActionTypes.STORY_PROPERTY_SAVE_SUCCESS),
    tap((action: StoryPropertySaveSuccess) => {
      if (action.payload.property !== STORY_PROPERTIES.Comment) {
        this.walletService.updateWalletBalance();
      }
    })
  );
}
