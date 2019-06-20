import tippyJs from "tippy.js";
import "tippy.js/dist/tippy.css";
import toastr from "../../core/config/toastr";
import { IGlobalScope } from "../../core/lib/interfaces";
import { Post, Upvote, Unlock } from "../../core/models/models";
import PostService from "../../core/services/PostService";
import ScopeService from "../../core/services/ScopeService";

declare var QRCode: any;
export default class PostCtrl {
  public static $inject = [
    "$scope",
    "$rootScope",
    "$stateParams",
    "PostService",
    "ScopeService",
  ];
  public isLoading: boolean = true;
  public post: Post;
  public upvotes: Upvote[] = [];
  public responses: Post[] = [];
  public unlocks: Unlock[] = [];
  public responseSortOrder: string = "createdAt";
  public shouldShowIcon: boolean = false;
  public iconToShow: string = "";
  public postTooltip: string = "";
  private newResponse: string = "";

  constructor(
    private $scope,
    private $rootScope: IGlobalScope,
    private $stateParams,
    private postService: PostService,
    private scopeService: ScopeService,
  ) {
    this.ngInit();
  }

  private async ngInit() {
    this.post = await this.postService.getById(
      this.$stateParams.alias,
    );

    this.post.isOwner = this.$rootScope.user ?
      this.post.user.id === this.$rootScope.user.id :
      false;

    // show archived or locked/unlocked icon
    if (this.post.status === "archived") {
      this.shouldShowIcon = true;
      if (this.post.hasPaidSection && (this.post.hasBeenPaidFor || this.post.isOwner)) {
        this.postTooltip = `This story is now archived however` +
        `you still have access to the original post`;
        this.iconToShow = "fa-unlock";
      } else {
        this.postTooltip = `This story is archived`;
        this.iconToShow = "fa-archive";
      }
      this.scopeService.safeApply(this.$scope);
    } else if (this.post.hasPaidSection) {
      this.shouldShowIcon = true;
      if (!this.post.isOwner) {
        if (this.post.hasBeenPaidFor) {
          this.postTooltip = `You have unlocked this story`;
          this.iconToShow = "fa-unlock";
        } else {
          this.postTooltip = `Unlocking this story will cost you ${this.post.paidSectionCost} BCH`;
          this.iconToShow = "fa-lock";
        }
      } else {
        this.postTooltip = `This story has a paid section however you have access to the post`;
        this.iconToShow = "fa-unlock";
      }
      this.scopeService.safeApply(this.$scope);
    }

    this.isLoading = false;

    this.scopeService.safeApply(this.$scope, () => {});

    const data = await Promise.all([
      this.postService.getUpvotes(this.post.id),
      this.postService.getResponses(this.post.id),
      this.postService.getUnlocks(this.post.id),
    ]);

    this.upvotes = data[0];
    this.responses = data[1];
    this.unlocks = data[2];

    this.scopeService.safeApply(this.$scope);

    if (!this.$rootScope.user) {
      const container = document.getElementById("post-tipping-container");

      if (container) {
        container.innerHTML = "";

        (() => new QRCode(container, this.post.user.addressBCH))();
      }
    }

    this.initTippy();
  }

  private redirectUserToComments() {
    if (!this.$rootScope.user || (this.$rootScope.user && !this.$rootScope.user.id)) {
      location.href = "/signup";
      return;
    }
    location.href = `/editor/comment/${this.post.id}`;
  }

  private sortResponses(order: "upvoteCount" | "createdAt") {
    this.responseSortOrder = order;
    this.scopeService.safeApply(this.$scope);
  }

  private async createPost() {
    if (!this.newResponse || this.newResponse.length < 10) {
      return toastr.error("Comments need to be at least 10 characters.");
    }

    const newComment = await this.postService.createPost({
      body: this.newResponse,
      parentPostId: this.post.id,
      postTypeId: "comment",
    } as any);

    this.responses.push(newComment);

    this.newResponse = "";

    this.scopeService.safeApply(this.$scope);
  }

  private async editPost() {
    window.location.href = `/edit/${this.post.id}`;
  }

  private async initTippy() {
    tippyJs(".hc-tooltip");
    tippyJs(".user-follower-count");
  }

  private displayFeedBody(html: string): string {
    return this.postService.displayHTML(html);
  }
}
