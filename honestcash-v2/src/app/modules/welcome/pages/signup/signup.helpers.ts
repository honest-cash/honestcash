export class SignupHelpers {
  public static checkUserName = (username: string): boolean =>
    !(new RegExp(/[~`!#@$%\^&*+=. \-\[\]\\';,/{}|\\":<>\?]/))
      .test(username)

  public static validateSignupData(data: {
    email: string;
    username: string;
    password: string;
  }): string[] {
    const validationErrorList = [];

    if (!data || !data.username) {
      validationErrorList.push('Username is required.');
    }

    if (!this.checkUserName(data.username)) {
      validationErrorList.push('Please only use standard alphanumerics for username.');
    }

    if (data.username.length > 25) {
      validationErrorList.push('Username cannot have more than 25 characters');
    } else if (data.username.length < 3) {
      validationErrorList.push('Username should be at least 3 characters');
    }

    if (!data.email) {
      validationErrorList.push('Email is required..');
    }

    if (!data.password) {
      validationErrorList.push('Password is required..');

    }

    if (data.password.length < 8) {
      validationErrorList.push('Password must have at least 8 characters.');
    }

    return validationErrorList;
  }
}

