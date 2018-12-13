import md5 from "md5";
import generatePassword from "../lib/bitcoinAuthFlow";
import * as simpleWalletProvider from "../lib/simpleWalletProvider";

export default class WelcomeCtrl {
  constructor($rootScope, $scope, $location, $state, AuthService) {
    $scope.message = "";
    $rootScope.noHeader = true;
    $scope.isLoading = false;
    $scope.forgot = false;
    $scope.resetCode = $location.search().code;

    const displayErrorMessage = (code, desc) => {
      if (desc) {
        return $scope.message = desc;
      }

      if (code) {
        switch (code) {
          case "NOT_ACTIVATED":
            $scope.message = "The access the the platform is currently limited. Your account has not been activated. Tweet us at @Honest_Cash for a personal invitation.";
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
    };

    displayErrorMessage();

    const mutateForgot = (forgotValue) => () => {
      $scope.forgot = forgotValue;
    };

    const checkUserName = (username) => {
      var pattern = new RegExp(/[~`!#@$%\^&*+=. \-\[\]\\';,/{}|\\":<>\?]/); //unacceptable chars

      if (pattern.test(username)) {
        return false;
      }

      return true; //good user input
    };

    $scope.goToForgotPage = mutateForgot(true);
    $scope.goToLoginPage = mutateForgot(false);

    $rootScope.login = (data) => {
      $scope.isLoading = true;

      AuthService.login({
        email: data.loginemail,
        password: md5(data.loginpassword),
      }).then((User) => {
        $scope.isLoading = false;

        $rootScope.user = User.user;

        simpleWalletProvider.initWallet(data.loginpassword);

        $state.go("vicigo.feeds");
      }, (response) => {
        $scope.isLoading = false;

        return displayErrorMessage(response.data.code, response.data.desc);
      });
    };

    const changePassword = () => {
      $scope.isLoading = true;

      generatePassword(null, (newPassword) => {
        AuthService.changePassword({
          code: $scope.resetCode,
          newPassword: newPassword,
          repeatNewPassword: newPassword,
        })
        .then(() => {
          $scope.message = "Your password has been restarted. You can now log-in.";
    
          $scope.resetCode = undefined;
          $scope.data.loginemail = undefined;
          $scope.data.loginpassword = undefined;
          $scope.data.loginpasswordreset = undefined;
          $scope.forgot = false;
          $scope.isLoading = false;
        }, () => {
          swal("Your link is invalid!")
          .then(() => {
            location.href="/login";
          });
        });
      });
    };

    if ($scope.resetCode) {
      changePassword();
    }

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

      $scope.isLoading = true;

      generatePassword(null, (password, mnemonic) => {
        AuthService.signup({
            username: data.username,
            password,
            email: data.email,
            userType: 0
          })
          .then((user) => {
              const User = user;

              $scope.isLoading = false;

              simpleWalletProvider.initWallet(mnemonic);

              // $rootScope.user = user.user;
    
              $state.go("starter.thankyou");
          }, response => {
            $scope.isLoading = false;

            return displayErrorMessage(response.data.code, response.data.desc);
          });
        });
    };
  }
}

WelcomeCtrl.$inject = [
    "$rootScope", "$scope", "$location", "$state", "AuthService"
];