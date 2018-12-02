export default class PostService {
    constructor ($http, $sce, API_URL) {
        const removePost = function(postId) {
            return $http.delete(API_URL + "/post/" + postId);
        };

        const getById = function(postId, callback) {
            return $http.get(API_URL + "/post/" + postId).then(function(response) {
                callback(response.data);
            });
        };

        const getByAlias = (username, alias, callback) => {
            return $http.get(API_URL + "/post/" + username + "/" + alias).then(function(response) {
                callback(response.data);
            });
        };

        const displayHTML = function(html) {
            return $sce.trustAsHtml(html);
        };

        const publishPic = function(postId, params, callback) {
            $http.put(API_URL + "/post/image/publish", {
                postId: postId,
                tags: params.hashtags
            }).then(function(response) {
                callback(response.data);
            });
        };

        const upvote = (upvote) => {
            return $http.post(API_URL + "/post/" + upvote.postId + "/upvote", {
                txId: upvote.txId,
                postId: upvote.postId
            })
        };

        const downvote = function(postId) {
            $http.post(API_URL + "/post/" + postId + "/downvote").then(function(response) {
                
            });
        };

        const getUpvotes = function(postId, callback) {
            $http.get(API_URL + "/post/" + postId + "/upvotes").then(function(response) {
                callback(response.data);
            });
        };

        const getViews = function(postId, callback) {
            $http.get(API_URL + "/post/" + postId + "/views").then(function(response) {
                callback(response.data);
            });
        };

	this.getViews = getViews;
	this.getUpvotes = getUpvotes;
	this.publishPic = publishPic;
	this.getById = getById;
	this.getByAlias = getByAlias;
	this.removePost = removePost;
	this.upvote = upvote;
    this.displayHTML = displayHTML;
    }
}

PostService.$inject = [
    "$http", "$sce", "API_URL"
];
