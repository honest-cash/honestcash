import PostService from '../../core/services/PostService';
import { IGlobalScope } from '../../core/lib/interfaces';

interface IScopePostsCtrl extends ng.IScope {
  isLoading: boolean;
  feeds: any[];
  page: number;
  limit: number;
  postsAvailable: boolean;
  feedType: "drafts" | "published";
  sortType: "new";

  fetchFeeds: () => void;
  loadMore: () => void
}

export default class PostsCtrl {
  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopePostsCtrl,
    private postService: PostService,
  ) {
    this.$scope.isLoading = true;
    this.$scope.feeds = [];
    this.$scope.page = 1;
		this.$scope.limit = 10;
		this.$scope.postsAvailable = true;
    this.$scope.feedType = "published";

		this.$scope.fetchFeeds = () => this.fetchFeeds({});
    this.$scope.loadMore = () => this.loadMore();

    this.fetchFeeds({});
  }

  protected loadMore() {
    if (!this.$rootScope.activeCalls && this.$scope.postsAvailable) {
      this.$scope.page = this.$scope.page + 1;

      this.fetchFeeds({page: this.$scope.page});
    }
  };

  
  protected fetchFeeds(params) {
    this.$scope.isLoading = true;
    params = params ? params : {};

    this.postService.getPosts({
      includeResponses: false,
      status: "published",
      orderBy: "publishedAt",
      page: params.page ? params.page : this.$scope.page,
      userId: 243 //this.$rootScope.user.id
    }, data => {
      console.log('data', data)
      if (!data) {
          return;
      }

      if (params.page === 0) {
        this.$scope.feeds = data;
      } else {
        data.forEach((feed) => {
          this.$scope.feeds.push(feed);
        });
      }

      if (data.length < this.$scope.limit) {
        this.$scope.postsAvailable = false;
      } else {
        this.$scope.postsAvailable = true;
      }

      this.$scope.isLoading = false;

    });
}


  static $inject = [
    "$rootScope",
    "$scope",
    "PostService",
  ];
}
