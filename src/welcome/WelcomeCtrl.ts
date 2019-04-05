import sweetalert from "sweetalert";
import { AuthService } from "../auth/AuthService";
import bitcoinAuthFlow from "../core/lib/bitcoinAuthFlow";
import { IGlobalScope, ISimpleWallet } from "../core/lib/interfaces";
import * as simpleWalletProvider from "../core/lib/simpleWalletProvider";
import ProfileService from "../core/services/ProfileService";
import ScopeService from "../core/services/ScopeService";
import { User } from "../core/models/models";

declare var SimpleWallet: any;
declare var grecaptcha: {
  render: (domId: string) => void;
  getResponse: any;
  reset: any;
};

interface IWelcomeForms {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}
interface IWelcomeCtrl {
  isLoading: boolean;
  hideForm: boolean;
  noHeader: boolean;
  welcome: boolean;
  showEmailSignup: boolean;
  mode: "welcome" | "signup" | "login" | "reset-password" | "thank-you";
  errors: {
    username?: string;
    email?: string;
    password?: string;
    captcha?: string;
    general?: string;
  };

  switchMode: (mode: "signup" | "login" | "reset-password" | "thank-you") => void;
  login: () => void;
  signup: () => void;
  changePassword: () => Promise<void>;
  resetPassword: () => Promise<void>;
}
export default class WelcomeCtrl implements IWelcomeCtrl {
  public static $inject = [
    "$rootScope",
    "$scope",
    "$location",
    "$state",
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
  public data: IWelcomeForms;
  public errors: {
    username: string;
    email: string;
    password: string;
    captcha: string;
    general: string;
  };
  public mode: "welcome" | "login" | "signup" | "reset-password" | "thank-you";

  private resetCode: string;
  private isCaptchaRendered = false;

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: ng.IScope,
    private $location: ng.ILocationService,
    private $state,
    private authService: AuthService,
    private profileService: ProfileService,
    private scopeService: ScopeService,
  ) {
    this.ngInit();
  }

  public switchMode = (mode: "welcome" | "signup" | "login" | "reset-password" | "thank-you") => {
    this.mode = mode;
    if (mode === "signup") {
      this.renderCaptcha();
      this.scopeService.safeApply(this.$scope);
    }
  }

