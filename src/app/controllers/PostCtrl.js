import moment from "moment";
export default class PostCtrl {
    constructor($rootScope, $scope, post, RelsService) {
        $scope.postId = post.post_id;
        $scope.post = post;
        $scope.post.createdAt = moment(post.createdAt).format("MMM Do YY");

        $scope.post.userPosts && $scope.post.userPosts.forEach(userPost => {
            userPost.createdAt = moment(userPost.createdAt).format("MMM Do YY");
        });

        const init = () => {
            if (!$rootScope.simpleWallet) {
                const container = document.getElementById("post-tipping-container");

                container.innerHTML = "";

                new QRCode(container, post.user.addressBCH);

                document.getElementById("userBCHAddress").value = post.user.addressBCH;
            }
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

        init();
    }
}

PostCtrl.$inject = [
    "$rootScope",
    "$scope",
    "post",
    "RelsService"
];
