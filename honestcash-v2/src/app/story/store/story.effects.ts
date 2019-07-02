import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {
  StoryActionTypes,
  StoryCommentDraftLoad,
  StoryCommentDraftLoadFailure,
  StoryCommentDraftLoadSuccess,
  StoryLoad,
  StoryLoadFailure,
  StoryLoadSuccess,
  StoryPropertiesLoadFailure,
  StoryPropertiesLoadSuccess,
  StoryPropertyLoad,
  StoryPropertySave,
  StoryPropertySaveContext,
  StoryPropertyUpdate,
} from './story.actions';
import {WindowToken} from '../../../core/shared/helpers/window.helper';
import {Store} from '@ngrx/store';
import {AppStates} from '../../app.states';
import {StoryService} from '../services/story.service';
import Story from '../models/story';
import {Upvote} from '../models/upvote';
import {Unlock} from '../models/unlock';
import {EditorService} from '../../editor/services/editor.service';
import {TRANSACTION_TYPES} from '../../wallet/models/transaction';

@Injectable()
export class StoryEffects {

  constructor(
    @Inject(WindowToken) private window: Window,
    private store: Store<AppStates>,
    private actions: Actions,
    private storyService: StoryService,
    private editorService: EditorService,

    private router: Router,
  ) {
  }

  @Effect()
  public StoryLoad: Observable<any> = this.actions.pipe(
    ofType(StoryActionTypes.STORY_LOAD),
    map((action: StoryLoad) => action.payload),
    switchMap((storyId: number) =>
      this.storyService.getStoryWithoutDetails(storyId)
      .pipe(
        map((storyResponse: Story) => new StoryLoadSuccess(storyResponse)),
        catchError((error) => of(new StoryLoadFailure(error))),
      )
    )
  );

  @Effect()
  public StoryLoadSuccess: Observable<any> = this.actions.pipe(
    ofType(StoryActionTypes.STORY_LOAD_SUCCESS),
    map((action: StoryLoadSuccess) => action.payload),
    switchMap((story: Story) =>
      this.storyService.getStoryDetails(story.id)
        .pipe(
          map((storyDetailsResponse: [Story[], Upvote[], Unlock[]]) => new StoryPropertiesLoadSuccess(storyDetailsResponse)),
          catchError((error) => of(new StoryPropertiesLoadFailure(error))),
        )
    )
  );

  @Effect()
  public StoryCommentDraftLoad: Observable<any> = this.actions.pipe(
    ofType(StoryActionTypes.STORY_COMMENT_DRAFT_LOAD),
    map((action: StoryCommentDraftLoad) => action.payload),
    switchMap((storyId: number) => this.editorService.loadPostDraft({parentPostId: storyId})
      .pipe(
        map((story: Story) => new StoryCommentDraftLoadSuccess(story)),
        catchError(error => of(new StoryCommentDraftLoadFailure(error))),
      ),
    ),
  );

  @Effect()
  public StoryPropertySave: Observable<any> = this.actions.pipe(
    ofType(StoryActionTypes.STORY_PROPERTY_SAVE),
    map((action: StoryPropertySave) => action.payload),
    switchMap((payload: StoryPropertySaveContext) =>
      this.storyService.saveProperty(payload)
      .pipe(
        map(() => new StoryPropertyLoad(payload)),
      )
    )
  );

  @Effect()
  public StoryPropertyLoad: Observable<any> = this.actions.pipe(
    ofType(StoryActionTypes.STORY_PROPERTY_LOAD),
    map((action: StoryPropertyLoad) => action.payload),
    switchMap((payload: StoryPropertySaveContext) =>
      this.storyService.loadProperty(payload)
        .pipe(
          map((savePropertyResponse: Story[] | Upvote[] | [Unlock[], Story]) => {
            if (payload.property === TRANSACTION_TYPES.Unlock) {
              return new StoryPropertyUpdate({property: TRANSACTION_TYPES.Unlock, value: savePropertyResponse as [Unlock[], Story]});
            }
            if (payload.property === TRANSACTION_TYPES.Upvote) {
              return new StoryPropertyUpdate({property: TRANSACTION_TYPES.Upvote, value: savePropertyResponse as Upvote[]});
            }
            if (payload.property === TRANSACTION_TYPES.Comment) {
              return new StoryPropertyUpdate({property: TRANSACTION_TYPES.Comment, value: savePropertyResponse as Story[]});
            }
          }),
        )
    )
  );
}
