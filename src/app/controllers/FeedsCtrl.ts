import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';

import HashtagService from "../../core/services/HashtagService";
import ScopeService from "../../core/services/ScopeService";

export default class FeedsCtrl {
  constructor(
    private $rootScope,
    private $scope,
    private $stateParams,
    private $location,
    private $http,
    private $timeout,
    private FeedService,
    private PostService,
    private hashtagService: HashtagService,
    private profileService,
    private scopeService: ScopeService,
  ) {
    this.$scope.isLoading = true;
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
      this.$scope.hashtags = hashtags;

      scopeService.safeApply($scope, () => {});
    });

    if (this.$rootScope.user) {
      this.profileService.fetchRecommentedProfiles(this.$rootScope.user.id, {}, (users) => {
        this.$scope.recommendedUsers = users;

        scopeService.safeApply($scope, () => {});
        this.initTippy();
      });
    }

		this.$scope.fetchFeeds = () => this.fetchFeeds();
    this.$scope.loadMore = () => this.loadMore();

    this.fetchFeeds();
  }

  protected loadMore() {
    if (!this.$rootScope.activeCalls && this.$scope.postsAvailable) {
      this.$scope.page = this.$scope.page + 1;

      this.fetchFeeds();
    }
  };

  protected fetchFeeds() {
    this.$scope.isLoading = true;

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

      this.$scope.isLoading = false;
    });
  };

  private async initTippy() {
    //Timeout is somehow required
    this.$timeout(() => {
      tippy('.user-follower-count');
    });
  }

  static $inject = [
    "$rootScope",
    "$scope",
    "$stateParams",
    "$location",
    "$http",
    "$timeout",
    "FeedService",
    "PostService",
    "HashtagService",
    "ProfileService",
    "ScopeService"
  ];
}
