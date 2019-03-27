
import swal from "sweetalert";
import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';
import toastr from "../../core/config/toastr";
import { IGlobalScope } from "../../core/lib/interfaces";
import { Post, IFetchPostsArgs } from "../../core/models/models";
import PostService from "../../core/services/PostService";
import ScopeService from "../../core/services/ScopeService";

enum TabStatus {
  drafts = "drafts",
  published = "published",
  archived = "archived",
  locked = "locked",
  unlocked = "unlocked"
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
  page: {
    [TabStatus.drafts]: {
      [SubTabStatus.posts]: 0;
      [SubTabStatus.responses]: 0;
    };
    [TabStatus.published]: {
      [SubTabStatus.posts]: 0;
      [SubTabStatus.responses]: 0;
    };
    [TabStatus.archived]: {
      [SubTabStatus.posts]: 0;
      [SubTabStatus.responses]: 0;
    };
    [TabStatus.locked]: {
      [SubTabStatus.posts]: 0;
      [SubTabStatus.responses]: 0;
    };
    [TabStatus.unlocked]: {
      [SubTabStatus.posts]: 0;
      [SubTabStatus.responses]: 0;
    };
  };
  limit: number;
  postsAvailable: {
    [TabStatus.drafts]: {
      [SubTabStatus.posts]: boolean;
      [SubTabStatus.responses]: boolean;
    };
    [TabStatus.published]: {
      [SubTabStatus.posts]: boolean;
      [SubTabStatus.responses]: boolean;
    };
    [TabStatus.archived]: {
      [SubTabStatus.posts]: boolean;
      [SubTabStatus.responses]: boolean;
    };
    [TabStatus.locked]: {
      [SubTabStatus.posts]: boolean;
      [SubTabStatus.responses]: boolean;
    };
    [TabStatus.unlocked]: {
      [SubTabStatus.posts]: boolean;
      [SubTabStatus.responses]: boolean;
    };
  };
  showTabs: boolean;
  currentTab: TabStatus;
  currentSubTab: SubTabStatus;
  this: any;
  filteredPosts: Post[];

  fetchPosts: () => void;
  filterPosts: () => void;
  loadMore: () => void;
  switchTab: (tab: TabStatus) => void;
  switchSubTab: (tab: SubTabStatus) => void;
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
    this.$scope.responses = [];
    this.$scope.drafts = [];
    this.$scope.page = {
      [TabStatus.drafts]: {
        [SubTabStatus.posts]: 0,
        [SubTabStatus.responses]: 0
      },
      [TabStatus.published]: {
        [SubTabStatus.posts]: 0,
        [SubTabStatus.responses]: 0
      },
      [TabStatus.archived]: {
        [SubTabStatus.posts]: 0,
        [SubTabStatus.responses]: 0
      },
      [TabStatus.locked]: {
        [SubTabStatus.posts]: 0,
        [SubTabStatus.responses]: 0
      },
      [TabStatus.unlocked]: {
        [SubTabStatus.posts]: 0,
        [SubTabStatus.responses]: 0
      }
    };
    this.$scope.limit = 20;
    this.$scope.postsAvailable = {
      [TabStatus.drafts]: {
        [SubTabStatus.posts]: false,
        [SubTabStatus.responses]: false
      },
      [TabStatus.published]: {
        [SubTabStatus.posts]: false,
        [SubTabStatus.responses]: false
      },
      [TabStatus.archived]: {
        [SubTabStatus.posts]: false,
        [SubTabStatus.responses]: false
      },
      [TabStatus.locked]: {
        [SubTabStatus.posts]: false,
        [SubTabStatus.responses]: false
      },
      [TabStatus.unlocked]: {
        [SubTabStatus.posts]: false,
        [SubTabStatus.responses]: false
      }
    };
    this.$scope.currentTab = TabStatus.published;
    this.$scope.currentSubTab = SubTabStatus.posts;
    this.$scope.showTabs = false;
    this.$scope.archivePost = (post: Post) => this.archivePost(post);
    this.$scope.switchTab = (tab: TabStatus) => this.switchTab(tab);
    this.$scope.switchSubTab = (tab: SubTabStatus) => this.switchSubTab(tab);
    this.$scope.displayPostBody = (html: string) => this.displayPostBody(html);
    this.$scope.loadMore = () => this.loadMore();
    this.$scope.filterPosts = () => this.filterPosts();
    this.$scope.filteredPosts = [];

    this.fetchPosts();
  }

  public loadMore() {
    if (!this.$rootScope.activeCalls && this.$scope.postsAvailable[this.$scope.currentTab]) {
      this.$scope.page[this.$scope.currentTab] += 1;
      this.$scope.isLoadingMore = true;
      this.fetchPosts();
    }
  }

  private isSet() {

  }

  public async fetchPosts() {
    this.$scope.isLoading = this.$scope.isLoadingMore ? false : true;

    const getFetchPostsArgs = (tab?: TabStatus):IFetchPostsArgs  => {
      return {
        includeResponses: false,
        orderBy: "publishedAt",
        page: this.$scope.page[tab || this.$scope.currentTab],
        userId: this.$rootScope.user.id
      }
    };

    //const drafts = await this.postService.getPosts({...getFetchPostsArgs(), status: "draft"});
    //const published = await this.postService.getPosts({...getFetchPostsArgs(), status: "published"});
    //const archived = await this.postService.getPosts({...getFetchPostsArgs(), status: "archived"});
    //const locked = await this.postService.getPosts({...getFetchPostsArgs(), status: "locked"});
    const unlocked = await this.postService.getUserUnlocks();

    /* , (posts) => {

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
    } */
    
  }

  private setPostsAvailable(tab) {
    if (this.$scope.filteredPosts.length < this.$scope.limit) {
      this.$scope.postsAvailable = false;
    } else {
      this.$scope.postsAvailable = true;
    }
  }

  public filterPosts(tab?: TabStatus, subtab?: SubTabStatus): void {
    tab = tab || this.$scope.currentTab;
    subtab = subtab || this.$scope.currentSubTab;

    const conditions = {
      [TabStatus.drafts]: (d) => d.status === "draft" && d.paidSectionLinebreak === null,
      [TabStatus.published]: (d) => d.status === "published" && d.paidSectionLinebreak === null,
      [TabStatus.archived]: (d) => d.status === "archived" && d.paidSectionLinebreak === null,
      [TabStatus.locked]: (d) => d.status === "published" && d.paidSectionLinebreak !== null,
      [SubTabStatus.posts]: (d) => !d.parentPostId,
      [SubTabStatus.responses]: (d) => d.parentPostId,
    }

    const condition = (d) => conditions[tab](d) && conditions[subtab](d);

    this.$scope.filteredPosts = this.$scope.posts.filter(d => condition(d));
    
    this.setPostsAvailable();
  }

  public switchTab(tab: TabStatus) {
    if (tab === TabStatus.locked || tab === TabStatus.unlocked) {
      this.switchSubTab(SubTabStatus.posts);
    }
    this.$scope.currentTab = tab;
    this.filterPosts(tab, this.$scope.currentSubTab);
  }

  public switchSubTab(tab: SubTabStatus) {
    this.$scope.currentSubTab = tab;
    this.filterPosts(this.$scope.currentTab, tab);
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

  private async initTippy() {
    //Timeout is somehow required
    this.$timeout(() => {
      tippy('.hc-tooltip');
    });
  }
}
