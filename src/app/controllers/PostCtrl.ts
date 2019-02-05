import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';

import ScopeService from "../../core/services/ScopeService";
import PostService from "../../core/services/PostService";
import { Post, Upvote } from "../../core/models/models";
import {client as clientURL} from '../../core/config/index';

import toastr from "../../core/config/toastr";
const showdown  = require('showdown');
const converter = new showdown.Converter();

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
  private newResponse: string = "";

  constructor(
    private $scope,
    private $rootScope,
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

    this.scopeService.safeApply(this.$scope, () => {});

    if (!this.$rootScope.user) {
      const container = document.getElementById("post-tipping-container");

      container.innerHTML = "";

      new QRCode(container, this.post.user.addressBCH);
    }

    this.initTippy();
  }

  private async createPost() {
    if (!this.newResponse || this.newResponse.length < 10) {
      return toastr.error("Comments need to be at least 10 characters.")
    }

    const newComment = await this.postService.createPost({
      parentPostId: this.post.id,
      body: this.newResponse,
      postTypeId: "comment"
    } as any);

    this.responses.push(newComment);

    this.newResponse = "";

    this.scopeService.safeApply(this.$scope, () => {});
  }

  private async initTippy() {
    tippy(".hc-tooltip");
    tippy(".user-follower-count");
  }

  private displayFeedBody(html: string): string {
    return this.postService.displayHTML(html);
  }
}
