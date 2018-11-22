export default () => {
    angular.module("ViciAuth", [])
	.run(function() {
		console.info("[ViciAuth] Launching Auth Module..");
	})
	.constant("API_URL", "localhost:3010")
	.constant("API", {
		LOGIN: "/login",
		SIGNUP: "/signup/email",
		VALIDATE: "/me",
		LOGOUT: "/logout",
		RESET: "/auth/request-password-reset",
		CHANGE_PASSWORD: "/auth/reset-password"
	})
	.factory("apiFactory", ["API_URL", "API", function(API_URL, API) {
		return (method) => {
			return API_URL + API[method];
		};
	}])

.service("ViciAuth", [ "$window", "$http", "$q", "apiFactory", function($window, $http, $q, apiFactory) {
		var LOCAL_TOKEN_KEY = 'AdminDashAuthToken';
		var LOCAL_USER_ID_KEY = 'AdminDashUserId';
		var username = '';
		var isAuthenticated = false;
		var role = '';
		var authToken;
		var authUserId;


		function useCredentials(token, userId) {
			console.info("[ViciAuth] Using User Credentials..");
			isAuthenticated = true;
			authToken = token;
			authUserId = userId;
			$http.defaults.headers.common['X-Auth-Token'] = token;
		}

		function loadUserCredentials() {
			console.info("[ViciAuth] Loading User Credentials..");
			var token = $window.localStorage.getItem(LOCAL_TOKEN_KEY);
			var userId = $window.localStorage.getItem(LOCAL_USER_ID_KEY);
			if (token) {
				useCredentials(token, userId);
			}
			
		}

		function storeUserCredentials(token, userId) {
			console.info("[ViciAuth] Storing User Credentials..");
			$window.localStorage.setItem(LOCAL_USER_ID_KEY, userId);
			$window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
			useCredentials(token, userId);
		}

		function destroyUserCredentials() {
			console.info("[ViciAuth] Destroying User Credentials..");
			authToken = undefined;
			authUserId = undefined;
			isAuthenticated = false;
			$http.defaults.headers.common['X-Auth-Token'] = undefined;
			$window.localStorage.removeItem(LOCAL_TOKEN_KEY);
			$window.localStorage.removeItem(LOCAL_USER_ID_KEY);
		}

		function login({ email, password }) {
			console.info("[ViciAuth] Loggin in..");
			return $q((resolve, reject) => {
				var body = {
					email,
					password
				};

				$http.post(apiFactory("LOGIN"), body)
				.then((res) => {
					storeUserCredentials(res.data.token, res.data.userId);

					resolve(res.data);
				}, reject);
			});
		}

		function signup(data) {
			return $q(async (resolve, reject) => {
				console.info("[ViciAuth] Signing Up..");

				const body = {
					username: data.username,
					password: data.password,
					email: data.email
				};

				$http.post(apiFactory("SIGNUP"), body)
				.then(response => {
					storeUserCredentials(response.data.token, response.data.userId);

					resolve(response.data);
				}, reject);
			});
		}

		function validate(callback) {
			console.info("[ViciAuth] Checking token ..");
			$http.get(apiFactory("VALIDATE")).then(function(response) {
				callback(response.data);
			});
		}

		function logout() {
			console.info("[ViciAuth] Bye Bye..");

			$http.post(apiFactory("LOGOUT")).then(function(data) {
				destroyUserCredentials();
			});
		}

		function resetPassword({ email }) {
			console.info("[ViciAuth] Requesting new password.");

			return $http.post(apiFactory("RESET"), { email });
		}

		function changePassword({ code, newPassword, repeatNewPassword }) {
			console.info("[ViciAuth] Resetting password.");

			return $http.post(apiFactory("CHANGE_PASSWORD"), { code, newPassword, repeatNewPassword });
		}
		
	  	var getAuthToken = () => {
			console.log("[ViciAuth] Getting Auth Token");

			return authToken;
		}
	
		return {
			authUserId: authUserId,
			validate: validate,
			login: login,
			signup: signup,
			logout: logout,
			getAuthToken : getAuthToken,
			isAuthenticated: isAuthenticated,
			resetPassword,
			changePassword,
			loadUserCredentials: loadUserCredentials
		};
	}])
	.run([ "ViciAuth", function(ViciAuth) {
		ViciAuth.loadUserCredentials();
	}]);
};
