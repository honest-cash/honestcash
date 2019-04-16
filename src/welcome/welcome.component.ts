import sweetalert from "sweetalert";
import { AuthService } from "../auth/AuthService";
import bitcoinAuthFlow from "../core/lib/bitcoinAuthFlow";
import { IGlobalScope, ISimpleWallet } from "../core/lib/interfaces";
import * as simpleWalletProvider from "../core/lib/simpleWalletProvider";
import ProfileService from "../core/services/ProfileService";
import ScopeService from "../core/services/ScopeService";
import { User } from "../core/models/models";
import { calculatePasswordHash } from "../core/lib/crypto";
import * as logger from "../core/lib/logger";

declare var SimpleWallet: any;
declare var grecaptcha: {
  render: (domId: string) => void;
  getResponse: any;
  reset: any;
};

interface ILoginForm {
  loginemail: string;
  loginpassword: string;
  loginpasswordreset?: string;
}
interface ISignupForm {
  username: string;
  email: string;
  password: string;
}
interface IWelcomeCtrl {
  forgot: boolean;
  isLoading: boolean;
  hideForm: boolean;
  message: string;
  noHeader: boolean;
  welcome: boolean;
  showEmailSignup: boolean;

  signupWith: (method: "email" | "facebook" | "twitter" | "badger") => void;
  goToForgotPage: () => void;
  goToLoginPage: () => void;
  login: (data: ILoginForm) => void;
  signup: (data: ISignupForm) => void;
  changePassword: (data: ILoginForm) => Promise<void>;
  resetPassword: (data: ILoginForm) => Promise<void>;
}
export default class WelcomeCtrl implements IWelcomeCtrl {
  public static $inject = [
    "$rootScope",
    "$scope",
    "$location",
    "AuthService",
    "ProfileService",
    "ScopeService",
  ];

  public isLoading = false;
  public forgot = false;
  public noHeader = true;
  public welcome = true;
  public hideForm = false;
  public message: string;
  public showEmailSignup = false;
  public data: ILoginForm | ISignupForm;

  private resetCode: string;
  private isCaptchaRendered = false;

