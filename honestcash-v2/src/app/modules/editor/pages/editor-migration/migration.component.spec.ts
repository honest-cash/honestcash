import {async, ComponentFixture, TestBed, } from '@angular/core/testing';
import {EditorMigrationComponent} from './migration.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';
import {localStorageProvider, LocalStorageToken} from '../../../../core/helpers/localStorage';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {EditorService} from '../../services/editor.service';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('EditorMigrationComponent', () => {
  let component: EditorMigrationComponent;
  let fixture: ComponentFixture<EditorMigrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditorMigrationComponent
      ],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        provideMockStore({initialState: initialAppStates}),
        {provide: ActivatedRoute, useValue: {params: of({storyId: 2})}},
        {provide: 'PLATFORM_ID', useValue: 'browser'},
        {provide: LocalStorageToken, useFactory: localStorageProvider},
        DomSanitizer,
        EditorService,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorMigrationComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
