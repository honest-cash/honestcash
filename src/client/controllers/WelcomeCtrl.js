export default class WelcomeCtrl {
  constructor($rootScope, $scope, $location, $state, $http, ViciAuth) {
	$scope.message = "";
	$rootScope.noHeader = true;
	$scope.hashtags = [ "general", "crypto", "fiction", "art", "music", "science", "funny", "photos", "meta" ];
	$scope.isLoading = false;

	const displayErrorMessage = (code) => {
		if (code || $location.search().code) {
			switch (code || $location.search().code) {
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
				default:
					$scope.message = "Login error. Try again...";
			}
		}
	};
	
	displayErrorMessage();

	$rootScope.login = (data) => {
		ViciAuth.login({
			email: data.loginemail,
			password: data.loginpassword
		}).then((User) => {
			$rootScope.user = {
				id: User.userId
			};
			$state.go("vicigo.feeds");
		}, (response) => {
			$scope.isLoading = false;

			return displayErrorMessage(response.data.code);
		});
	};

	const checkUserName = (username) => {
		var pattern = new RegExp(/[~`!#@$%\^&*+=. \-\[\]\\';,/{}|\\":<>\?]/); //unacceptable chars

		if (pattern.test(username)) {
			return false;
		}

		return true; //good user input
	};

	const checkPassword = (password) => {
		if (password.length < 8) {
			return false;
		}

		return true; //good user input
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

		if (data.username.length > 16) {
			$scope.message = "Username cannot have more than 16 characters";

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

		if (!checkPassword(data.password)) {
			$scope.message = "Password should be at least 8 characters.";

			return;	
		}

		$scope.isLoading = true;

		ViciAuth.signup({
			username: data.username,
			password: data.password,
			email: data.email,
			userType: 0
		})
		.then((user) => {
			const User = user;

			$scope.isLoading = false;

			$rootScope.user = {
				id: User.userId
			};

			$state.go("starter.thankyou");
		}, response => {
			$scope.isLoading = false;

			return displayErrorMessage(response.data.code);
		});
	};
	/**
	$http.get("/api/hashtags/trending").then(function(response) {
		$scope.hashtags = response.data.map(function(item) {
			return item.hashtag
		});
	});
	 */
}}
