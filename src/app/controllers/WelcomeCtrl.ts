import md5 from "md5";
import generateWallet from "../lib/bitcoinAuthFlow";
import * as simpleWalletProvider from "../lib/simpleWalletProvider";
import swal from "sweetalert";

export default class WelcomeCtrl {
  constructor($rootScope, $scope, $location, $state, AuthService, ProfileService) {
    $scope.message = "";
    $rootScope.noHeader = true;
    $scope.isLoading = false;
    $scope.forgot = false;
    $scope.resetCode = $location.search().code;

    const displayErrorMessage = (code, desc?) => {
      if (desc) {
        $scope.message = desc;
      } else if (code) {
        switch (code) {
          case "NOT_ACTIVATED":
            $scope.message = "The access the the platform is currently limited. Your account has not been activated. Tweet to @Honest_Cash for a personal invitation.";
            break;
          case "EMAIL_EXISTS":
            $scope.message = "E-Mail already exists";
            break;
          case "EMAIL_WRONGLY_FORMATTED":
            $scope.message = "E-Mail wrongly formatted!";
            break;
          case "WRONG_PASSWORD":
            $scope.message = "Wrong password";
            break;
          case "NO_USER_FOUND":
            $scope.message = "User not found";
            break;
          case "LOG_IN_WITH_FACEBOOK":
            $scope.message = "Log in with Facebook";
            break;
          case "EMAIL_NOT_FOUND":
            $scope.message = "E-mail could not be found.";
            break;
          case "PASSWORDS_DO_NOT_MATCH":
            $scope.message = "Passwords do not match!";
            break;

          default:
            $scope.message = "Login error. Try again...";
        }
      }

      $scope.$apply();
    };

    const mutateForgot = (forgotValue) => () => {
      $scope.forgot = forgotValue;
    };

    const checkUserName = (username) => {
      var pattern = new RegExp(/[~`!#@$%\^&*+=. \-\[\]\\';,/{}|\\":<>\?]/); //unacceptable chars

      if (pattern.test(username)) {
        return false;
      }

      return true; // good user input
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
        },
      });

      if (hasConfirmed) {
        await ProfileService.updateUser(
          userId,
          "addressBCH",
          bchAddress
        );
      }

      return;
    };

    $rootScope.login = async (data) => {
      $scope.isLoading = true;
      let authData;

      try {
        authData = await AuthService.login({
          email: data.loginemail,
          password: md5(data.loginpassword),
        });
      } catch (response) {
        $scope.isLoading = false;

        return displayErrorMessage(response.data.code, response.data.desc);
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
          await ProfileService.updateUser(
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

      $rootScope.user = authData.user;

      $state.go("vicigo.feeds");
    };

    $scope.changePassword = async (data: { loginpassword: string; loginpasswordreset: string }) => {
      if (data.loginpassword !== data.loginpasswordreset) {
        $scope.message = "Passwords do not match!";

        return;
      }

      $scope.isLoading = true;

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

      await AuthService.changePassword({
        code: $scope.resetCode,
        newPassword: md5(data.loginpassword),
        repeatNewPassword: md5(data.loginpasswordreset),
        mnemonicEncrypted: simpleWallet.mnemonicEncrypted
      });

      $scope.message = "Your password has been restarted and a new wallet has been generated. You can now log-in.";

      $scope.resetCode = undefined;
      $scope.data.loginemail = undefined;
      $scope.data.loginpassword = undefined;
      $scope.data.loginpasswordreset = undefined;
      $scope.forgot = false;
      $scope.isLoading = false;

      $scope.$apply();
    };

    $scope.resetPassword = (data) => {
      $scope.isLoading = true;

      AuthService.resetPassword({
        email: data.loginemail
      })
      .then(() => {
        $scope.message = "Check your e-mail inbox.";

        $scope.isLoading = false;
      }, (response) => {
        $scope.isLoading = false;

        return displayErrorMessage(response.data.code);
      });
    };

    $rootScope.signup = async (data) => {
      if (!data) {
        return alert("Username is required.");
      }

      if (!data.username) {
        return alert("Username is required.");
      }

      if (!checkUserName(data.username)) {
        $scope.message = "Username: please only use standard alphanumerics";

        return;	
      }

      if (data.username.length > 18) {
        $scope.message = "Username cannot have more than 18 characters";

        return;
      }

      if (data.username.length < 3) {
        $scope.message = "Username should be at least 3 characters";

        return;
      }

      if (!data.email) {
        $scope.message = "Email is required..";

        return;
      }

      if (!data.password) {
        $scope.message = "Password is required..";

        return;
      }

      if (data.password.length < 8) {
        $scope.message = "Password must have at least 8 characters.";

        return;
      }

      $scope.isLoading = true;

        AuthService.signup({
            username: data.username,
            password: md5(data.password),
            email: data.email,
            userType: 0
          })
          .then((user) => {
              const User = user;

              $scope.isLoading = false;

              // $rootScope.user = user.user;
    
              $state.go("starter.thankyou");
          }, response => {
            $scope.isLoading = false;

            return displayErrorMessage(response.data.code, response.data.desc);
          });
    };
  }
}

WelcomeCtrl.$inject = [
    "$rootScope", "$scope", "$location", "$state", "AuthService", "ProfileService"
];