
import swal from "sweetalert";
import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';
import toastr from "../../core/config/toastr";
import { IGlobalScope, IGroupedUpvote } from "../../core/lib/interfaces";
import * as simpleWalletProvider from "../../core/lib/simpleWalletProvider";
import { satoshiToBch } from "../../core/lib/upvoteDistribution";
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
  isDeleting: boolean;
  posts: Post[];
  page: number;
  limit: number;
  postsAvailable: boolean;
  currentTab: TabStatus;
  this: any;

  fetchPosts: () => void;
  loadMore: () => void;
  switchTab: (tab: TabStatus) => void;
  displayPostBody: (html: string) => string;
  deletePost: (id: number) => void;
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
    this.$scope.isDeleting = false;
    this.$scope.posts = [];
    this.$scope.page = 1;
    this.$scope.limit = 20;
    this.$scope.postsAvailable = true;
    this.$scope.currentTab = TabStatus.published;
    this.$scope.deletePost = (id: number) => this.deletePost(id);
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
 
  public async promotePost(post: Post) {
    /**
     * Splits an upvote amount between previous upvotes and saves the upvote reference in Honest database
     */
    if (!this.$rootScope.user) {
      return location.href = "/signup";
    }

    const postId = post.id;

    if (post.userId !== this.$rootScope.user.id) {
      toastr.error("Boosting is not possible because this is not your own post.");

      return;
    }

    const simpleWallet = simpleWalletProvider.get();

    // users with connected BCH accounts
    let tx = {};
    let upvotes: IGroupedUpvote[];

    try {
      upvotes = (await this.postService.getUpvotesForBoosting());
    } catch (err) {
      toastr.error("Can't connect.");

      return console.error(err);
    }

    const distributionInfoEl = document.getElementById("distribution-info");

    distributionInfoEl.innerHTML = "";

    const receivers = [];

    for (const receiver of upvotes) {
      const el = document.createElement("div");

      let userHtml;

      if (receiver.user) {
        userHtml = `<a target="_self" href="/profile/${receiver.user.username}">
          <img
            style="border-radius:50%; width: 23px;"
            src="${receiver.user.imageUrl ? receiver.user.imageUrl : '/img/avatar.png'}"
          />
          ${receiver.user.username}
        </a>`;
      } else {
          userHtml = `<img style="width: 23px;" src="/img/avatar.png" /> Anonymous`;
      }

      const boostCost = 0.1;

      el.innerHTML = `${String(boostCost / upvotes.length)} BCH -> ${userHtml}`;

      distributionInfoEl.appendChild(el);

      receivers.push({
        address: receiver.user.addressBCH,
        amountSat: boostCost / upvotes.length
      });
    }

      // distribute only to testnet of owner
      // default tip is 100000 satoshis = 0.001 BCH, around 20 cents
    try {
      receivers.push({
        opReturn: [ "0x4801", postId.toString()]
      });
      // tx = await simpleWallet.send(receivers);
    } catch (err) {
      if (err.message && err.message.indexOf("Insufficient") > -1) {
        this.$scope.upvotingPostId = null;
        this.scopeService.safeApply(this.$scope, () => {});

        const addressContainer = document.getElementById("load-wallet-modal-address") as HTMLInputElement;
        const legacyAddressContainer = document.getElementById("load-wallet-modal-legacy-address") as HTMLInputElement;
        const qrContainer = document.getElementById("load-wallet-modal-qr") as HTMLDivElement;

        addressContainer.value = simpleWallet.cashAddress;
        legacyAddressContainer.value = simpleWallet.legacyAddress;

        qrContainer.innerHTML = "";
        new QRCode(qrContainer, simpleWallet.cashAddress);

        // replace with sweetalert
        $('#loadWalletModal').modal('show');

        this.$scope.isUpvoting = false;
        this.scopeService.safeApply(this.$scope, () => {});

        return toastr.warning("Insufficient balance on your BCH account.");
      }

      if (err.message && err.message.indexOf("has no matching Script") > -1) {
          this.$scope.isUpvoting = false;
          this.scopeService.safeApply(this.$scope, () => {});

          return toastr.warning("Could not find an unspent bitcoin that is big enough");
      }

      this.$scope.upvotingStatus = "error";

      console.error(err);

      this.$scope.isUpvoting = false;
      this.scopeService.safeApply(this.$scope, () => {});

      return toastr.warning("Error. Try again later.");
    }

    $('#tipSuccessModal').modal('show');

    const url = `https://explorer.bitcoin.com/bch/tx/${tx.txid}`;

    const anchorEl = document.getElementById("bchTippingTransactionUrl") as HTMLAnchorElement;

    console.log(`Upvote transaction: ${url}`);

    anchorEl.innerHTML = `Receipt: ${tx.txid.substring(0, 9)}...`;
    anchorEl.href = url;

    this.postService.upvote({
        postId: postId,
        txId: tx.txid,
        type: "boost"
    });

    this.scopeService.safeApply(this.$scope);
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

        if (this.$scope.page === 0) {
          this.$scope.posts = data;
        } else {
          data.forEach(post => {
            this.$scope.posts.push(post);
          });
        }

        if (data.length < this.$scope.limit) {
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

  public async deletePost(id: number) {
    this.$scope.isDeleting = true;

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
        this.$scope.posts = this.$scope.posts.filter(f => f.id !== id);
        toastr.success("Your post has been deleted");
      } else {
        toastr.error("There was an error while deleting your post")
      }
    } else {
      toastr.info("Your post has not been deleted");
    }

    this.$scope.isDeleting = false;

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
