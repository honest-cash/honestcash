
angular.module("vqAuth", [])

.constant("API_URL", "localhost:3010")

.factory('AuthInterceptor', [ "$rootScope", "$q", function($rootScope, $q) {
	if ($rootScope.activeCalls == undefined) {
		$rootScope.activeCalls = 0;
	}

	return {
		request: (config) => {
			$rootScope.activeCalls += 1;

			return config;
		},
		requestError: (rejection) => {
			$rootScope.activeCalls -= 1;

			return $q.reject(rejection);
		},
		response: (response) => {
			$rootScope.activeCalls -= 1;

			return response;
		},
		responseError: (response) => {
			$rootScope.activeCalls -= 1;

			if (response.status == 401) {
				$rootScope.$broadcast("notAuthenticated");
			}

			return $q.reject(response);
		}
	};
}])

.constant("API", {
	LOGIN: "/login",
	SIGNUP: "/signup/email",
	VALIDATE: "/me",
	LOGOUT: "/logout",
	RESET: "/auth/request-password-reset",
  CHANGE_PASSWORD: "/auth/reset-password",
  SET_PASSWORD: "/auth/change-password"
})

.factory("apiFactory", ["API_URL", "API", function(API_URL, API) {
	return (method) => {
		return API_URL + API[method];
	};
}])

.service("AuthService", [ "$window", "$http", "$q", "apiFactory", function($window, $http, $q, apiFactory) {
	var LOCAL_TOKEN_KEY = 'HC_USER_TOKEN';
	var LOCAL_USER_ID_KEY = 'HC_USER_ID';
	var LOCAL_USER = 'HC_CASH_USER';

	var username = '';
	var isAuthenticated = false;
	var role = '';
	var authToken;
	var authUserId;

	function useCredentials(token, userId) {
		console.info("[AuthService] Using User Credentials..");
		isAuthenticated = true;
		authToken = token;
		authUserId = userId;
		$http.defaults.headers.common['X-Auth-Token'] = token;
	}

	function loadUserCredentials() {
		console.info("[AuthService] Loading User Credentials..");
		var token = $window.localStorage.getItem(LOCAL_TOKEN_KEY);
		var userId = $window.localStorage.getItem(LOCAL_USER_ID_KEY);
		if (token) {
			useCredentials(token, userId);
		}
		
	}

	function storeUserCredentials(token, userId) {
		console.info("[AuthService] Storing User Credentials..");
		$window.localStorage.setItem(LOCAL_USER_ID_KEY, userId);
		$window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
		useCredentials(token, userId);
	}

	function destroyUserCredentials() {
		console.info("[AuthService] Destroying User Credentials..");
		authToken = undefined;
		authUserId = undefined;
		isAuthenticated = false;
		$http.defaults.headers.common['X-Auth-Token'] = undefined;
		$window.localStorage.removeItem(LOCAL_TOKEN_KEY);
		$window.localStorage.removeItem(LOCAL_USER_ID_KEY);
	}

	function login({ email, password }) {
		console.info("[AuthService] Loggin in..");
		return $q((resolve, reject) => {
			var body = {
				email,
				password
			};

			$http.post(apiFactory("LOGIN"), body)
			.then((res) => {
				storeUserCredentials(res.data.token, res.data.user.id);

				resolve(res.data);
			}, reject);
		});
	}

	function signup(data) {
		return $q(async (resolve, reject) => {
			console.info("[AuthService] Signing Up..");

			const body = {
				username: data.username,
				password: data.password,
				email: data.email
			};

			$http.post(apiFactory("SIGNUP"), body)
			.then(response => {
				storeUserCredentials(response.data.token, response.data.user.id);

				resolve(response.data);
			}, reject);
		});
	}

	function validate(callback) {
		return $http.get(apiFactory("VALIDATE"))
	}

	const logout = () => {
		console.info("[AuthService] Bye Bye..");

		destroyUserCredentials();

		$http.post(apiFactory("LOGOUT")).then((data) => {
			console.log("Tokens destroyed.")
		});
	};

	function resetPassword({ email }) {
		console.info("[AuthService] Requesting new password.");

		return $http.post(apiFactory("RESET"), { email });
	}

	function changePassword({ code, newPassword, repeatNewPassword }) {
		console.info("[AuthService] Resetting password.");

		return $http.post(apiFactory("CHANGE_PASSWORD"), { code, newPassword, repeatNewPassword });
	}
  
  
  function setPassword({ password }) {
		console.info("[AuthService] Resetting password.");

		return $http.post(apiFactory("SET_PASSWORD"), { password });
	}

	var getAuthToken = () => {
		console.log("[AuthService] Getting Auth Token");

		return authToken;
	}

	return {
		getUserId: () => authUserId,
		authUserId: authUserId,
		validate: validate,
		login: login,
		signup: signup,
		logout,
		getAuthToken : getAuthToken,
		isAuthenticated: isAuthenticated,
    resetPassword,
    setPassword,
		changePassword,
		loadUserCredentials: loadUserCredentials
	};
}])
.run([ "AuthService", function(AuthService) {
	AuthService.loadUserCredentials();
}]);
