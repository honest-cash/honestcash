import {async, ComponentFixture, TestBed,} from '@angular/core/testing';
import {EditorStoryPreviewComponent} from './story-preview.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../core/shared/mocks/app.states.mock';
import {localStorageProvider, LocalStorageToken} from '../../../../core/helpers/localStorage';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {windowProvider, WindowToken} from '../../../../core/helpers/window';

describe('EditorStoryPreviewComponent', () => {
  let component: EditorStoryPreviewComponent;
  let fixture: ComponentFixture<EditorStoryPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditorStoryPreviewComponent
      ],
      imports: [
        HttpClientTestingModule,
        NgbModule
      ],
      providers: [
        provideMockStore({initialState: initialAppStates}),
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: WindowToken, useFactory: windowProvider},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        NgbModal,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorStoryPreviewComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
