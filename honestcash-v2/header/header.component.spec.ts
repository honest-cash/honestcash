/**
 import { async, ComponentFixture, TestBed } from '@angular/core/testing';
 import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 import { TranslateModule } from '@ngx-translate/core';
 import { RouterTestingModule } from '@angular/router/testing';

 import { AuthService, I18nService, MockAuthenticationService } from '@app/core';
 import { WelcomeCardHeader } from './header.component';

 describe('WelcomeCardHeader', () => {
  let component: WelcomeCardHeader;
  let fixture: ComponentFixture<WelcomeCardHeader>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgbModule, TranslateModule.forRoot()],
      declarations: [WelcomeCardHeader],
      providers: [{ provide: AuthService, useClass: MockAuthenticationService }, I18nService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeCardHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 */
