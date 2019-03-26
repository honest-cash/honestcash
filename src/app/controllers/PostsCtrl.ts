
import swal from "sweetalert";
import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';
import toastr from "../../core/config/toastr";
import { IGlobalScope } from "../../core/lib/interfaces";
import { Post } from "../../core/models/models";
import PostService from "../../core/services/PostService";
import ScopeService from "../../core/services/ScopeService";

enum TabStatus {
  drafts = "drafts",
  published = "published",
  archived = "archived"
}

enum SubTabStatus {
  posts = "posts",
  responses = "responses"
}

interface IScopePostsCtrl extends ng.IScope {
  isLoading: boolean;
  isLoadingMore: boolean;
  isArchiving: boolean;
  posts: Post[];
  responses: Post[];
  drafts: Post[];
  page: number;
  limit: number;
  postsAvailable: boolean;
  showTabs: boolean;
  currentTab: TabStatus;
  currentSubTab: SubTabStatus;
  this: any;
  filteredPosts: Post[];

  fetchPosts: () => void;
  filterPosts: () => Post[];
  loadMore: () => void;
  switchTab: (tab: TabStatus) => void;
  switchSubTab: (tab: SubTabStatus) => void;
  displayPostBody: (html: string) => string;
  archivePost: (post: Post) => void;
  getTabCount: (tab?: TabStatus, subtab?: SubTabStatus) => number;
}

