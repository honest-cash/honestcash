import * as lzutf8 from "lzutf8";

import "./uncensorable-button.styles.less";
import template from "./uncensorable-button.template.html";

import { IGlobalScope } from "../../../core/lib/interfaces";
import { Post } from "../../../core/models/models";
import WalletService from "../../../core/services/WalletService";
import PostService from "../../../core/services/PostService";
import ScopeService from "../../../core/services/ScopeService";

import * as simpleWalletProvider from "../../../core/lib/simpleWalletProvider";

declare const toastr;

interface IScopeUncensorableButtonCtrl extends ng.IScope {
  post: Post;
}

class UncensorableButtonController {
  public static $inject = [
    "$rootScope",
    "$scope",
    "$window",
    "PostService",
    "WalletService",
    "ScopeService",
  ];

  private isUncensoring: boolean;
  private isVisible: boolean;
  private post: Post;

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopeUncensorableButtonCtrl,
    private $window: ng.IWindowService,
    private postService: PostService,
    private walletService: WalletService,
    private scopeService: ScopeService,
  ) {
    this.ngOnInit();
  }

  private ngOnInit() {
    this.post = this.$scope.post;
    this.isUncensoring = false;;
    this.isVisible = !this.post.userPostRefs.length && (
      this.$rootScope.user && this.$rootScope.user.id && (
        this.$rootScope.user.id === this.post.userId
      )
    );

    this.$window.onbeforeunload = event => {
      if (this.isUncensoring) {
        event.preventDefault();

        return "There is a pending uncensoring in process. Are you sure you want to leave?";
      }
    };
  }

  private onClick(e) {
    if (this.isUncensoring || !this.isVisible) {
      e.stopPropagation();
      return;
    }
    this.uncensor();
  }

  private byteCount = (s): number => {
    return Number(((encodeURI(s).split(/%..|./).length - 1) / 1024).toFixed(2));
  }

    /**
     * Uploads a blog post onto Bitcoin blockchain and saves a refernece in Honest database
     */
    private async uncensor() {
      this.isUncensoring = true;
      this.scopeService.safeApply(this.$scope, () => {});

      const post = this.post;

      const simpleWallet = simpleWalletProvider.get();
      const json = {
        author: post.user.username,
        body: post.bodyMD,
        title: post.title
      };

      const compressedJson = lzutf8.compress(JSON.stringify(json), {
        outputEncoding: "Base64"
      });

      console.log("Base64 Story: " + compressedJson);

      if (this.byteCount(compressedJson) > 5) {
        this.isUncensoring = false;
        this.scopeService.safeApply(this.$scope);
        return toastr.warning("The story is too long! We are working on it!");
      }

      $("#uncensoredResultModal").modal({
        // backdrop: "static"
      });

      document.getElementById("uncensoredResultLoading").style.display = "block";
      document.getElementById("uncensoredResultSuccess").style.display = "none";

      // users with connected BCH accounts
      if (simpleWallet) {
        let res;

        try {
          res = await simpleWallet.upload(compressedJson, {
            ext: "json.lzutf8",
            extUri: `https://honest.cash/post/${post.id}`,
            title: `${post.title} by ${post.user.username} | Honest Cash`
          });
        } catch (err) {
          $("#uncensoredResultModal").modal("hide");

          this.isUncensoring = false;
          this.scopeService.safeApply(this.$scope, () => {});

          if (err.message.indexOf("mempool") > -1) {
              return toastr.warning("The story is too long! We are working on it!");
          }

          return toastr.warning(err.message);
        }

        document.getElementById("uncensoredResultLoading").style.display = "none";
        document.getElementById("uncensoredResultSuccess").style.display = "block";

        const fileId = res.fileId;

        console.log(res);
        console.log("Story saved for all times on BCH: " + fileId);

        const inputEl = document.getElementById("bitcoinFileId") as HTMLInputElement;

        inputEl.value = fileId;

        this.postService.createRef({
            extId: fileId,
            postId: post.id
        });

        const {bch, usd} = await this.walletService.getAddressBalances();

        this.$rootScope.walletBalance = {
          bch,
          usd,
          isLoading: false
        };
        this.isUncensoring = false;
        this.scopeService.safeApply(this.$scope, () => {});

      }
    }
}

export default function uncensorableButton(): ng.IDirective {
  return {
    controller: UncensorableButtonController,
    controllerAs: "uncensorableButtonCtrl",
    restrict: "E",
    scope: {
      amount: "=?",
      loadingText: "=?",
      text: "=?",
      post: "="
    },
    template
  };
}
