import sweetalert from "sweetalert";
import { AuthService } from "../auth/AuthService";
import bitcoinAuthFlow from "../core/lib/bitcoinAuthFlow";
import { IGlobalScope, ISimpleWallet } from "../core/lib/interfaces";
import * as simpleWalletProvider from "../core/lib/simpleWalletProvider";
import ProfileService from "../core/services/ProfileService";
import ScopeService from "../core/services/ScopeService";
import { User } from "../core/models/models";
import { calculatePasswordHash } from "../core/lib/crypto";

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
    "authService",
    "profileService",
    "scopeService",
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
      authData = await this.authService.login({
        email: data.loginemail,
        password: passwordHash,
      });
    } catch (response) {
      this.isLoading = false;

      return this.displayErrorMessage(response.data.code, response.data.desc);
    }

    this.isLoading = false;

    let mnemonicEncrypted: string;

    if (authData.wallet) {
      mnemonicEncrypted = authData.wallet.mnemonicEncrypted;
    } else {
      const sbw: ISimpleWallet = new SimpleWallet();

      sbw.mnemonicEncrypted = SimpleWallet.encrypt(sbw.mnemonic, data.loginpassword);

      mnemonicEncrypted = sbw.mnemonicEncrypted;

      await this.authService.setWallet({
        mnemonicEncrypted,
      });

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

    simpleWalletProvider.loadWallet(
      mnemonicEncrypted,
      data.loginpassword,
    );

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
    if (data.loginpassword !== data.loginpasswordreset) {
      this.message = "Passwords do not match!";

      return;
    }

    this.isLoading = true;

    let simpleWallet;

    try {
      simpleWallet = await bitcoinAuthFlow({
        password: data.loginpassword,
      });
    } catch (err) {
      await sweetalert("Your link is invalid!");

      location.href = "/login";

      return;
    }

    const passwordHash = calculatePasswordHash(
      data.loginemail,
      data.loginpassword,
    );

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
    if (!data) {
      return alert("Username is required.");
    }

    if (!data.username) {
      return alert("Username is required.");
    }

    if (!this.checkUserName(data.username)) {
      this.message = "Username: please only use standard alphanumerics";

      return;
    }

    if (data.username.length > 25) {
      this.message = "Username cannot have more than 25 characters";

      return;
    }

    if (data.username.length < 3) {
      this.message = "Username should be at least 3 characters";

      return;
    }

    if (!data.email) {
      this.message = "Email is required..";

      return;
    }

    if (!data.password) {
      this.message = "Password is required..";

      return;
    }

    if (data.password.length < 8) {
      this.message = "Password must have at least 8 characters.";

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

  private checkUserName(username: string): boolean {
     // unacceptable chars
    const pattern = new RegExp(/[~`!#@$%\^&*+=. \-\[\]\\';,/{}|\\":<>\?]/);

    if (pattern.test(username)) {
      return false;
    }

    return true; // good user input
  }

  private displayErrorMessage(code: string, desc?): void {
    if (desc) {
      this.message = desc;
    } else if (code) {
      switch (code) {
        case "NOT_ACTIVATED":
          this.message = "The access the the platform is currently limited. " +
            "Your account has not been activated. Tweet to @Honest_Cash for a personal invitation.";
          break;
        case "EMAIL_EXISTS":
          this.message = "E-Mail already exists";
          break;
        case "EMAIL_WRONGLY_FORMATTED":
          this.message = "E-Mail wrongly formatted!";
          break;
        case "WRONG_PASSWORD":
          this.message = "Incorrect email address and / or password.";
          break;
        case "NO_USER_FOUND":
          this.message = "Incorrect email address and / or password.";
          break;
        case "LOG_IN_WITH_FACEBOOK":
          this.message = "Log in with Facebook";
          break;
        case "EMAIL_NOT_FOUND":
          this.message = "Incorrect email address and / or password.";
          break;
        case "PASSWORDS_DO_NOT_MATCH":
          this.message = "Passwords do not match!";
          break;
        case "WRONG_RESET_CODE":
          this.message = "Could not reset the password. Is the reset link and e-mail valid?";
          break;
        default:
          this.message = "Login error. Try again...";
      }
    }

    this.scopeService.safeApply(this.$scope);
  }
}
