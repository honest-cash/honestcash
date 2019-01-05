import moment from "moment";

declare var QRCode: any;

export default class PostCtrl {
    constructor($rootScope, $scope, post, RelsService, PostService, scopeService) {
        $scope.postId = post.id;
        $scope.post = post;
        $scope.post.createdAt = moment(post.createdAt).format("MMM Do YY");
        $scope.post.publishedAt = moment(post.publishedAt).format("MMM Do YY");
        $scope.upvotes = [];
        $scope.post.userPosts && $scope.post.userPosts.forEach(userPost => {
            userPost.createdAt = moment(userPost.createdAt).format("MMM Do YY");
            userPost.publishedAt = moment(userPost.publishedAt).format("MMM Do YY");
        });

        const init = async () => {
            if (!$rootScope.user) {
                const container = document.getElementById("post-tipping-container");

                container.innerHTML = "";

                new QRCode(container, post.user.addressBCH);
            }

            const res = await PostService.getUpvotes(post.id);

            $scope.upvotes = res.data;

            scopeService.safeApply($scope, () => {});
        };

        init();
    }
}

PostCtrl.$inject = [
    "$rootScope",
    "$scope",
    "post",
    "RelsService",
    "PostService",
    "ScopeService"
];
