
import sweetalert from "sweetalert";
import tippyJs from "tippy.js";
import "tippy.js/dist/tippy.css";
import toastr from "../../core/config/toastr";
import { IGlobalScope } from "../../core/lib/interfaces";
import { Post } from "../../core/models/models";
import PostService from "../../core/services/PostService";
import ScopeService from "../../core/services/ScopeService";

enum TabStatus {
  drafts = "drafts",
  published = "published",
}

interface IScopePostsCtrl extends ng.IScope {
  isLoading: boolean;
  isLoadingMore: boolean;
  isDeleting: boolean;
  posts: Post[];
  page: number;
  limit: number;
  postsAvailable: boolean;
  currentTab: TabStatus;
  this: any;

  fetchPosts: () => void;
  loadMore: () => void;
  switchTab: (tab: TabStatus) => void;
  displayPostBody: (html: string) => string;
  deletePost: (id: number) => void;
}

export default class PostsCtrl {
  public static $inject = [
    "$rootScope", "$scope", "$timeout", "PostService", "ScopeService",
  ];

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopePostsCtrl,
    private $timeout: ng.ITimeoutService,
    private postService: PostService,
    private scopeService: ScopeService,
  ) {
    this.$scope.isLoading = true;
    this.$scope.isLoadingMore = false;
    this.$scope.isDeleting = false;
    this.$scope.posts = [];
    this.$scope.page = 1;
    this.$scope.limit = 20;
    this.$scope.postsAvailable = true;
    this.$scope.currentTab = TabStatus.published;
    this.$scope.switchTab = (tab: TabStatus) => this.switchTab(tab);
    this.$scope.displayPostBody = (html: string) => this.displayPostBody(html);
    this.$scope.loadMore = () => this.loadMore();

    this.fetchPosts();
  }

  public loadMore() {
    if (!this.$rootScope.activeCalls && this.$scope.postsAvailable) {
      this.$scope.page += 1;
      this.$scope.isLoadingMore = true;
      this.fetchPosts();
    }
  }

  public fetchPosts() {
    this.$scope.isLoading = this.$scope.isLoadingMore ? false : true;

    this.postService.getPosts(
      {
        includeResponses: false,
        orderBy: "publishedAt",
        page: this.$scope.page,
        status: "published",
        userId: this.$rootScope.user.id,
      },
      (data) => {
        if (!data) {
          return;
        }

        if (this.$scope.page === 0) {
          this.$scope.posts = data;
        } else {
          data.forEach((post) => {
            this.$scope.posts.push(post);
          });
        }

        if (data.length < this.$scope.limit) {
          this.$scope.postsAvailable = false;
        } else {
          this.$scope.postsAvailable = true;
        }

        this.$scope.isLoading = this.$scope.isLoadingMore ? false : false;
        this.$scope.isLoadingMore = false;

        this.scopeService.safeApply(this.$scope, () => {});

        this.initTippy();
      },
    );
  }

  public switchTab(tab: TabStatus) {
    this.$scope.currentTab = tab;
  }

  public displayPostBody(html: string): string {
    let truncatedHtml = html;
    if (truncatedHtml.length > 400) {
      truncatedHtml = `${truncatedHtml.substring(0, 400)}...`;
    }

    return this.postService.displayHTML(truncatedHtml);
  }

  private async initTippy() {
    // Timeout is somehow required
    this.$timeout(() => {
      tippyJs(".hc-tooltip");
    });
  }
}
