
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
  posts: {
    [TabStatus.drafts]: {
      [SubTabStatus.posts]: Post[];
      [SubTabStatus.responses]: Post[];
    };
    [TabStatus.published]: {
      [SubTabStatus.posts]: Post[];
      [SubTabStatus.responses]: Post[];
    };
    [TabStatus.archived]: {
      [SubTabStatus.posts]: Post[];
      [SubTabStatus.responses]: Post[];
    };
    [TabStatus.locked]: {
      [SubTabStatus.posts]: Post[];
      [SubTabStatus.responses]: Post[];
    };
    [TabStatus.unlocked]: {
      [SubTabStatus.posts]: Post[];
      [SubTabStatus.responses]: Post[];
    };
  };
  responses: Post[];
  drafts: Post[];
  page: {
    [TabStatus.drafts]: {
      [SubTabStatus.posts]: number;
      [SubTabStatus.responses]: number;
    };
    [TabStatus.published]: {
      [SubTabStatus.posts]: number;
      [SubTabStatus.responses]: number;
    };
    [TabStatus.archived]: {
      [SubTabStatus.posts]: number;
      [SubTabStatus.responses]: number;
    };
    [TabStatus.locked]: {
      [SubTabStatus.posts]: number;
      [SubTabStatus.responses]: number;
    };
    [TabStatus.unlocked]: {
      [SubTabStatus.posts]: number;
      [SubTabStatus.responses]: number;
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
  getHeaderText: () => string;
}

export default class PostsCtrl {
  public static $inject = [
    "$rootScope", "$scope", "$timeout", "PostService", "ScopeService"
  ];

  private posts;

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopePostsCtrl,
    private $timeout: ng.ITimeoutService,
    private postService: PostService,
    private scopeService: ScopeService
  ) {
    this.posts = {
      drafts: [],
      published: [],
      archived: [],
      locked: [],
      unlocked: []
    }
    this.$scope.isLoading = true;
    this.$scope.isLoadingMore = false;
    this.$scope.isArchiving = false;
    this.$scope.posts = {
      [TabStatus.drafts]: {
        [SubTabStatus.posts]: [],
        [SubTabStatus.responses]: []
      },
      [TabStatus.published]: {
        [SubTabStatus.posts]: [],
        [SubTabStatus.responses]: []
      },
      [TabStatus.archived]: {
        [SubTabStatus.posts]: [],
        [SubTabStatus.responses]: []
      },
      [TabStatus.locked]: {
        [SubTabStatus.posts]: [],
        [SubTabStatus.responses]: []
      },
      [TabStatus.unlocked]: {
        [SubTabStatus.posts]: [],
        [SubTabStatus.responses]: []
      }
    }
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
    this.$scope.getHeaderText = () => this.getHeaderText();
    this.$scope.filteredPosts = [];

    this.fetchPosts();
  }

  public loadMore() {
    if (!this.$rootScope.activeCalls && this.$scope.postsAvailable[this.$scope.currentTab][this.$scope.currentSubTab]) {
      this.$scope.page[this.$scope.currentTab][this.$scope.currentSubTab] += 1;
      this.$scope.isLoadingMore = true;
      this.fetchPosts();
    }
  }

  public async fetchPosts() {
    this.$scope.isLoading = this.$scope.isLoadingMore ? false : true;

    const getFetchPostsArgs = (tab?: TabStatus, subtab?: SubTabStatus):IFetchPostsArgs  => {
      return {
        includeResponses: false,
        orderBy: "publishedAt",
        page: this.$scope.page[tab || this.$scope.currentTab][subtab || this.$scope.currentSubTab],
        userId: this.$rootScope.user.id
      }
    };

    const queries = {
      drafts: (cb) => this.postService.getPosts({...getFetchPostsArgs(), includeParentPost: true, status: "draft"}, cb),
      published: (cb) => this.postService.getPosts({...getFetchPostsArgs(), includeParentPost: true, status: "published"}, cb),
      archived: (cb) => this.postService.getPosts({...getFetchPostsArgs(), status: "archived"}, cb),
      locked: (cb) => this.postService.getPosts({...getFetchPostsArgs(), status: "locked"}, cb),
      unlocked: (cb) => this.postService.getUserUnlocks(undefined, cb)
    }

    const query = queries[this.$scope.currentTab];
    query((posts) => {

      let _posts = posts;

      if (this.$scope.currentTab === TabStatus.unlocked) {
        _posts = posts.map((post => post.userPost));
      }

      if (this.$scope.page[this.$scope.currentTab][this.$scope.currentSubTab] === 0) {
        this.posts = {
          [this.$scope.currentTab]: _posts
        }
      } else {
        this.posts[this.$scope.currentTab] = [...this.posts[this.$scope.currentTab], ..._posts];
      }
      this.scopeService.safeApply(this.$scope, () => {});

      this.filterPosts();

      this.scopeService.safeApply(this.$scope, () => {});

      this.$scope.isLoading = this.$scope.isLoadingMore ? false : false;
      this.$scope.isLoadingMore = false;

      if (Object.keys(this.posts).length === 1) {
        this.initTippy();
      }

      this.scopeService.safeApply(this.$scope, () => {});

    });
    
  }

  private setPostsAvailable(tab?: TabStatus, subtab?: SubTabStatus) {
    tab = tab || this.$scope.currentTab;
    subtab = subtab || this.$scope.currentSubTab;

    if (this.$scope.filteredPosts.length < this.$scope.limit) {
      this.$scope.postsAvailable[tab][subtab] = false;
    } else {
      this.$scope.postsAvailable[tab][subtab] = true;
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
      [TabStatus.unlocked]: (d) => { return {...d}; },
      [SubTabStatus.posts]: (d) => !d.parentPostId,
      [SubTabStatus.responses]: (d) => d.parentPostId,
    }

    let condition, fn;

    if (tab === TabStatus.unlocked) {
      fn = (array, _condition) => array.map(_condition);
      condition = (d) => conditions[tab](d);
    } else {
      fn = (array, _condition) => array.filter(_condition);
      condition = (d) => conditions[tab](d) && conditions[subtab](d);
    }
    
    this.$scope.filteredPosts = fn(this.posts[tab], condition);
   
    this.setPostsAvailable();
  }

  public switchTab(tab: TabStatus) {
    if (this.$scope.isLoading) {
      return;
    }

    this.$scope.currentTab = tab;
    this.switchSubTab(SubTabStatus.posts);
    this.fetchPosts();
  }

  public switchSubTab(tab: SubTabStatus) {
    if (this.$scope.isLoading) {
      return;
    }
    this.$scope.currentSubTab = tab;
    this.fetchPosts();
    this.initTippy();
  }

  public getHeaderText() {
    const {tab, subtab} = {tab: this.$scope.currentTab, subtab: this.$scope.currentSubTab};
    const your = "Your";
    let noun = "";
    if (tab === TabStatus.drafts) {
      noun = `${subtab === SubTabStatus.posts ? "story" : "response"} drafts`
    } else {
      noun = `${tab.toLowerCase()} ${subtab === SubTabStatus.posts ? "stories" : "responses"}`

    }
    return `${your} ${noun}`;
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
        const _post = this.posts[this.$scope.currentTab].find(p => p.id);

        this.posts[this.$scope.currentTab] = this.posts[this.$scope.currentTab].filter(f => f.id !== post.id);
        this.posts[TabStatus.archived].push(_post);
        this.filterPosts();
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
