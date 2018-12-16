export default function ($http, API_URL) {
	const fetchProfile = (profileId, callback) => {
		$http.get(API_URL + "/user/" + profileId).then(function (response) {
			callback(response.data);
		});
	};

	const fetchProfileStatus = function (query, callback) {
		$http({
			url: API_URL + "/user/status",
			method: "GET",
			params: {

			}
		}).then(function (response) {
			callback(response.data);
		});
	};

	const fetchRecommentedProfiles = function (profileId, params, callback) {
		$http({
			url: API_URL + "/user/" + profileId + "/recommented/accounts",
			method: "GET",
			params: params
		}).then(function (response) {
			callback(response.data);
		});
	};

  const updateUser = (userId, fieldName, fieldValue) => {
    const data = {};

    data[fieldName] = fieldValue;

    return $http.put(`${API_URL}/user/${userId}`, data);
  };

	const updateUserProp = function (userId, propKey, propValue, callback) {
		const props = {}; 

		props[propKey] = propValue; 

		$http({
			url: API_URL + "/user/" + userId,
			method: "PUT",
			params: {
				props
			}
		}).then((response) => {
			callback(response.data);
		});
	};

	return {
    updateUser,
		fetchProfileStatus: fetchProfileStatus,
		fetchProfile: fetchProfile,
		fetchRecommentedProfiles: fetchRecommentedProfiles,
		updateUserProp:updateUserProp
	};
};

