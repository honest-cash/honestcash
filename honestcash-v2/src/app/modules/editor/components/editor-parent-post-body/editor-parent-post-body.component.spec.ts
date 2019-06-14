import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorParentPostBodyComponent } from './editor-parent-post-body.component';

describe('EditorParentPostBodyComponent', () => {
  let component: EditorParentPostBodyComponent;
  let fixture: ComponentFixture<EditorParentPostBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorParentPostBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorParentPostBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
