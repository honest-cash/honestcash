import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoreModule } from '../../../core';
import { EditorCoreComponent } from './editor-core.component';
import { PostService } from '../../../services/post.service';
import { EditorService } from './editor.service';

describe('EditorCoreComponent', () => {
  let component: EditorCoreComponent;
  let fixture: ComponentFixture<EditorCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      declarations: [EditorCoreComponent],
      providers: [PostService, EditorService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
