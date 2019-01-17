import HashtagService from "../../core/services/HashtagService";
import ScopeService from "../../core/services/ScopeService";
import FeedService from '../../core/services/FeedService';
import PostService from '../../core/services/PostService';

export default class FeedsCtrl {
  constructor(
    private $rootScope,
    private $scope,
    private $stateParams,
    private $location,
    private $http,
    private feedService: FeedService,
    private postService: PostService,
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

  protected loadMore() {
    if (!this.$rootScope.activeCalls && this.$scope.postsAvailable) {
      if (this.$scope.feedType === "userfeed") {
        this.$scope.until = this.$scope.feeds[this.$scope.feeds.length - 1].publishedAt;
      } else {
        this.$scope.page = this.$scope.page + 1;
      }

      this.fetchFeeds();
    }
  };

  protected fetchFeeds() {
    this.$scope.isLoading = true;

    const obj = {
      hashtag: this.$scope.hashtag,
      until: this.$scope.until,
      page: this.$scope.page,
      followerId: undefined,
      orderBy: undefined,
      includeResponses: undefined
    };

    if (this.$scope.feedType === "userfeed") {
      obj.followerId = this.$rootScope.user ? this.$rootScope.user.id : undefined;
    }

    if (this.$scope.feedType === "top") {
      obj.orderBy = "upvoteCount";
    }

    const fetchFn = (obj, cb) => this.$scope.feedType === "userfeed" ? this.feedService.fetchFeeds(obj, cb) : this.postService.getPosts(obj, cb);

    fetchFn(obj, (data) => {
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
