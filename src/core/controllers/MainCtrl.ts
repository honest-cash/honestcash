import * as lzutf8 from "lzutf8";
import * as simpleWalletProvider from "../lib/simpleWalletProvider";
import PostService from "../../core/services/PostService";
import ScopeService from "../../core/services/ScopeService";
import { Post } from "../../core/models/models";
import { AuthService } from "../../auth/AuthService";
import * as upvoteDistribution from "../lib/upvoteDistribution";

export default class MainCtrl {
    constructor(
        private $rootScope,
        private $scope,
        private $state,
        private $sce,
        private $window,
        private $location,
        private $http,
        private scopeService: ScopeService,
        private AuthService: AuthService,
        private RelsService,
        private ProfileService,
        private postService: PostService
    ) {
        $scope.addressBalance = 0;
        $scope.addressBalanceInUSD = 0;
        $scope.balanceLoading = true;

        $scope.$on('$viewContentLoaded', async () => {
            let balances = await this.getAddressBalances();
            $scope.addressBalance = balances.bch;
            $scope.addressBalanceInUSD = balances.usd;
            $scope.balanceLoading = false;

            setInterval(async () => {
                balances = await this.getAddressBalances();
                $scope.addressBalance = balances.bch;
                $scope.addressBalanceInUSD = balances.usd;
            }, 30000)
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

        $scope.addressClicked = (post: Post) => this.addressClicked(post);
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

        $rootScope.trustSrc = (src) => {
          return $sce.trustAsResourceUrl(src);
        }

        $scope.displayFeedBody = (html: string): string => this.postService.displayHTML(html);

        $rootScope.logoutMe = () => {
            AuthService.logout();

            $rootScope.user = false;
            $rootScope.fetchingNotifs = false;
            $rootScope.simpleWallet = null;

            // destroy connected user wallet.
            simpleWalletProvider.set(null);
            localStorage.setItem("HC_BCH_PRIVATE_KEY", "");
            localStorage.setItem("HC_BCH_MNEMONIC", "");

            $state.go("vicigo.feeds");

            location.reload();
        };
    }

    protected async getAddressBalances(): Promise<{ bch: number; usd: number }> {
      const simpleWallet = simpleWalletProvider.get();

      const walletInfo = await simpleWallet.getWalletInfo();
      const balanceInBCH = Number((walletInfo.balance + walletInfo.unconfirmedBalance).toFixed(8));

      const res = await this.$http.get(`https://api.coinbase.com/v2/exchange-rates?currency=BCH`);
      const bchUSDRate = Number(res.data.data.rates.USD);
      
      return {
        bch: balanceInBCH,
        usd: Number((bchUSDRate * balanceInBCH).toFixed(2))
      };
    }

    private satoshiToBch = (amountSat: number): string => {
      return (amountSat / 100000000).toFixed(5);
    }

    /**
     * Splits an upvote amount between previous upvotes and saves the upvote reference in Honest database
     */
    private async addressClicked(post) {
      if (!this.$rootScope.user) {
        return location.href = "/signup";
      }

      if (!post.user.addressBCH) {
          toastr.error("Upvoting is not possible because the author does not have a Bitcoin address to receive");
          return;
      }

      const postId = post.id;
      const address = post.user.addressBCH;
      const simpleWallet = simpleWalletProvider.get();

      this.$scope.upvotingPostId = postId;
      this.$scope.upvotingStatus = "loading";

      // users with connected BCH accounts
      let tx;
      let upvotes;

      try {
        upvotes = (await this.postService.getUpvotes(postId));
      } catch (err) {
        toastr.error("Can't connect.");

        return console.error(err);
      }
      
      const receivers = upvoteDistribution.determineUpvoteRewards(upvotes, post.user);

      toastr.info("Upvoting...");

      const distributionInfoEl = document.getElementById("distribution-info");

      distributionInfoEl.innerHTML = "";

      for (let receiver of receivers) {
        const el = document.createElement("div");

        let userHtml;

        if (receiver.user) {
            userHtml = `<a target="_self" href="/profile/${receiver.user.username}"><img style="border-radius:50%; width: 23px;" src="${receiver.user.imageUrl ? receiver.user.imageUrl : '/img/avatar.png'}" /> ${receiver.user.username}</a> ${post.userId === receiver.user.id ? '(Author)' : ''}`;
        } else {
            userHtml = `<img style="width: 23px;" src="/img/avatar.png" /> Anonymous`;
        }

        el.innerHTML = `${this.satoshiToBch(receiver.amountSat)} BCH -> ${userHtml}`;

        distributionInfoEl.appendChild(el);
      }

      // distribute only to testnet of owner
      // default tip is 100000 satoshis = 0.001 BCH, around 20 cents
      try {
          tx = await simpleWallet.send(receivers);
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

            return toastr.warning("Insufficient balance on your BCH account.");
          }

          if (err.message && err.message.indexOf("has no matching Script") > -1) {
              return toastr.warning("Could not find an unspent bitcoin that is big enough");
          }

          this.$scope.upvotingStatus = "error";

          console.error(err);

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
          txId: tx.txid
      });

      const balances = await this.getAddressBalances();

      this.$scope.addressBalance = balances.bch
      this.$scope.addressBalanceInUSD = balances.usd;
      this.$scope.balanceLoading = false;
      this.$scope.upvotingPostId = null;

      this.scopeService.safeApply(this.$scope, () => {});
    }

    private byteCount = (s): number => {
      return Number(((encodeURI(s).split(/%..|./).length - 1) / 1024).toFixed(2));
    }

    /**
     * Uploads a blog post onto Bitcoin blockchain and saves a refernece in Honest database
     */
    private async makeUncesorable(post: Post) {
      this.$scope.balanceLoading = true;

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

        const balances = await this.getAddressBalances();

        this.$scope.addressBalance = balances.bch;
        this.$scope.addressBalanceInUSD = balances.usd;
        this.$scope.balanceLoading = false;
      }
    }

    static $inject = [
      "$rootScope",
      "$scope",
      "$state",
      "$sce",
      "$window",
      "$location",
      "$http",
      "ScopeService",
      "AuthService",
      "RelsService",
      "ProfileService",
      "PostService"
  ]
}
