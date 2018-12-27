export default function ($http, API_URL) {
	/* private */ const addSocialMediaToProfile = (profile) => {
		const twitterProp = profile.userProperties.find(prop => prop.propKey === "twitter");
		const redditProp = profile.userProperties.find(prop => prop.propKey === "reddit");

		profile.twitter = twitterProp ? twitterProp.propValue : null;
		profile.reddit = redditProp ? redditProp.propValue : null;
		return profile;
	};

	const fetchProfile = (profileId, callback) => {
		$http.get(API_URL + "/user/" + profileId).then(function (response) {
			const profile = addSocialMediaToProfile(response.data);
			callback(profile);
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
			url: API_URL + "/user/" + profileId + "/recommended-profiles",
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

