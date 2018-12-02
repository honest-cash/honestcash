export default function($http) {
	var deleteComment = function(postId, commentId) {
		$http.delete("/post/" + postId + "/comments/" + commentId).then(function(response) {
		});
	};

	var getComments = function(postId, callback) {
		$http.get("/post/" + postId + "/comments").then(function(response) {
			callback(response.data);
		});
	};

	var postComment = function(postId, commentBody, callback) {
		if (!postId || !commentBody) {
			return
		}
		var comment = {
			postId: postId,
			body: commentBody,
		};
		$http.post("/post/" + postId + "/comments/", comment).then(function(response) {
			callback(response.data);
		});
	}

	return {
		postComment: postComment,
		getComments: getComments,
		deleteComment: deleteComment
	};
};