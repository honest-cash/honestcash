import {async, ComponentFixture, TestBed,} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../app.states.mock';
import {localStorageProvider, LocalStorageToken} from '../../core/shared/helpers/local-storage.helper';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {windowProvider, WindowToken} from '../../core/shared/helpers/window.helper';
import {StoryContainerComponent} from './story-container.component';

describe('StoryContainerComponent', () => {
  let component: StoryContainerComponent;
  let fixture: ComponentFixture<StoryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoryContainerComponent
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
    fixture = TestBed.createComponent(StoryContainerComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
