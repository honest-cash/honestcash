import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core';
import { EditorWrapperComponent } from './editor-wrapper.component';

describe('EditorsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule , CoreModule],
      declarations: [EditorWrapperComponent],
      providers: []
    });
    TestBed.compileComponents();
  }));

  it('should create the editor app', async(() => {
    const fixture = TestBed.createComponent(EditorWrapperComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
