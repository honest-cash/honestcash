import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of} from 'rxjs';
import {
  EditorActionTypes, EditorStorySave, EditorStorySaveFailure, EditorStorySaveSuccess,
} from './editor.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import Post from '../../models/post';
import {EditorService} from '../../../modules/editor/services/editor.service';

@Injectable()
export class EditorEffects {

  constructor(
    private actions: Actions,
    private editorService: EditorService,
  ) {}

  @Effect()
  EditorLoad: Observable<any> = this.actions.pipe(
    ofType(EditorActionTypes.EDITOR_LOAD),
  );

  @Effect()
  EditorUnload: Observable<any> = this.actions.pipe(
    ofType(EditorActionTypes.EDITOR_UNLOAD),
  );

  @Effect()
  EditorStorySave: Observable<any> = this.actions.pipe(
    ofType(EditorActionTypes.EDITOR_STORY_SAVE),
    map((action: EditorStorySave) => action.payload),
    switchMap((payload: Post) =>
      this.editorService.saveDraft(payload)
        .pipe(
          map((saveDraftResponse: Post) => new EditorStorySaveSuccess({story: saveDraftResponse})),
          catchError((error) => of(new EditorStorySaveFailure(error))),
        )
    )
  );

  @Effect()
  EditorStorySaveSuccess: Observable<any> = this.actions.pipe(
    ofType(EditorActionTypes.EDITOR_STORY_SAVE_SUCCESS),
    map((action: EditorStorySaveSuccess) => action.payload),
    switchMap(payload => of(payload)),
  );
}
