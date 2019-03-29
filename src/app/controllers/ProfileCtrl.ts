import FeedService from "../../core/services/FeedService";
import PostService from "../../core/services/PostService";
import ScopeService from "../../core/services/ScopeService";
import ProfileService from "../../core/services/ProfileService";

export default class ProfileCtrl {
  public static $inject = [
    "$rootScope",
    "$state",
    "$scope",
    "$location",
    "FeedService",
    "RelsService",
    "PostService",
    "ScopeService",
    "ProfileService",
    "profile"
  ];

  public profileId: string = this.profile.id;
  public page: number = 1;
  public premiumPage: number = 1;
  public feeds: any[] = [];
  public premiumFeeds: any[] = [];
  public postsAll: any[] = [];
  public followGuys: any[] = [];
  public showProfileTab: "feeds" | "premiumPosts" | "following" | "followers" | "responses" = "feeds";
  public limit: number = 10;
  public postsAvailable: boolean = true;
  public isLoading: boolean = true;
  public isLoadingFeeds: boolean = true;
  public followsProfileAlready: boolean = false;
  public hasPremiumPosts: boolean = false;

  constructor(
    private $rootScope,
    private $state,
    private $scope,
    private $location,
    private feedService: FeedService,
    private RelsService,
    private postService: PostService,
    private scopeService: ScopeService,
    private profileService: ProfileService,
    private profile
  ) {
    this.checkIfUserHasPremiumPosts();
    this.fetchFeeds({});
  }

  public fetchFeeds(params) {
    this.isLoadingFeeds = true;
    params = params ? params : {};

    this.showProfileTab = "feeds";

    this.postService.getPosts({
      includeResponses: true,
      status: "published",
      orderBy: "publishedAt",
      page: params.page ? params.page : this.page,
      userId: this.profile.id
    }, data => {
      if (!data) {
        return;
      }

      if (params.page === 0) {
        this.postsAll = data;
      } else {
        data.forEach((feed) => {
          this.postsAll.push(feed);
        });
      }

      if (data.length < this.limit) {
        this.postsAvailable = false;
      } else {
        this.postsAvailable = true;
      }

      this.isLoadingFeeds = false;

      this.feeds = this.postsAll.filter(_ => this.showProfileTab === "feeds" ? !_.parentPostId : _.parentPostId);
    });
  }

  public checkIfUserHasPremiumPosts() {
    this.profileService.checkIfHasPremiumPosts(this.profile.id, (has) => {
      this.hasPremiumPosts = has;
      this.isLoading = false;
    });
  }

  public showFeeds() {
    this.showProfileTab = "feeds";

    this.feeds = this.postsAll.filter(_ => !_.parentPostId);

    this.scopeService.safeApply(this.$scope, () => { });
  }

  public showPremiumPosts() {
    this.showProfileTab = "premiumPosts";

    this.postService.getPosts({
      includeResponses: false,
      status: "locked",
      orderBy: "publishedAt",
      page: this.premiumPage,
      userId: this.profile.id
    }, data => {
      if (!data) {
        return;
      }

      if (this.premiumPage === 0) {
        this.premiumFeeds = data;
      } else {
        data.forEach((feed) => {
          this.premiumFeeds.push(feed);
        });
      }

      if (data.length < this.limit) {
        this.postsAvailable = false;
      } else {
        this.postsAvailable = true;
      }

      this.isLoadingFeeds = false;

      this.feeds = this.premiumFeeds;
      this.scopeService.safeApply(this.$scope, () => { });
    });

  }

  public showResponses(): void {
    this.showProfileTab = "responses";

    this.feeds = this.postsAll.filter(_ => _.parentPostId);

    this.scopeService.safeApply(this.$scope, () => { });
  }

  public showFollowers = () => {
    this.followGuys = [];

    this.showProfileTab = "followers";

    this.RelsService.showFollowers(this.profile.id, (rFollowers) => {
      this.followGuys = rFollowers;
    });
  }

  public showFollowing = () => {
    this.followGuys = [];

    this.showProfileTab = "following";

    this.RelsService.showFollowing(this.profile.id, (rFollowing) => {
      this.followGuys = rFollowing;
    });
  }

  public loadMore(): void {
    console.log("load more triggerred");

    if (!this.$rootScope.activeCalls && this.postsAvailable) {
      if (this.showProfileTab === "premiumPosts") {
        this.premiumPage = this.premiumPage + 1;
        this.showPremiumPosts();
      } else {
        this.page = this.page + 1;
        this.fetchFeeds({
          page: this.page
        });
      }
    }
  }
}
