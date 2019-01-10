import HashtagService from "../../core/services/HashtagService";
import ScopeService from "../../core/services/ScopeService";
import { client as clientURL } from "../../core/config/index";

export default class FeedsCtrl {
  constructor(
    private $rootScope,
    private $scope,
    private $stateParams,
    private $location,
    private $http,
    private FeedService,
    private PostService,
    private hashtagService: HashtagService,
    private profileService,
    private scopeService: ScopeService,
  ) {
    this.$rootScope.isLoading = true;
		this.$scope.feeds = [];
		this.$scope.page = 1;
		this.$scope.limit = 10;
		this.$scope.postsAvailable = true;
		this.$scope.hashtagFollowed = false;
    this.$scope.hashtag = $stateParams.hashtag;
    this.$scope.feedType = $stateParams.feedType || (this.$scope.hashtag ? $stateParams.feedType || "top" : "userfeed") as "userfeed" | "top" | "new";

		this.$scope.sortType = "new";
		this.$scope.recommendedHashtags = [];
		this.$scope.recommendedProfiles = [];

    this.hashtagService.getTopHashtags()
    .then(hashtags => {
      $scope.hashtags = hashtags;

      scopeService.safeApply($scope, () => {});
    });

    if ($rootScope.user) {
      profileService.fetchRecommentedProfiles($rootScope.user.id, {}, (users) => {
        $scope.recommendedUsers = users;

        scopeService.safeApply($scope, () => {});
      });
    }

		this.$scope.fetchFeeds = () => this.fetchFeeds();
    this.$scope.loadMore = () => this.loadMore();

    this.fetchFeeds();
  }

  protected getFeedShareURLs(feed) {
    return {
      reddit: `https://reddit.com/submit?url=${clientURL}/${feed.user.username}/${feed.alias}&title=${feed.title}`,
      twitter: `https://twitter.com/intent/tweet?url=${clientURL}/${feed.user.username}/${feed.alias}&text=${feed.title}&via=honest_cash&hashtags=${feed.userPostHashtags.map(h => h.hashtag).join(',')}`
    }
  }

  protected loadMore() {
    if (!this.$rootScope.activeCalls && this.$scope.postsAvailable) {
      this.$scope.page = this.$scope.page + 1;

      this.fetchFeeds();
    }
  };

  protected fetchFeeds() {
    const obj = {
      page: this.$scope.page,
      hashtag: this.$scope.hashtag,
      followerId: undefined,
      orderBy: undefined
    };

    if (this.$scope.feedType === "userfeed") {
      obj.followerId = this.$rootScope.user ? this.$rootScope.user.id : undefined;
    }

    if (this.$scope.feedType === "top") {
      obj.orderBy = "upvoteCount";
    }

    this.FeedService.fetchFeeds(obj, (data) => {
      if (data) {
        data.forEach((feed) => {
          feed.shareURLs = this.getFeedShareURLs(feed);
          this.$scope.feeds.push(feed);
        });

        if (data.length < this.$scope.limit) {
          this.$scope.postsAvailable = false;
        } else {
          this.$scope.postsAvailable = true;
        }
      } else {
        this.$scope.postsAvailable = false;
      }

      this.$rootScope.isLoading = false;
    });
  };

  static $inject = [
    "$rootScope",
    "$scope",
    "$stateParams",
    "$location",
    "$http",
    "FeedService",
    "PostService",
    "HashtagService",
    "ProfileService",
    "ScopeService"
  ];
}
