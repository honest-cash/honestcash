import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';
import {EditorCommentComponent} from './comment.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('EditorCommentComponent', () => {
  let component: EditorCommentComponent;
  let fixture: ComponentFixture<EditorCommentComponent>;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [EditorCommentComponent],
      providers: [
        provideMockStore({initialState: initialAppStates}),
        {provide: ActivatedRoute, useValue: {params: of({parentStoryId: 2})}}
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
    mockActivatedRoute = TestBed.get(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorCommentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
