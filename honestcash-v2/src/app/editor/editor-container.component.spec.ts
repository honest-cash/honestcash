import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EditorContainerComponent} from './editor-container.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('EditorContainerComponent', () => {
  let component: EditorContainerComponent;
  let fixture: ComponentFixture<EditorContainerComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        EditorContainerComponent
      ],
      providers: [],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });

    fixture = TestBed.createComponent(EditorContainerComponent);
    component = fixture.componentInstance;
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  });
});