  private errorMessages = {
    // tslint:disable-next-line:max-line-length
    NOT_ACTIVATED: "The access the the platform is currently limited. Your account has not been activated. Tweet to @Honest_Cash for a personal invitation.",
    EMAIL_EXISTS:  "E-Mail already exists",
    EMAIL_WRONGLY_FORMATTED:  "E-Mail wrongly formatted!",
    WRONG_PASSWORD: "Incorrect email address and / or password.",
    NO_USER_FOUND: "Incorrect email address and / or password.",
    LOG_IN_WITH_FACEBOOK: "Log in with Facebook",
    EMAIL_NOT_FOUND: "Incorrect email address and / or password.",
    PASSWORDS_DO_NOT_MATCH: "Passwords do not match!",
    WRONG_RESET_CODE: "Could not reset the password. Is the reset link and e-mail valid?",
  };

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: ng.IScope,
    private $location: ng.ILocationService,
    private authService: AuthService,
    private profileService: ProfileService,
    private scopeService: ScopeService,
  ) {
    this.ngInit();
  }

  public goToForgotPage = () => {
    this.forgot = true;
  }

  public goToLoginPage = () => {
    this.forgot = false;
  }

  public login = async (data: ILoginForm) => {
    this.isLoading = true;

    const passwordHash = calculatePasswordHash(
      data.loginemail,
      data.loginpassword,
    );

    let authData: {
      token: string;
      user: User;
      wallet: any;
    };

    try {
      logger.log(
        `Logging in with email ${data.loginemail} and password hash ${passwordHash}.`,
      );

      authData = await this.authService.login({
        email: data.loginemail,
        password: passwordHash,
      });
    } catch (response) {
      this.isLoading = false;

      return this.displayErrorMessage(response.data.code, response.data.desc);
    }

    logger.log(
      "Returned authData:",
      authData,
    );

    this.isLoading = false;

    let mnemonicEncrypted: string;

    if (authData.wallet) {
      logger.log(
        "Wallet is set for the user",
        authData.wallet,
      );

      mnemonicEncrypted = authData.wallet.mnemonicEncrypted;
    } else {
      logger.log(
        "Wallet is not defined for the user. Setting it up",
      );

      const sbw: ISimpleWallet = new SimpleWallet();

      sbw.mnemonicEncrypted = SimpleWallet.encrypt(sbw.mnemonic, data.loginpassword);

      mnemonicEncrypted = sbw.mnemonicEncrypted;

      logger.log(
        "Setting new wallet with the encrypted mnemonic",
        mnemonicEncrypted,
      );

      await this.authService.setWallet({
        mnemonicEncrypted,
      });

      logger.log(
        "Updating user BCH address",
        mnemonicEncrypted,
      );

      if (!authData.user.addressBCH) {
        await this.profileService.updateUser(
          authData.user.id,
          "addressBCH",
          sbw.address,
        );
      } else {
        await this.setAddressForTips(authData.user.id.toString(), sbw.address);
      }
    }

    try {
      simpleWalletProvider.loadWallet(
        mnemonicEncrypted,
        data.loginpassword,
      );
    } catch (err) {
      this.isLoading = false;

      await sweetalert(
        "Could not initialize your wallet. Please recreate your wallet by resetting your password.",
      );

      this.authService.destroyUserCredentials();
      this.scopeService.safeApply(this.$scope);

      return;
    }

    const simpleWallet = simpleWalletProvider.get();

    if (authData.wallet && !authData.user.addressBCH) {
      await this.setAddressForTips(authData.user.id.toString(), simpleWallet.address);
    }

    this.$rootScope.user = authData.user;

    location.href = "/";
  }

  public resetPassword = async (data: ILoginForm) => {
    this.isLoading = true;

    try {
      await this.authService.resetPassword({
        email: data.loginemail,
      });

      this.hideForm = true;
      this.message = "Check your e-mail inbox.";
      this.isLoading = false;
      this.scopeService.safeApply(this.$scope);
    } catch (err) {
      this.isLoading = false;

      return this.displayErrorMessage(
        typeof err.data === "string" ? err.data : err.data.code,
      );
    }
  }

  public signupWith(signupMethod: "email") {
    if (signupMethod === "email") {
      this.showEmailSignup = true;

      this.renderCaptcha();
    }

    this.scopeService.safeApply(this.$scope);
  }

  public async changePassword(data: ILoginForm) {
    logger.log(data);

    if (data.loginpassword !== data.loginpasswordreset) {
      this.message = "Passwords do not match!";

      return;
    }

    const passwordHash = calculatePasswordHash(
      data.loginemail,
      data.loginpassword,
    );

    logger.log(`Calculated password hash is: ${passwordHash}`);

    this.isLoading = true;

    const simpleWallet = await bitcoinAuthFlow({
      password: data.loginpassword,
    });

    try {
      await this.authService.changePassword({
        code: this.resetCode,
        email: data.loginemail,
        mnemonicEncrypted: simpleWallet.mnemonicEncrypted,
        newPassword: passwordHash,
        repeatNewPassword: passwordHash,
      });
    } catch (err) {
      this.isLoading = false;

      return this.displayErrorMessage(
        typeof err.data === "string" ? err.data : err.data.code,
      );
    }

    this.message = `Your password has been reset and a new wallet` +
      `has been generated. You can now log-in.`;

    data.loginemail = undefined;
    data.loginpassword = undefined;
    data.loginpasswordreset = undefined;

    this.resetCode = undefined;
    this.forgot = false;
    this.isLoading = false;

    this.scopeService.safeApply(this.$scope);
  }

  public async signup(data: ISignupForm) {
    const validationErrorList = this.validateSignup(data);

    if (validationErrorList.length > 0) {
      this.message = validationErrorList[0];

      this.scopeService.safeApply(this.$scope);

      return;
    }

    const captcha = grecaptcha.getResponse();

    if (!captcha || captcha.length === 0) {
      this.message = "Please verify captcha by checking the checkbox.";

      grecaptcha.reset();

      return;
    }

    this.isLoading = true;

    const passwordHash = calculatePasswordHash(data.email, data.password);

    let authData: any;

    try {
      authData = await this.authService.signup({
        captcha,
        email: data.email,
        password: passwordHash,
        username: data.username,
        userType: 0,
      });
    } catch (response) {
      this.isLoading = false;

      grecaptcha.reset();

      return this.displayErrorMessage(response.data.code, response.data.desc);
    }

    await this.setupWalletForUser(authData.user.id, data.password);

    this.isLoading = false;

    this.$rootScope.user = authData.user;

    location.href = "/thank-you";
  }

  private validateSignup(data: ISignupForm): string[] {
    const validationErrorList = [];

    if (!data || !data.username) {
      validationErrorList.push("Username is required.");
    }

    if (!this.checkUserName(data.username)) {
      validationErrorList.push("Please only use standard alphanumerics for username.");
    }

    if (data.username.length > 25) {
      validationErrorList.push("Username cannot have more than 25 characters");
    } else if (data.username.length < 3) {
      validationErrorList.push("Username should be at least 3 characters");
    }

    if (!data.email) {
      validationErrorList.push("Email is required..");
    }

    if (!data.password) {
      validationErrorList.push("Password is required..");

    }

    if (data.password.length < 8) {
      validationErrorList.push("Password must have at least 8 characters.");
    }

    return validationErrorList;
  }

  private setAddressForTips = async (userId: string, bchAddress: string) => {
    const hasConfirmed = await sweetalert({
      title: "Receiving tips",
      text: `Would you like to also receive tips to the same wallet?` +
      ` You can always change it in your profile.`,
      type: "warning",
      buttons: {
        cancel: true,
        confirm: true,
      },
    });

    if (hasConfirmed) {
      await this.profileService.updateUser(
        Number(userId),
        "addressBCH",
        bchAddress,
      );
    }
  }

  private async ngInit() {
    this.message = "";
    this.$rootScope.noHeader = true;
    this.isLoading = false;
    this.forgot = false;
    this.resetCode = this.$location.search().code;
    this.welcome = true;
    this.noHeader = true;

    this.scopeService.safeApply(this.$scope);
  }

  private async setupWalletForUser(userId: number, password: string): Promise<ISimpleWallet> {
    const sbw: ISimpleWallet = new SimpleWallet();

    sbw.mnemonicEncrypted = SimpleWallet.encrypt(sbw.mnemonic, password);

    const mnemonicEncrypted = sbw.mnemonicEncrypted;

    await this.authService.setWallet({
      mnemonicEncrypted,
    });

    await this.profileService.updateUser(
      userId,
      "addressBCH",
      sbw.address,
    );

    simpleWalletProvider.loadWallet(
      mnemonicEncrypted,
      password,
    );

    return sbw;
  }

  private renderCaptcha() {
    if (this.isCaptchaRendered) {
      return;
    }

    try {
      grecaptcha.render("hc-captcha");

      this.isCaptchaRendered = true;
    } catch (err) {
      setTimeout(() => this.renderCaptcha(), 1000);
    }
  }

  private checkUserName = (username: string): boolean =>
    !(new RegExp(/[~`!#@$%\^&*+=. \-\[\]\\';,/{}|\\":<>\?]/))
      .test(username)

  private displayErrorMessage(code: string, desc?): void {
    this.message = this.getErrorMessage(code, desc);

    this.scopeService.safeApply(this.$scope);
  }

  private getErrorMessage = (code: string, desc?: string): string =>
    desc || this.errorMessages[code] || "Login error. Try again..."
}