import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorSaveStatusComponent} from './save-status.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';
import {ToastrModule, ToastrService} from 'ngx-toastr';

describe('EditorSaveStatusComponent', () => {
  let component: EditorSaveStatusComponent;
  let fixture: ComponentFixture<EditorSaveStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
      ],
      declarations: [EditorSaveStatusComponent],
      providers: [
        provideMockStore({initialState: initialAppStates}),
        ToastrService,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorSaveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('functions', () => {
    it('saveDraftStory should ', () => {

    });
  });
});
