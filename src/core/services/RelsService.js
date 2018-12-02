export default function($http, API_URL) {
	var followProfile = function(profileId) {
		$http.post(API_URL + "/user/" + profileId + "/follow/").then(function(response) {
			
		});
	};
	var unfollowProfile = function(profileId) {
		$http.post(API_URL + "/user/" + profileId + "/unfollow/").then(function(response) {
			
		});
	};

	var showFollowers = function(profileId, callback) {
		$http.get(API_URL + "/user/" + profileId + "/followers").then(function(response) {
			
			callback(response.data);
		});
	};

	var showFollowing = function(profileId, callback) {
		$http.get(API_URL + "/user/" + profileId + "/following").then(function(response) {
			
			callback(response.data);
		});
	};

	var followHashtag = function(hashtag) {
		$http.get(API_URL + "/api/hashtag/" + hashtag + "/follow").then(function(response) {
			
		});
	};

	var unfollowHashtag = function(hashtag) {
		$http.get(API_URL + "/api/hashtag/" + hashtag + "/unfollow").then(function(response) {
			
		});
	};

	var showFollowedHashtags = function(profileId, callback) {
		$http.get(API_URL + "/api/profile/" + profileId + "/hashtags/following").then(function(response) {
			
			callback(response.data)
		});
	};

	return {
		followHashtag: followHashtag,
		unfollowHashtag: unfollowHashtag,
		followProfile: followProfile,
		unfollowProfile: unfollowProfile,
		showFollowing: showFollowing,
		showFollowers: showFollowers,
		showFollowedHashtags: showFollowedHashtags,
	};
};