import PostService from "../../core/services/PostService";
import ScopeService from "../../core/services/ScopeService";
import RelsService from "../../core/services/RelsService";

export default class ProfileCtrl {
  public static $inject = [
    "$rootScope",
    "$scope",
    "relsService",
    "postService",
    "scopeService",
    "profile",
  ];

  public profileId: string = this.profile.id;
  public page: number = 1;
  public feeds: any[] = [];
  public postsAll: any[] = [];
  public followGuys: any[] = [];
  public showProfileTab: "feeds" | "following" | "followers" | "responses" = "feeds";
  public limit: number = 10;
  public postsAvailable: boolean = true;
  public isLoading: boolean = true;
  public followsProfileAlready: boolean = false;
  public following = [];

  constructor(
      private $rootScope,
      private $scope,
      private relsService: RelsService,
      private postService: PostService,
      private scopeService: ScopeService,
      private profile,
    ) {
    this.fetchFeeds({});

    if (this.$rootScope.user) {
      this.relsService.showFollowing(this.$rootScope.user.id, (following) => {
        this.following = following.map(followingPerson => followingPerson.id);
        this.scopeService.safeApply(this.$scope, () => {});
      });
    }
  }

  public fetchFeeds(params) {
    this.isLoading = true;
    params = params ? params : {};

    this.showProfileTab = "feeds";

    this.postService.getPosts({
      includeResponses: true,
      status: "published",
      orderBy: "publishedAt",
      page: params.page ? params.page : this.page,
      userId: this.profile.id,
    },
                              (data) => {
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

      this.isLoading = false;

      this.feeds = this.postsAll.filter(_ => this.showProfileTab === "feeds" ?
        !_.parentPostId :
        _.parentPostId,
      );
    });
  }

  public showFeeds() {
    this.showProfileTab = "feeds";

    this.feeds = this.postsAll.filter(_ => !_.parentPostId);

    this.scopeService.safeApply(this.$scope, () => {});
  }

  public showResponses(): void {
    this.showProfileTab = "responses";

    this.feeds = this.postsAll.filter(_ => _.parentPostId);

    this.scopeService.safeApply(this.$scope, () => {});
  }

  public showFollowers = () => {
    this.followGuys = [];

    this.showProfileTab = "followers";

    this.relsService.showFollowers(this.profile.id, (rFollowers) => {
      this.followGuys = rFollowers;
    });
  }

  public showFollowing = () => {
    this.followGuys = [];

    this.showProfileTab = "following";

    this.relsService.showFollowing(this.profile.id, (rFollowing) => {
      this.followGuys = rFollowing;
    });
  }

  public loadMore(): void {
    console.log("load more triggerred");

    if (!this.$rootScope.activeCalls && this.postsAvailable) {
      this.page = this.page + 1;
      this.fetchFeeds({
        page: this.page,
      });
    }
  }
}