  public login = async () => {
    this.isLoading = true;
    const data = this.data;
    this.resetErrors();

    const passwordHash = this.authService.calculatePasswordHash(
      data.email,
      data.password,
    );

    let authData: {
      token: string;
      user: User;
      wallet: any;
    };

    try {
      authData = await this.authService.login({
        email: data.email,
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

      sbw.mnemonicEncrypted = SimpleWallet.encrypt(sbw.mnemonic, data.password);

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
        await this.setAddressForTips(authData.user.id, sbw.address);
      }
    }

    simpleWalletProvider.loadWallet(
      mnemonicEncrypted,
      data.password,
    );

    const simpleWallet = simpleWalletProvider.get();

    if (authData.wallet && !authData.user.addressBCH) {
      await this.setAddressForTips(authData.user.id, simpleWallet.address);
    }

    this.$rootScope.user = authData.user;

    location.href = "/";
  }

  public resetPassword = async () => {
    this.isLoading = true;
    const data = this.data;
    this.resetErrors();

    try {
      await this.authService.resetPassword({
        email: data.email,
      });

      this.hideForm = true;
      this.errors.general = "Check your e-mail inbox.";
      this.isLoading = false;
      this.scopeService.safeApply(this.$scope);
    } catch (err) {
      this.isLoading = false;

      return this.displayErrorMessage(
        typeof err.data === "string" ? err.data : err.data.code,
      );
    }
  }

  public async changePassword() {
    const data = this.data;
    this.resetErrors();

    if (data.password !== data.repeatPassword) {
      this.errors.password = "Passwords do not match!";
      return;
    }

    this.isLoading = true;

    let simpleWallet;

    try {
      simpleWallet = await bitcoinAuthFlow({
        password: data.password,
      });
    } catch (err) {
      await sweetalert("Your link is invalid!");

      location.href = "/login";

      return;
    }

    const passwordHash = this.authService.calculatePasswordHash(
      data.email,
      data.password,
    );

    try {
      await this.authService.changePassword({
        code: this.resetCode,
        email: data.email,
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

    this.errors.general = "Your password has been reset and a new wallet has been generated. You can now log-in.";

    data.email = undefined;
    data.password = undefined;
    data.repeatPassword = undefined;

    this.resetCode = undefined;
    this.isLoading = false;

    this.scopeService.safeApply(this.$scope);
  }

  public async signup() {
    const data = this.data;
    this.resetErrors();

    if (!data) {
      this.errors.username = "Username is required.";
      this.errors.email = "E-mail is required.";
      this.errors.password = "Password is required.";
      this.errors.captcha = "Please verify captcha by checking the checkbox.";
      return;
    }

    if (!data.username) {
      this.errors.username = "Username is required.";
      return;
    }

    if (!this.checkUserName(data.username)) {
      this.errors.username = "Username: please only use standard alphanumerics";
      return;
    }

    if (data.username.length > 25) {
      this.errors.username = "Username cannot have more than 25 characters";
      return;
    }

    if (data.username.length < 3) {
      this.errors.username = "Username should be at least 3 characters";
      return;
    }

    if (!data.email) {
      this.errors.email = "E-mail is required.";
      return;
    }

    if (!data.password) {
      this.errors.password = "Password is required.";
      return;
    }

    if (data.password.length < 8) {
      this.errors.password = "Password must have at least 8 characters.";
      return;
    }

    const captcha = grecaptcha.getResponse();

    if (!captcha || captcha.length === 0) {
      this.errors.captcha = "Please verify captcha by checking the checkbox.";

      grecaptcha.reset();
      return;
    }

    this.isLoading = true;

    const passwordHash = this.authService.calculatePasswordHash(data.email, data.password);

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

  private setAddressForTips = async (userId: string | number, bchAddress: string) => {
    const hasConfirmed = await sweetalert({
      title: "Receiving tips",
      text: `Would you like to also receive tips to the same wallet? You can always change it in your profile.`,
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

  private resetErrors = () => {
    this.errors.username = "";
    this.errors.email = "";
    this.errors.password = "";
    this.errors.captcha = "";
    this.errors.general = "";
  }

  private async ngInit() {
    this.$rootScope.noHeader = true;
    this.isLoading = false;
    this.mode = "welcome";
    this.errors = {
      username: "",
      email: "",
      password: "",
      captcha: "",
      general: "",
    };
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
      this.errors.general = desc;
    } else if (code) {
      switch (code) {
        case "NOT_ACTIVATED":
          this.errors.general = "The access the the platform is currently limited. " +
            "Your account has not been activated. Tweet to @Honest_Cash for a personal invitation.";
          break;
        case "EMAIL_EXISTS":
          this.errors.email = "E-mail already exists!";
          break;
        case "EMAIL_WRONGLY_FORMATTED":
          this.errors.email = "E-mail wrongly formatted!";
          break;
        case "WRONG_PASSWORD":
          this.errors.username = "Incorrect email address and / or password.";
          this.errors.password = "Incorrect email address and / or password.";
          break;
        case "NO_USER_FOUND":
          this.errors.username = "Incorrect email address and / or password.";
          this.errors.password = "Incorrect email address and / or password.";
          break;
        case "LOG_IN_WITH_FACEBOOK":
          this.message = "Log in with Facebook";
          break;
        case "EMAIL_NOT_FOUND":
          this.errors.username = "Incorrect email address and / or password.";
          this.errors.password = "Incorrect email address and / or password.";
          break;
        case "PASSWORDS_DO_NOT_MATCH":
          this.errors.password = "Passwords do not match!";
          break;
        case "WRONG_RESET_CODE":
          this.errors.general = "Could not reset the password. Is the reset link and e-mail valid?";
          break;
        default:
          this.errors.general = "Login error. Try again...";
      }
    }

    this.scopeService.safeApply(this.$scope);
  }
}
