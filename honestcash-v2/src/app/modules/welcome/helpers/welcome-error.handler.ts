import {CodedErrorResponse} from '../../../core/models/authentication';

export class WelcomeErrorHandler {
  // @todo extract to i18n service
  private static ERROR_MESSAGES = {
    USER_NOT_FOUND: 'Incorrect email address and / or password.',
    EMAIL_EXISTS:  'E-Mail already exists',
    USER_BLOCKED: 'USER_BLOCKED',
    NOT_ACTIVATED: 'NOT_ACTIVATED',
    USER_NOT_VERIFIED: 'USER_NOT_VERIFIED',
    INITIAL_PARAMS: 'INITIAL_PARAMS',
    INITIAL_EMAIL: 'INITIAL_EMAIL',
    INITIAL_PASSWORD: 'INITIAL_PASSWORD',
    EMAIL_NOT_FOUND: 'Incorrect email address and / or password.',
    WRONG_PASSWORD: 'Incorrect email address and / or password.',
    PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
    WRONG_RESET_CODE: 'Password could not be changed. Is the email and link valid?'
  };
  private static UNKNOWN_ERROR = 'Unknown error';

  // @todo type deriviation
  // @todo unification of error messages
  public static getErrorDesc(errorMessage: any): string {
    if (typeof errorMessage === 'string') {
      return errorMessage;
    } else if (errorMessage instanceof CodedErrorResponse) {
      return WelcomeErrorHandler.ERROR_MESSAGES[errorMessage.code] || errorMessage.desc || errorMessage.code;
    } else if (typeof errorMessage.error === 'string') {
      return WelcomeErrorHandler.ERROR_MESSAGES[errorMessage.error] || errorMessage.error;
    } else if (errorMessage.error) {
      return WelcomeErrorHandler.ERROR_MESSAGES[errorMessage.error.code] || errorMessage.error.desc || errorMessage.error.code;
    }

    return WelcomeErrorHandler.UNKNOWN_ERROR;
  }

}
