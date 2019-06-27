import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {forkJoin, Observable, of} from 'rxjs';
import {
  EditorActionTypes,
  EditorStoryLoad,
  EditorStoryLoadFailure,
  EditorStoryLoadSuccess,
  EditorStoryPropertySave,
  EditorStoryPropertySaveFailure,
  EditorStoryPropertySaveSuccess,
  EditorStoryPublishFailure,
  EditorStoryPublishSuccess, EditorStorySaveAndPublish,
  EditorStorySaveFailure,
  EditorStorySaveSuccess,
} from './editor.actions';
import {catchError, concatMap, map, share, switchMap} from 'rxjs/operators';
import Story from '../../main/models/story';
import {EditorService} from '../services/editor.service';
import {EmptyResponse, FailedResponse} from '../../auth/models/authentication';
import {STORY_PROPERTIES} from '../shared/editor.story-properties';
import {StoryLoadContext} from '../shared/interfaces';

@Injectable()
export class EditorEffects {

  constructor(
    private actions: Actions,
    private editorService: EditorService,
  ) {
  }

  @Effect()
  public EditorStoryLoad: Observable<any> = this.actions.pipe(
    ofType(EditorActionTypes.EDITOR_STORY_LOAD),
    map((action: EditorStoryLoad) => action.payload),
    switchMap((storyLoadContext: StoryLoadContext) => this.editorService.loadPostDraft(storyLoadContext)
      .pipe(
        map((story: Story) => new EditorStoryLoadSuccess(story)),
        catchError(error => of(new EditorStoryLoadFailure(error))),
      ),
    ),
  );

  @Effect()
  public EditorStoryPropertySave: Observable<any> = this.actions.pipe(
    ofType(EditorActionTypes.EDITOR_STORY_PROPERTY_SAVE),
    map((action: EditorStoryPropertySave) => action.payload),
    switchMap((payload) => this.editorService.savePostProperty(payload.story, payload.property)
      .pipe(
        map((response: EmptyResponse) => new EditorStoryPropertySaveSuccess()),
        catchError((error: FailedResponse) => of(new EditorStoryPropertySaveFailure())),
        share()
      )
    )
  );

  @Effect()
  public EditorStorySaveAndPublish: Observable<any> = this.actions.pipe(
    ofType(EditorActionTypes.EDITOR_STORY_SAVE_AND_PUBLISH),
    map((action: EditorStorySaveAndPublish) => ({post: action.payload, properties: action.properties})),
    concatMap((context: {post: Story, properties: STORY_PROPERTIES[]}) =>
      forkJoin(
        ...context.properties.map(property => this.editorService.savePostProperty(context.post, property))
      )
        .pipe(
          map((savePostPropertyResponse: EmptyResponse[]) => new EditorStorySaveSuccess(context.post)),
          catchError((error) => of(new EditorStorySaveFailure(error))),
        )
    ),
  );

  @Effect()
  public EditorStorySaveSuccess: Observable<any> = this.actions.pipe(
    ofType(EditorActionTypes.EDITOR_STORY_SAVE_SUCCESS),
    map((action: EditorStorySaveSuccess) => action.payload),
    switchMap((post: Story) => this.editorService.publishPost(post)
      .pipe(
        map((publishPostResponse: Story) => new EditorStoryPublishSuccess(publishPostResponse)),
        catchError((error) => of(new EditorStoryPublishFailure(error))
        ),
      ))
  );

}
