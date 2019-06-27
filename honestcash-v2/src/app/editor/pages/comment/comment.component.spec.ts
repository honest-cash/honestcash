import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../shared/mocks/app.states.mock';
import {EditorCommentComponent} from './comment.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../app.states';
import {EDITOR_EDITING_MODES} from '../../components/header/header.component';
import {EditorStoryLoad} from '../../store/editor/editor.actions';

const activatedParentStoryId = 2;

describe('EditorCommentComponent', () => {
  let component: EditorCommentComponent;
  let fixture: ComponentFixture<EditorCommentComponent>;
  let mockActivatedRoute: ActivatedRoute;
  let store: Store<AppStates>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [EditorCommentComponent],
      providers: [
        provideMockStore({initialState: initialAppStates}),
        {provide: ActivatedRoute, useValue: {params: of({parentStoryId: activatedParentStoryId})}}
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
    mockActivatedRoute = TestBed.get(ActivatedRoute);
    fixture = TestBed.createComponent(EditorCommentComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have editingMode equal to Edit', () => {
    expect(component.editingMode).toBe(EDITOR_EDITING_MODES.Comment);
  });

  it('should should dispatch EditorStoryLoad with storyId from params of the route on ngOnInit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(new EditorStoryLoad({parentPostId: activatedParentStoryId}));
  });
});
