import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import toastr from "../../core/config/toastr";
import { IGlobalScope } from "../../core/lib/interfaces";
import { Post, Upvote } from "../../core/models/models";
import PostService from "../../core/services/PostService";
import ScopeService from "../../core/services/ScopeService";

declare var QRCode: any;
export default class PostCtrl {
  public static $inject = [
    "$scope",
    "$rootScope",
    "$stateParams",
    "PostService",
    "ScopeService"
  ];
  public isLoading: boolean = true;
  public post: Post;
  public upvotes: Upvote[] = [];
  public responses: Post[] = [];
  public responseSortOrder: string = "createdAtRaw";
  private newResponse: string = "";

  constructor(
    private $scope,
    private $rootScope: IGlobalScope,
    private $stateParams,
    private postService: PostService,
    private scopeService: ScopeService
  ) {
      this.ngInit();
  }

  private async ngInit() {
    this.post = await this.postService.getById(
      this.$stateParams.alias
    );

    this.isLoading = false;

    this.scopeService.safeApply(this.$scope, () => {});

    const data = await Promise.all([
      this.postService.getUpvotes(this.post.id),
      this.postService.getResponses(this.post.id)
    ]);

    this.upvotes = data[0];
    this.responses = data[1];

    this.scopeService.safeApply(this.$scope);

    if (!this.$rootScope.user) {
      const container = document.getElementById("post-tipping-container");

      container.innerHTML = "";

      (() => new QRCode(container, this.post.user.addressBCH))();
    }

    this.initTippy();
  }

  private sortResponses(order: "upvoteCount" | "createdAtRaw") {  
    this.responseSortOrder = order;
    this.scopeService.safeApply(this.$scope);
  }

  private async createPost() {
    if (!this.newResponse || this.newResponse.length < 10) {
      return toastr.error("Comments need to be at least 10 characters.")
    }

    const newComment = await this.postService.createPost({
      body: this.newResponse,
      parentPostId: this.post.id,
      postTypeId: "comment"
    } as any);

    this.responses.push(newComment);

    this.newResponse = "";

    this.scopeService.safeApply(this.$scope);
  }

  private async initTippy() {
    tippy(".hc-tooltip");
    tippy(".user-follower-count");
  }

  private displayFeedBody(html: string): string {
    return this.postService.displayHTML(html);
  }
}
