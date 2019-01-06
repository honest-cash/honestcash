import md5 from "md5";
import generateWallet from "../core/lib/bitcoinAuthFlow";
import * as simpleWalletProvider from "../core/lib/simpleWalletProvider";
import swal from "sweetalert";
import { AuthService } from "../auth/AuthService";
import HashtagService from "../core/services/HashtagService";

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

export default class WelcomeCtrl {
  constructor(
    private $rootScope,
    private $scope,
    private $location,
    private $state,
    private AuthService: AuthService,
    private ProfileService,
    private scopeService,
    private hashtagService: HashtagService
  ) {
    $scope.message = "";
    $rootScope.noHeader = true;
    $scope.isLoading = false;
    $scope.forgot = false;
    $scope.resetCode = $location.search().code;
  
    this.ngInit();

    const mutateForgot = (forgotValue) => () => {
      $scope.forgot = forgotValue;
    };

    $scope.goToForgotPage = mutateForgot(true);
    $scope.goToLoginPage = mutateForgot(false);

    const setAddressForTips = async (userId: string, bchAddress: string) => {
      const hasConfirmed = await swal({
        title: 'Receiving tips',
        text: `Would you like to also receive tips to the same wallet? You can always change it in your profile.`,
        type: 'warning',
        buttons: {
          cancel: true,
          confirm: true,
        }
      });

      if (hasConfirmed) {
        await this.ProfileService.updateUser(
          userId,
          "addressBCH",
          bchAddress
        );
      }

      return;
    };

    $scope.login = async (data: ILoginForm) => {
      $scope.isLoading = true;

      const passwordHash = AuthService.calculatePasswordHash(
        data.loginemail,
        data.loginpassword
      );

      let authData;

      try {
        try {
          authData = await AuthService.login({
            email: data.loginemail,
            password: passwordHash,
          });
        } catch (err) {
          /**
           START OF obsolete code
           Remove it in the future! If the passwords matches, we will change it the salted sha3 hashing to move away from md5.

           It has been implemented on 4th Jan 2019. Let's wait 2 months to allow users to replace the hashes at subsequent logins!
          */ 
          authData = await AuthService.login({
            email: data.loginemail,
            password: md5(data.loginpassword),
          });

          // change the password
          await AuthService.setPassword({
            password: passwordHash
          });
          /**
           END OF obsolete code
          */ 
        }
      } catch (response) {
        $scope.isLoading = false;

        return this.displayErrorMessage(response.data.code, response.data.desc);
      }
      
      $scope.isLoading = false;

      let mnemonicEncrypted;

      if (authData.wallet) {
        mnemonicEncrypted = authData.wallet.mnemonicEncrypted;
      } else {
        const simpleWallet = await generateWallet({
          password: data.loginpassword
        });

        mnemonicEncrypted = simpleWallet.mnemonicEncrypted;

        await AuthService.setWallet({
          mnemonicEncrypted
        });

        if (!authData.user.addressBCH) {
          await this.ProfileService.updateUser(
            authData.user.id,
            "addressBCH",
            simpleWallet.address
          );
        } else {
          await setAddressForTips(authData.user.id, simpleWallet.address);
        }
      }

      simpleWalletProvider.initWallet(
        mnemonicEncrypted,
        data.loginpassword
      );

      const simpleWallet = simpleWalletProvider.get();

      if (authData.wallet && !authData.user.addressBCH) {
        await setAddressForTips(authData.user.id, simpleWallet.address);
      }

      $rootScope.user = authData.user;

      location.href = "/";
    };

    $scope.changePassword = (data: ILoginForm) => this.changePassword(data);

    $scope.resetPassword = async (data) => {
      $scope.isLoading = true;

      try {
        await AuthService.resetPassword({
          email: data.loginemail
        });

        $scope.hideForm = true;
        $scope.message = "Check your e-mail inbox.";
        $scope.isLoading = false;
        scopeService.safeApply($scope, () => {});
      } catch (err) {
        $scope.isLoading = false;

        return this.displayErrorMessage(
          typeof err.data === "string" ? err.data : err.data.code
        );
      }
    };

    $scope.signup = (data: ISignupForm) => this.signup(data);
  }

  static $inject = [
    "$rootScope",
    "$scope",
    "$location",
    "$state",
    "AuthService",
    "ProfileService",
    "ScopeService",
    "HashtagService"
  ];

  private async ngInit() {
    const hashtags = await this.hashtagService.getTopHashtags();

    this.$scope.welcome = true;
    this.$scope.noHeader = true;
    this.$scope.hashtags = hashtags;

    this.scopeService.safeApply(this.$scope, () => {});
  }

