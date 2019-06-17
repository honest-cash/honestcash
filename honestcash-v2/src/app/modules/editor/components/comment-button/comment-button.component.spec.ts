import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorCommentButtonComponent} from './comment-button.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';
import {windowProvider, WindowToken} from '../../../../core/helpers/window';
import {environmentProvider, EnvironmentToken} from '../../../../core/helpers/environment';
import {ToastrModule} from 'ngx-toastr';

describe('EditorCommentButtonComponent', () => {
  let component: EditorCommentButtonComponent;
  let fixture: ComponentFixture<EditorCommentButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
      ],
      declarations: [EditorCommentButtonComponent],
      providers: [
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: WindowToken, useFactory: windowProvider},
        {provide: EnvironmentToken, useFactory: environmentProvider},
        provideMockStore({initialState: initialAppStates})
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorCommentButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('functions', () => {
    it('saveDraftStory should', () => {
    });
  });
});
