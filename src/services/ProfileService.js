export default function($http, API_URL) {
	const fetchProfile = (profileId, callback) => {
		$http.get(API_URL + "/user/" + profileId).then(function(response) {
			callback(response.data);
		});
	};

	const fetchProfileStatus = function(query, callback) {
		$http({
			url: API_URL + "/user/status",
			method: "GET",
			params: {

			}
		}).then(function(response) {
			callback(response.data);
		});
	};

	const fetchRecommentedProfiles = function(profileId,params,callback) {
		$http({
			url: API_URL + "/user/" + profileId + "/recommented/accounts",
			method: "GET",
			params: params
		}).then(function(response) {
			callback(response.data);
		});
	};

	const updateUserProp = function(userId, propKey, propValue, callback) {
		const props = {};

		props[propKey] = propsValue;

		$http({
			url: API_URL + "/user/" + userId + "/",
			method: "PUT",
			params: {
				props
			}
		}).then((response) => {
			callback(response.data);
		});
	};

	return {
		fetchProfileStatus: fetchProfileStatus,
		fetchProfile: fetchProfile,
		fetchRecommentedProfiles : fetchRecommentedProfiles
	};
};

