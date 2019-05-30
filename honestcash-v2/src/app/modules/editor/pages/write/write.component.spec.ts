import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorWriteComponent} from './write.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';
import {EditorService} from '../../services/editor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('EditorWriteComponent', () => {
  let component: EditorWriteComponent;
  let fixture: ComponentFixture<EditorWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [EditorWriteComponent],
      providers: [
        EditorService,
        provideMockStore({initialState: initialAppStates})
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorWriteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
