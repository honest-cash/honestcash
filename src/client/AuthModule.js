
export default () => {
    angular.module("ViciAuth", [])
	.run(function() {
		console.info("[ViciAuth] Launching Auth Module..");
	})
	.constant("API_URL", "localhost:3010")
	.constant("API", {
		SIGNUP: "/signup/email",
	})
	.factory("apiFactory", function(API_URL, API) {
		return function(method) {
			return API_URL + API[method];
		};
	})

.factory('facebookFactory', function($q) {
	return {
		
		login : function(callback){
			FB.getLoginStatus(function(response) {
				if(response.status == "connected"){
					callback(response.authResponse);
				} else {
				FB.login(function(response) {
    		if (response.authResponse) {
     			callback(response.authResponse);
				}else{
					callback();
				}
			});
				}
				
			});

		},
	}
})

.service("ViciAuth", function($rootScope,$window, $http, $q,facebookFactory,apiFactory) {

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

		function fbAuth(callback){
			console.info("[ViciAuth] Checking fb login status..");
			facebookFactory.login(function(fbAuth){
					
				var postBody = {
					token : fbAuth.accessToken,
					networkId : fbAuth.userID
				};

				if (!postBody.token) {
					return console.error("[ViciAuth] Initial FB Access Token");
				}
				
				if (!postBody.networkId) {
					return console.error("[ViciAuth] Initial FB User Id");
				}
				
					$http.post(apiFactory("FACEBOOK_TOKENS"), postBody)
					.then(function(res) {
						storeUserCredentials(res.data.token, res.data.userId);
						callback({userId : res.data.userId});
					}, function(data) {
						console.error(res.data);
					});
			});
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

		function login(id, pw) {
			console.info("[ViciAuth] Loggin in..");
			return $q(function(resolve, reject) {
				var body = {
					id: id,
					pw: pw,
				};
				$http.post(apiFactory("LOGIN"), body)
				.then(function(res) {
					storeUserCredentials(res.data.token, res.data.userId);
					resolve(res.data);
				}, function(data) {
					console.error(res.data);
					reject(res.data);
				});
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

	  var getAuthToken = function(){
			console.log("[ViciAuth] Getting Auth Token");
			return authToken;
		}
	
		return {
			fbAuth:fbAuth,
			authUserId: authUserId,
			validate: validate,
			login: login,
			signup: signup,
			logout: logout,
			getAuthToken : getAuthToken,
			isAuthenticated: isAuthenticated,
			loadUserCredentials: loadUserCredentials
		};

	})
	.run(function(ViciAuth, $rootScope) {
		ViciAuth.loadUserCredentials();
	});
};
