
import { IGlobalScope } from "../../core/lib/interfaces";
import { Post } from "../../core/models/models";
import PostService from "../../core/services/PostService";
import ScopeService from "../../core/services/ScopeService";
import swal from "sweetalert";
import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';

enum TabStatus {
  drafts = "drafts",
  published = "published"
}

interface IScopePostsCtrl extends ng.IScope {
  isLoading: boolean;
  isLoadingMore: boolean;
  isDeleting: boolean;
  feeds: any[];
  page: number;
  limit: number;
  postsAvailable: boolean;
  currentTab: TabStatus;

  fetchPosts: () => void;
  loadMore: () => void;
  switchTab: () => void;
  displayFeedBody: () => void;
  deletePost: () => void;
}

export default class PostsCtrl {
  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopePostsCtrl,
    private $timeout: ng.ITimeoutService,
    private postService: PostService,
    private scopeService: ScopeService
  ) {
    this.fetchPosts();
  }

  public isLoading: boolean = true;
  public isLoadingMore: boolean = false;
  public isDeleting: boolean = false;
  public feeds: Post[] = [];
  public postsAvailable: boolean = true;
  public currentTab = "published";
  private page: number = 1;
  private limit: number = 20;

  public loadMore() {
    if (!this.$rootScope.activeCalls && this.postsAvailable) {
      this.page += 1;
      this.isLoadingMore = true;
      this.fetchPosts();
    }
  }

  public fetchPosts() {
    this.isLoading = this.isLoadingMore ? false : true;

    this.postService.getPosts(
      {
        includeResponses: false,
        status: "published",
        orderBy: "publishedAt",
        page: this.page,
        userId: this.$rootScope.user.id
      },
      data => {

        if (!data) {
          return;
        }

        if (this.page === 0) {
          this.feeds = data;
        } else {
          data.forEach(feed => {
            this.feeds.push(feed);
          });
        }

        if (data.length < this.limit) {
          this.postsAvailable = false;
        } else {
          this.postsAvailable = true;
        }

        this.isLoading = this.isLoadingMore ? false : false;
        this.isLoadingMore = false;

        this.scopeService.safeApply(this.$scope, () => {});

        this.initTippy();
      }
    );
  }

  public switchTab(currentTab: TabStatus) {
    this.currentTab = currentTab;
  }

  public async deletePost(id: number) {
    this.isDeleting = true;

    const confirmationResult = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (confirmationResult) {
      const deleteResult = await this.postService.deletePost(id);

      if (deleteResult.status === 200) {
        this.feeds = this.feeds.filter(f => f.id === id);
        toastr.success("Your post has been deleted");
      } else {
        toastr.error("There was an error while deleting your post")
      }
    } else {
      toastr.info("Your post has not been deleted");
    }

    this.isDeleting = false;
  }

  private async initTippy() {
    //Timeout is somehow required
    this.$timeout(() => {
      tippy('.hc-tooltip');
    });
  }

  private displayFeedBody(html: string): string {
    return this.postService.displayHTML(html);
  }

  public static $inject = ["$rootScope", "$scope", "$timeout", "PostService", "ScopeService"];
}
