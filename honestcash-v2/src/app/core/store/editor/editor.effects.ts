import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {forkJoin, Observable, of, timer, zip} from 'rxjs';
import {
  EditorActionTypes, EditorStoryPropertyChange, EditorStoryPropertySave,
  EditorStoryPublish,
  EditorStoryPublishFailure,
  EditorStoryPublishSuccess,
  EditorStorySave,
  EditorStorySaveFailure,
  EditorStorySaveSuccess,
} from './editor.actions';
import {catchError, first, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import Post from '../../models/post';
import {EditorService, STORY_PROPERTIES} from '../../../modules/editor/services/editor.service';
import {EmptyResponse, LoginSuccessResponse} from '../../models/authentication';
import {Router} from '@angular/router';

@Injectable()
export class EditorEffects {

  constructor(
    private actions: Actions,
    private editorService: EditorService,
    private router: Router,
  ) {}

  @Effect({dispatch: false})
  EditorStoryPropertySave: Observable<any> = this.actions.pipe(
    ofType(EditorActionTypes.EDITOR_STORY_PROPERTY_SAVE),
    map((action: EditorStoryPropertySave) => action.payload),
    switchMap((payload) => this.editorService.savePostProperty(payload.story, payload.property)),
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
