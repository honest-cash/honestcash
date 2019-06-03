import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorPublishButtonComponent} from './publish-button.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';
import {WindowToken} from '../../../../core/helpers/window';
import {environmentProvider, EnvironmentToken} from '../../../../core/helpers/environment';
import {ToastrModule, ToastrService} from 'ngx-toastr';

const MockWindow = {
  location: {
    href: '',
  }
};

describe('EditorPublishButtonComponent', () => {
  let component: EditorPublishButtonComponent;
  let fixture: ComponentFixture<EditorPublishButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
      ],
      declarations: [EditorPublishButtonComponent],
      providers: [
        ToastrService,
        provideMockStore({initialState: initialAppStates}),
        {provide: WindowToken, useValue: MockWindow},
        {provide: EnvironmentToken, useFactory: environmentProvider},
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPublishButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('functions', () => {
    it('saveDraftStory should', () => {
    });
  });
});
