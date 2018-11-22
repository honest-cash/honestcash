export default class PostCtrl {
    constructor($rootScope, $scope, post, RelsService, CommentService) {
        $scope.postId = post.post_id;
        $scope.post = post;

        $scope.comments = [];

        $scope.follow = (profileId) => {
            if (!$rootScope.user.id) {
                return $("#loginModal").modal();
            }
            $scope.post.authorFollowed = true;
            RelsService.followProfile(profileId);
        };

        /**
            CommentService.getComments($scope.postId, function(rComments) {
                $scope.comments = rComments;
            });
        */

        $scope.postComment = (postId, body) => {
            $scope.commentDraft = "";
            CommentService.postComment(postId, body, function(rComment) {
                $scope.comments.unshift(rComment);
            });
        };

        $scope.deleteComment = (postId, commentId, commentIndex) => {
            $scope.comments.splice(commentIndex, 1);
            CommentService.deleteComment(postId, commentId);
        };

        $scope.openShareModal = (postId, commentId, commentIndex) => {
            bootbox.confirm("Are you sure?", (result) => {
                if (result) {
                    if (isDraft) $scope.drafts.splice($index, 1);
                    else $scope.feeds.splice($index, 1);
                    PostService.removePost(feed.id);
                }
            });
        };
    }
}

PostCtrl.$inject = [ "$rootScope", "$scope", "post", "RelsService", "CommentService" ];
