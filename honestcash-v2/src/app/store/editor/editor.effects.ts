import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {forkJoin, Observable, of} from 'rxjs';
import {
  EditorActionTypes,
  EditorDraftLoadFailure,
  EditorDraftLoadSuccess,
  EditorStoryLoadFailure,
  EditorStoryLoadSuccess,
  EditorStoryPropertySave,
  EditorStoryPublishFailure,
  EditorStoryPublishSuccess,
  EditorStorySave,
  EditorStorySaveFailure,
  EditorStorySaveSuccess,
} from './editor.actions';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import Post from '../../shared/models/post';
import {EditorService, STORY_PROPERTIES} from '../../modules/editor/services/editor.service';
import {EmptyResponse} from '../../shared/models/authentication';
import {Router} from '@angular/router';

@Injectable()
export class EditorEffects {

  constructor(
    private actions: Actions,
    private editorService: EditorService,
    private router: Router,
  ) {
  }

  @Effect({dispatch: false})
  EditorStoryPropertySave: Observable<any> = this.actions.pipe(
    ofType(EditorActionTypes.EDITOR_STORY_PROPERTY_SAVE),
    map((action: EditorStoryPropertySave) => action.payload),
    switchMap((payload) => this.editorService.savePostProperty(payload.story, payload.property)),
  );

  @Effect()
  EditorDraftLoad: Observable<any> = this.actions.pipe(
    ofType(EditorActionTypes.EDITOR_DRAFT_LOAD),
    switchMap(() => this.editorService.loadNewPostDraft()
      .pipe(
        map((story: Post) => new EditorDraftLoadSuccess(story)),
        catchError(error => of(new EditorDraftLoadFailure(error))),
      ),
    ),
  );

  @Effect()
  EditorStoryLoad: Observable<any> = this.actions.pipe(
    ofType(EditorActionTypes.EDITOR_STORY_LOAD),
    switchMap(() => this.editorService.getPost(0)
      .pipe(
        map((story: Post) => new EditorStoryLoadSuccess(story)),
        catchError(error => of(new EditorStoryLoadFailure(error))),
      ),
    ),
  );

  @Effect()
  EditorStorySave: Observable<any> = this.actions.pipe(
    ofType(EditorActionTypes.EDITOR_STORY_SAVE),
    map((action: EditorStorySave) => action.payload),
    mergeMap((post: Post) =>
      forkJoin(
        Object
        .values(STORY_PROPERTIES)
        .map(property =>
          this.editorService.savePostProperty(post, property)
        )
      )
      .pipe(
        map((savePostPropertyResponse: EmptyResponse[]) => new EditorStorySaveSuccess(post)),
        catchError((error) => of(new EditorStorySaveFailure(error))),
      )
    )
  );

  @Effect()
  EditorStoryPublish: Observable<any> = this.actions.pipe(
    ofType(EditorActionTypes.EDITOR_STORY_PUBLISH),
    map((action: EditorStorySave) => action.payload),
    switchMap((post: Post) => this.editorService.publishPost(post)
    .pipe(
      map((publishPostResponse: Post) => new EditorStoryPublishSuccess(publishPostResponse)),
      catchError((error) => of(new EditorStoryPublishFailure(error))
      ),
    ))
  );

  @Effect()
  EditorStorySaveAndPublish: Observable<any> = this.actions.pipe(
    ofType(EditorActionTypes.EDITOR_STORY_SAVE_AND_PUBLISH),
    map((action: EditorStorySave) => action.payload),
    mergeMap((post: Post) =>
      forkJoin(
        Object
        .values(STORY_PROPERTIES)
        .map(property =>
          this.editorService.savePostProperty(post, property)
        )
      )
      .pipe(
        map((savePostPropertyResponse: EmptyResponse[]) => new EditorStorySaveSuccess(post)),
        catchError((error) => of(new EditorStorySaveFailure(error))),
      )
    ),
    ofType(EditorActionTypes.EDITOR_STORY_SAVE_SUCCESS),
    map((action: EditorStorySaveSuccess) => action.payload),
    switchMap((post: Post) => this.editorService.publishPost(post)
    .pipe(
      map((publishPostResponse: Post) => new EditorStoryPublishSuccess(publishPostResponse)),
      catchError((error) => of(new EditorStoryPublishFailure(error))
      ),
    ))
  );
}
