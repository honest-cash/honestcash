import {async, ComponentFixture, TestBed,} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {EditorModalExampleComponent} from './modal-example.component';
import {provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../../shared/mocks/app.states.mock';

describe('EditorModalExampleComponent', () => {
  let component: EditorModalExampleComponent;
  let fixture: ComponentFixture<EditorModalExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditorModalExampleComponent
      ],
      imports: [],
      providers: [
        provideMockStore({initialState: initialAppStates})
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorModalExampleComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
