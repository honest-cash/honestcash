import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { IGlobalScope } from "../../core/lib/interfaces";
import FeedService from "../../core/services/FeedService";
import HashtagService from "../../core/services/HashtagService";
import PostService from "../../core/services/PostService";
import ProfileService from "../../core/services/ProfileService";
import ScopeService from "../../core/services/ScopeService";

interface IScopeFeedsCtrl extends ng.IScope {
  isLoading: boolean;
  feeds: any[];
  page: number;
  limit: number;
  postsAvailable: boolean;
  hashtagFollowed: boolean;
  hashtag: string;
  feedType: "userfeed" | "top" | "new";
  feedScope: "last-month" | "all-time";
  sortType: "new";
  until: string;
  recommendedHashtags: any[];
  recommendedProfiles: any[];
  recommendedUsers: any[];
  hashtags: any[];

  fetchFeeds: () => void;
  loadMore: () => void;
}

export default class FeedsCtrl {
  public static $inject = [
    "$rootScope",
    "$scope",
    "$stateParams",
    "$location",
    "$timeout",
    "FeedService",
    "PostService",
    "HashtagService",
    "ProfileService",
    "ScopeService"
  ];

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopeFeedsCtrl,
    private $stateParams,
    private $location,
    private $timeout: ng.ITimeoutService,
    private feedService: FeedService,
    private postService: PostService,
    private hashtagService: HashtagService,
    private profileService: ProfileService,
    private scopeService: ScopeService
  ) {
    this.$scope.isLoading = true;
    this.$scope.feeds = [];
    this.$scope.page = 1;
    this.$scope.limit = 10;
    this.$scope.postsAvailable = true;
    this.$scope.hashtagFollowed = false;
    this.$scope.hashtag = $stateParams.hashtag;
    this.$scope.feedType = $stateParams.feedType || (this.$scope.hashtag ? $stateParams.feedType || "top" : "userfeed");
    this.$scope.feedScope = this.$scope.hashtag ? "all-time" : this.$location.search()['feedScope'] || "last-month";

    this.$scope.sortType = "new";
    this.$scope.recommendedHashtags = [];
    this.$scope.recommendedProfiles = [];

    this.hashtagService.getTopHashtags()
    .then((hashtags) => {
      this.$scope.hashtags = hashtags;

      this.scopeService.safeApply($scope, () => {});
    });

    if (this.$rootScope.user) {
      this.profileService.fetchRecommentedProfiles(this.$rootScope.user.id, {}, (users) => {
        this.$scope.recommendedUsers = users;

        this.scopeService.safeApply($scope);
        this.initTippy();
      });
    }

    this.$scope.fetchFeeds = () => this.fetchFeeds();
    this.$scope.loadMore = () => this.loadMore();

    this.fetchFeeds();


    this.$rootScope.$on('$locationChangeSuccess', (event) => {
      if(this.$location.search()['feedScope']) {
        this.$scope.feedScope = this.$location.search()['feedScope'];
        this.scopeService.safeApply($scope, () => {});
        this.fetchFeeds(true);
      }
    });

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
  }

  protected fetchFeeds(reload = false) {
    this.$scope.isLoading = true;

    const obj = {
      hashtag: this.$scope.hashtag,
      until: this.$scope.until,
      feedScope: undefined,
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

    if (this.$scope.feedType === "top" && this.$scope.feedScope === "last-month") {
      obj.feedScope = "last-month";
    }

    if (reload) {
      this.$scope.feeds = [];
    }

    const fetchFn = (obj, cb) => this.$scope.feedType === "userfeed" ?
      this.feedService.fetchFeeds(obj, cb) :
      this.postService.getPosts(obj, cb);

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
  }

  private async initTippy() {
    // Timeout is somehow required
    this.$timeout(() => {
      tippy(".user-follower-count");
    });
  }
}
