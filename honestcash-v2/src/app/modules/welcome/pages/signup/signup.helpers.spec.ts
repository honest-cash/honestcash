
import { SignupHelpers } from './signup.helpers';

describe('SignupHelpers', () => {
  it('should spot incorrect usernames', () => {
    SignupHelpers.checkUserName('helloworld');


    // correct
    expect(SignupHelpers.checkUserName('helloworld')).toBe(true);
    expect(SignupHelpers.checkUserName('helloworld123')).toBe(true);
    expect(SignupHelpers.checkUserName('___')).toBe(true);

    // incorrect
    expect(SignupHelpers.checkUserName('incorrect@hello')).toBe(false);
    expect(SignupHelpers.checkUserName('a')).toBe(false);
    expect(SignupHelpers.checkUserName(undefined)).toBe(false);
    expect(SignupHelpers.checkUserName('0123456789_1234567890_1234567890')).toBe(true);
    expect(SignupHelpers.checkUserName('//////')).toBe(true);
    expect(SignupHelpers.checkUserName('----123123--123')).toBe(true);
  });

  // @todo extend these tests for the entire app
  /*
  it(`should have as title 'honestcash-v2'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('honestcash-v2');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to honestcash-v2!');
  });
  */
});
