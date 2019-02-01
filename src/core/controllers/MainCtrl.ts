import * as lzutf8 from "lzutf8";
import * as simpleWalletProvider from "../lib/simpleWalletProvider";
import PostService from "../../core/services/PostService";
import ScopeService from "../../core/services/ScopeService";
import WalletService from "../../core/services/WalletService";
import { Post } from "../../core/models/models";
import { AuthService } from "../../auth/AuthService";
import * as upvoteDistribution from "../lib/upvoteDistribution";
import { IGlobalScope } from '../../core/lib/interfaces';

interface IScopeMainCtrl extends ng.IScope {
  makeUncesorable: any;
  mouseEnterAddress: any
  mouseLeaveAddress: any;
  follow: any;
  unfollow: any;
}

export default class MainCtrl {
    constructor(
        private $rootScope: IGlobalScope,
        private $scope: IScopeMainCtrl,
        private $state,
        private $sce,
        private $window,
        private $location,
        private scopeService: ScopeService,
        private AuthService: AuthService,
        private RelsService,
        private ProfileService,
        private postService: PostService,
        private walletService: WalletService
    ) {

        $scope.$on('$viewContentLoaded', async () => {
          const {bch, usd} = await this.walletService.getAddressBalances();

          $rootScope.walletBalance = {
            bch,
            usd,
            isLoading: false
          }
        });

        const mouseEnterAddress = (className, address) => {
            const container = document.getElementsByClassName(className)[0];

            container.innerHTML = "";

            new QRCode(container, address);
        };

        const mouseLeaveAddress = (className) => {
            const container = document.getElementsByClassName(className)[0];
            container.innerHTML = "";
        };

        $scope.makeUncesorable = (post: Post) => this.makeUncesorable(post);
        
        $scope.mouseEnterAddress = mouseEnterAddress;
        $scope.mouseLeaveAddress = mouseLeaveAddress;

        $scope.follow = (profileId, followGuy) => {
          if (!$rootScope.user || !$rootScope.user.id) {
              return location.href = "/signup";
          }

          followGuy.alreadyFollowing = !followGuy.alreadyFollowing;

          RelsService.followProfile(profileId);
        };

        $scope.unfollow = (profileId, followGuy) => {
          if (followGuy) {
              followGuy.alreadyFollowing = false;
          }

          RelsService.unfollowProfile(profileId);
        };

        $rootScope.logoutMe = () => {
            AuthService.logout();

            this.$rootScope.user = undefined;
            this.$rootScope.simpleWallet = null;

            simpleWalletProvider.clean();

            $state.go("vicigo.feeds");

            location.reload();
        };
    }



    private byteCount = (s): number => {
      return Number(((encodeURI(s).split(/%..|./).length - 1) / 1024).toFixed(2));
    }

    /**
     * Uploads a blog post onto Bitcoin blockchain and saves a refernece in Honest database
     */
    private async makeUncesorable(post: Post) {
      this.$rootScope.walletBalance.isLoading = true;

      const simpleWallet = simpleWalletProvider.get();
      const json = {
          title: post.title,
          body: post.plain,
          author: post.user.username,
      };

      const compressedJson = lzutf8.compress(JSON.stringify(json), {
        outputEncoding: "Base64"
      });

      console.log("Base64 Story: " + compressedJson);

      if (this.byteCount(compressedJson) > 5) {
        return toastr.warning("The story is too long! We are working on it!");
      }

      $('#uncensoredResultModal').modal({
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
            title: `${post.title} by ${post.user.username} | Honest Cash`,
            extUri: `https://honest.cash/${post.user.username}/${post.alias}`
          });
        } catch (err) {
          $('#uncensoredResultModal').modal('hide');

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
            postId: post.id,
            extId: fileId
        });

        const balances = await this.walletService.getAddressBalances();

        this.$rootScope.walletBalance = {

        }
      }
    }

    static $inject = [
      "$rootScope",
      "$scope",
      "$state",
      "$sce",
      "$window",
      "$location",
      "ScopeService",
      "AuthService",
      "RelsService",
      "ProfileService",
      "PostService",
      "WalletService"
  ]
}
