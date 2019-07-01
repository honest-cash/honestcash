import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../app.states.mock';
import {EditorEditComponent} from './edit.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {EDITOR_EDITING_MODES} from '../../components/header/header.component';
import {EditorStoryLoad} from '../../store/editor.actions';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../app.states';

const activatedStoryId = 2;

describe('EditorEditComponent', () => {
  let component: EditorEditComponent;
  let fixture: ComponentFixture<EditorEditComponent>;
  let mockActivatedRoute: ActivatedRoute;
  let store: Store<AppStates>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [EditorEditComponent],
      providers: [
        provideMockStore({initialState: initialAppStates}),
        {provide: ActivatedRoute, useValue: {params: of({storyId: activatedStoryId})}}
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
    mockActivatedRoute = TestBed.get(ActivatedRoute);
    fixture = TestBed.createComponent(EditorEditComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have editingMode equal to Edit', () => {
    expect(component.editingMode).toBe(EDITOR_EDITING_MODES.Edit);
  });

  it('should should dispatch EditorStoryLoad with storyId from params of the route on ngOnInit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(new EditorStoryLoad({postId: activatedStoryId}));
  });
});
