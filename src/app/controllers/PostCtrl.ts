import ScopeService from "../../core/services/ScopeService";
import PostService from "../../core/services/PostService";
import { Post, Upvote } from "../../core/models/models";

declare var QRCode: any;
export default class PostCtrl {
    constructor(
      private $scope,
      private $rootScope,
      private $stateParams,
      private postService: PostService,
      private scopeService: ScopeService
    ) {
        this.ngInit();
    }

    public isLoading: boolean = true;
    public post: Post;
    public upvotes: Upvote[] = [];
    public responses: Post[] = [];

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

      this.scopeService.safeApply(this.$scope, () => {});

      if (!this.$rootScope.user) {
        const container = document.getElementById("post-tipping-container");

        container.innerHTML = "";

        new QRCode(container, this.post.user.addressBCH);
    }
  }

  static $inject = [
    "$scope",
    "$rootScope",
    "$stateParams",
    "PostService",
    "ScopeService"
  ]
}
