import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteHeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: WriteHeaderComponent;
  let fixture: ComponentFixture<WriteHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [WriteHeaderComponent],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
