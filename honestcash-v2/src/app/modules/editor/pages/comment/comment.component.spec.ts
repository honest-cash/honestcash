import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';
import {EditorRespondComponent} from './comment.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('EditorRespondComponent', () => {
  let component: EditorRespondComponent;
  let fixture: ComponentFixture<EditorRespondComponent>;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [EditorRespondComponent],
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
    fixture = TestBed.createComponent(EditorRespondComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