export default class PostsCtrl {
  public static $inject = [
    "$rootScope", "$scope", "$timeout", "PostService", "ScopeService"
  ];

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopePostsCtrl,
    private $timeout: ng.ITimeoutService,
    private postService: PostService,
    private scopeService: ScopeService
  ) {
    this.$scope.isLoading = true;
    this.$scope.isLoadingMore = false;
    this.$scope.isArchiving = false;
    this.$scope.posts = [];
    this.$scope.responses = [];
    this.$scope.drafts = [];
    this.$scope.page = 1;
    this.$scope.limit = 20;
    this.$scope.postsAvailable = true;
    this.$scope.currentTab = TabStatus.published;
    this.$scope.currentSubTab = SubTabStatus.posts;
    this.$scope.showTabs = false;
    this.$scope.archivePost = (post: Post) => this.archivePost(post);
    this.$scope.switchTab = (tab: TabStatus) => this.switchTab(tab);
    this.$scope.switchSubTab = (tab: SubTabStatus) => this.switchSubTab(tab);
    this.$scope.displayPostBody = (html: string) => this.displayPostBody(html);
    this.$scope.loadMore = () => this.loadMore();
    this.$scope.getTabCount = (tab?: TabStatus, subtab?: SubTabStatus) => this.getTabCount(tab, subtab);
    this.$scope.filterPosts = () => this.filterPosts();
    this.$scope.filteredPosts = [];

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
        userId: this.$rootScope.user.id
      }, (posts) => {

        if (!posts) {
          return;
        }

        if (this.$scope.page === 0) {
          this.$scope.posts = posts;
        } else {
          posts.forEach(post => {
            this.$scope.posts.push(post);
          });
        }
        this.filterPosts();

        if (posts.length < this.$scope.limit) {
          this.$scope.postsAvailable = false;
        } else {
          this.$scope.postsAvailable = true;
        }

        this.$scope.isLoading = this.$scope.isLoadingMore ? false : false;
        this.$scope.isLoadingMore = false;

        this.$scope.showTabs = true;

        this.scopeService.safeApply(this.$scope, () => {});

        this.initTippy();
      }
    );
  }

  public filterPosts(tab?: TabStatus, subtab?: SubTabStatus): Post[] {
    const _tab = tab || this.$scope.currentTab;
    const _subtab = subtab || this.$scope.currentSubTab;

    switch (_tab) {
      case "drafts":
        if (!subtab) {
          if (_subtab === "posts") {
            if (tab || subtab) {
              return this.$scope.posts.filter(d => d.status === "draft" && !d.parentPostId);
            } else {
              this.$scope.filteredPosts = this.$scope.posts.filter(d => d.status === "draft" && !d.parentPostId);
              return;
            }
          } else if (_subtab === "responses") {
            if (tab || subtab) {
              return this.$scope.posts.filter(d => d.status === "draft" && d.parentPostId);
            } else {
              this.$scope.filteredPosts = this.$scope.posts.filter(d => d.status === "draft" && d.parentPostId);
              return;
            }
          }
        } else {
          return this.$scope.posts.filter(d => d.status === "draft");
        }
        if (tab || subtab) {
          return this.$scope.posts.filter(d => d.status === "draft");
        } else {
          this.$scope.filteredPosts = this.$scope.posts.filter(d => d.status === "draft");
        }
      case "published":
        if (!subtab) {
          if (_subtab === "posts") {
            if (tab || subtab) {
              return this.$scope.posts.filter(d => d.status === "published" && !d.parentPostId);
            } else {
              this.$scope.filteredPosts = this.$scope.posts.filter(d => d.status === "published" && !d.parentPostId);
              return;
            }
          } else if (_subtab === "responses") {
            if (tab || subtab) {
              return this.$scope.posts.filter(d => d.status === "published" && d.parentPostId);
            } else {
              this.$scope.filteredPosts = this.$scope.posts.filter(d => d.status === "published" && d.parentPostId);
              return;
            }
          }
        } else {
          return this.$scope.posts.filter(d => d.status === "published");
        }
        if (tab || subtab) {
          return this.$scope.posts.filter(d => d.status === "published");
        } else {
          this.$scope.filteredPosts = this.$scope.posts.filter(d => d.status === "published");
        }
      case "archived":
        if (!subtab) {
          if (_subtab === "posts") {
            if (tab || subtab) {
              return this.$scope.posts.filter(d => d.status === "archived" && !d.parentPostId);
            } else {
              this.$scope.filteredPosts = this.$scope.posts.filter(d => d.status === "archived" && !d.parentPostId);
              return;
            }
          } else if (_subtab === "responses") {
            if (tab || subtab) {
              return this.$scope.posts.filter(d => d.status === "archived" && d.parentPostId);
            } else {
              this.$scope.filteredPosts = this.$scope.posts.filter(d => d.status === "archived" && d.parentPostId);
              return;
            }
          }
        } else {
          return this.$scope.posts.filter(d => d.status === "archived");
        }
        if (tab || subtab) {
          return this.$scope.posts.filter(d => d.status === "archived");
        } else {
          this.$scope.filteredPosts = this.$scope.posts.filter(d => d.status === "archived");
        }
    }
  }

  public switchTab(tab: TabStatus) {
    this.$scope.currentTab = tab;
    this.filterPosts();
  }

  public switchSubTab(tab: SubTabStatus) {
    this.$scope.currentSubTab = tab;
    this.filterPosts();
  }

  public async archivePost(post: Post) {
    this.$scope.isArchiving = true;

    const confirmationResult = await swal({
      title: "Are you sure?",
      text: `
        Archived posts will still be reachable by direct links however the body of the post will be hidden with [archived].
        
        The upvotes and the responses will still be visible however users will not be able to upvote or comment on your post/responses anymore.
      `,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (confirmationResult) {
      const archiveResult = await this.postService.archivePost(post);

      if (archiveResult.status === 200) {
        this.$scope.posts = this.$scope.posts.filter(f => f.id !== post.id);
        toastr.success("Your post has been archived");
      } else {
        toastr.error("There was an error while archiving your post");
      }
    } else {
      toastr.info("Your post has not been archived");
    }

    this.$scope.isArchiving = false;

    this.scopeService.safeApply(this.$scope, () => {});
  }

  public displayPostBody(html: string): string {
    return this.postService.displayHTML(html);
  }

  public getTabCount(tab: TabStatus, subtab?: SubTabStatus): number {
    return this.filterPosts(tab, subtab).length;
  }

  private async initTippy() {
    //Timeout is somehow required
    this.$timeout(() => {
      tippy('.hc-tooltip');
    });
  }
}