  private checkUserName(username: string): boolean {
    var pattern = new RegExp(/[~`!#@$%\^&*+=. \-\[\]\\';,/{}|\\":<>\?]/); //unacceptable chars

    if (pattern.test(username)) {
      return false;
    }

    return true; // good user input
  };

  private displayErrorMessage(code: string, desc?): void {
    if (desc) {
      this.$scope.message = desc;
    } else if (code) {
      switch (code) {
        case "NOT_ACTIVATED":
          this.$scope.message = "The access the the platform is currently limited. Your account has not been activated. Tweet to @Honest_Cash for a personal invitation.";
          break;
        case "EMAIL_EXISTS":
          this.$scope.message = "E-Mail already exists";
          break;
        case "EMAIL_WRONGLY_FORMATTED":
          this.$scope.message = "E-Mail wrongly formatted!";
          break;
        case "WRONG_PASSWORD":
          this.$scope.message = "Wrong password";
          break;
        case "NO_USER_FOUND":
          this.$scope.message = "User not found";
          break;
        case "LOG_IN_WITH_FACEBOOK":
          this.$scope.message = "Log in with Facebook";
          break;
        case "EMAIL_NOT_FOUND":
          this.$scope.message = "E-mail could not be found.";
          break;
        case "PASSWORDS_DO_NOT_MATCH":
          this.$scope.message = "Passwords do not match!";
          break;
        case "WRONG_RESET_CODE":
          this.$scope.message = "Could not reset the password. Is the reset link and e-mail valid?";
          break;
        default:
          this.$scope.message = "Login error. Try again...";
      }
    }

    this.scopeService.safeApply(this.$scope, () => {});
  };

  protected async changePassword(data: ILoginForm) {
    if (data.loginpassword !== data.loginpasswordreset) {
      this.$scope.message = "Passwords do not match!";

      return;
    }

    this.$scope.isLoading = true;

    let simpleWallet;

    try {
      simpleWallet = await generateWallet({
        password: data.loginpassword
      });
    } catch (err) {
      await swal("Your link is invalid!");

      location.href = "/login";

      return;
    }

    const passwordHash = this.AuthService.calculatePasswordHash(
      data.loginemail,
      data.loginpassword
    );

    try {
      await this.AuthService.changePassword({
        code: this.$scope.resetCode,
        email: data.loginemail,
        newPassword: passwordHash,
        repeatNewPassword: passwordHash,
        mnemonicEncrypted: simpleWallet.mnemonicEncrypted
      });
    } catch (err) {
      this.$scope.isLoading = false;

      return this.displayErrorMessage(
        typeof err.data === "string" ? err.data : err.data.code
      );
    }

    this.$scope.message = "Your password has been reset and a new wallet has been generated. You can now log-in.";

    data.loginemail = undefined;
    data.loginpassword = undefined;
    data.loginpasswordreset = undefined;

    this.$scope.resetCode = undefined;
    this.$scope.forgot = false;
    this.$scope.isLoading = false;

    this.scopeService.safeApply(this.$scope, () => {});
  }

  protected async signup(data: ISignupForm) {
    if (!data) {
      return alert("Username is required.");
    }

    if (!data.username) {
      return alert("Username is required.");
    }

    if (!this.checkUserName(data.username)) {
      this.$scope.message = "Username: please only use standard alphanumerics";

      return;	
    }

    if (data.username.length > 25) {
      this.$scope.message = "Username cannot have more than 25 characters";

      return;
    }

    if (data.username.length < 3) {
      this.$scope.message = "Username should be at least 3 characters";

      return;
    }

    if (!data.email) {
      this.$scope.message = "Email is required..";

      return;
    }

    if (!data.password) {
      this.$scope.message = "Password is required..";

      return;
    }

    if (data.password.length < 8) {
      this.$scope.message = "Password must have at least 8 characters.";

      return;
    }

    this.$scope.isLoading = true;

    const passwordHash = this.AuthService.calculatePasswordHash(data.email, data.password);

    this.AuthService.signup({
      username: data.username,
      password: passwordHash,
      email: data.email,
      userType: 0
    })
    .then((user) => {
      const User = user;

      this.$scope.isLoading = false;

      // $rootScope.user = user.user;

      this.$state.go("starter.thankyou");
    }, response => {
      this.$scope.isLoading = false;

      return this.displayErrorMessage(response.data.code, response.data.desc);
    });
  };
}
