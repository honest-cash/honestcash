
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
  published = "published"
}

interface IScopePostsCtrl extends ng.IScope {
  isLoading: boolean;
  isLoadingMore: boolean;
  isArchiving: boolean;
  posts: Post[];
  comments: Post[];
  drafts: Post[];
  page: number;
  limit: number;
  postsAvailable: boolean;
  currentTab: TabStatus;
  this: any;

  fetchPosts: () => void;
  loadMore: () => void;
  switchTab: (tab: TabStatus) => void;
  displayPostBody: (html: string) => string;
  archivePost: (post: Post) => void;
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
    this.$scope.comments = [];
    this.$scope.drafts = [];
    this.$scope.page = 1;
    this.$scope.limit = 20;
    this.$scope.postsAvailable = true;
    this.$scope.currentTab = TabStatus.published;
    this.$scope.archivePost = (post: Post) => this.archivePost(post);
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
        userId: this.$rootScope.user.id
      }, (data) => {

        if (!data) {
          return;
        }

        const posts = data.filter(d => !d.parentPostId);
        const comments = data.filter(d => !d.parentPostId);

        if (this.$scope.page === 0) {
          this.$scope.posts = posts;
          this.$scope.comments = comments;
        } else {
          posts.forEach(post => {
            this.$scope.posts.push(post);
          });
          comments.forEach(comment => {
            this.$scope.comments.push(comment);
          });
        }

        if (posts.length < this.$scope.limit) {
          this.$scope.postsAvailable = false;
        } else {
          this.$scope.postsAvailable = true;
        }

        this.$scope.isLoading = this.$scope.isLoadingMore ? false : false;
        this.$scope.isLoadingMore = false;

        this.scopeService.safeApply(this.$scope, () => {});

        this.initTippy();
      }
    );
  }

  public switchTab(tab: TabStatus) {
    this.$scope.currentTab = tab;
  }

  public async archivePost(post: Post) {
    this.$scope.isArchiving = true;

    const confirmationResult = await swal({
      title: "Are you sure?",
      text: `
        Archived posts will still be reachable by direct links however the body of the post will be hidden with [archived].
        
        The upvotes and the comments will still be visible however users will not be able to upvote or comment on your post/comments anymore.
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

  private async initTippy() {
    //Timeout is somehow required
    this.$timeout(() => {
      tippy('.hc-tooltip');
    });
  }
}
